"use server"

import { db } from "@/lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"

export interface UserExportData {
  id: string
  clerkId: string
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
  notes: {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
  }[]
}

export async function exportUserData(userId?: string): Promise<{ success: boolean; data?: UserExportData; error?: string }> {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return { success: false, error: "Unauthorized" }
    }

    let targetUserId = userId

    // If no userId provided, find current user by clerkId
    if (!targetUserId) {
      const currentUser = await db.user.findUnique({
        where: { clerkId },
      })
      if (!currentUser) {
        return { success: false, error: "User not found in database" }
      }
      targetUserId = currentUser.id
    }

    // Get user with notes
    const user = await db.user.findUnique({
      where: { id: targetUserId },
      include: { notes: true },
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    // Format dates as ISO strings for JSON
    const exportData: UserExportData = {
      id: user.id,
      clerkId: user.clerkId,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      notes: user.notes.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString(),
      })),
    }

    return { success: true, data: exportData }
  } catch (error) {
    console.error("Error exporting user data:", error)
    return { success: false, error: "Failed to export user data" }
  }
}

export interface AllUsersExportData {
  exportedAt: string
  totalUsers: number
  users: UserExportData[]
}

export async function exportAllUsers(): Promise<{ success: boolean; data?: AllUsersExportData; error?: string }> {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return { success: false, error: "Unauthorized" }
    }

    // Get all users with their notes
    const users = await db.user.findMany({
      include: { notes: true },
      orderBy: { createdAt: "desc" },
    })

    // Format for export
    const exportData: AllUsersExportData = {
      exportedAt: new Date().toISOString(),
      totalUsers: users.length,
      users: users.map(user => ({
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        notes: user.notes.map(note => ({
          id: note.id,
          title: note.title,
          content: note.content,
          createdAt: note.createdAt.toISOString(),
          updatedAt: note.updatedAt.toISOString(),
        })),
      })),
    }

    return { success: true, data: exportData }
  } catch (error) {
    console.error("Error exporting all users:", error)
    return { success: false, error: "Failed to export users" }
  }
}

// Check for users that exist in Clerk but not in local DB
export interface UnsyncedUser {
  clerkId: string
  email: string
  firstName: string | null
  lastName: string | null
  createdAt: number
}

export async function getUnsyncedUsers(): Promise<{ success: boolean; data?: UnsyncedUser[]; error?: string }> {
  try {
    const { userId: currentClerkId } = await auth()
    
    if (!currentClerkId) {
      return { success: false, error: "Unauthorized" }
    }

    // Get all users from local DB
    const localUsers = await db.user.findMany({
      select: { clerkId: true },
    })
    const localClerkIds = new Set(localUsers.map(u => u.clerkId))

    // Get all users from Clerk
    const client = await clerkClient()
    const clerkUsers = await client.users.getUserList({
      limit: 100,
    })

    // Find users that exist in Clerk but not in local DB
    const unsyncedUsers: UnsyncedUser[] = clerkUsers.data
      .filter(clerkUser => !localClerkIds.has(clerkUser.id))
      .map(clerkUser => ({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        createdAt: clerkUser.createdAt,
      }))

    return { success: true, data: unsyncedUsers }
  } catch (error) {
    console.error("Error getting unsynced users:", error)
    return { success: false, error: "Failed to get unsynced users" }
  }
}

// Sync a user from Clerk to local DB
export async function syncUserFromClerk(clerkId: string): Promise<{ success: boolean; error?: string; userId?: string }> {
  try {
    const { userId: currentClerkId } = await auth()
    
    if (!currentClerkId) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { clerkId },
    })

    if (existingUser) {
      return { success: true, userId: existingUser.id, error: "User already exists" }
    }

    // Get user from Clerk
    const client = await clerkClient()
    const clerkUser = await client.users.getUser(clerkId)

    // Create user in local DB
    const user = await db.user.create({
      data: {
        clerkId,
        email: clerkUser.emailAddresses[0]?.emailAddress || `${clerkId}@placeholder.com`,
        name: clerkUser.firstName || "",
      },
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Error syncing user:", error)
    return { success: false, error: "Failed to sync user" }
  }
}
