"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { exportUserData, exportAllUsers, getUnsyncedUsers, syncUserFromClerk } from "@/app/actions/export"
import { Download, Users, RefreshCw, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface ExportDialogProps {
  userId: string
}

export function ExportDialog({ userId }: ExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isCheckingUnsynced, setIsCheckingUnsynced] = useState(false)
  const [unsyncedCount, setUnsyncedCount] = useState(0)

  const handleExportUser = async () => {
    setIsExporting(true)
    try {
      const result = await exportUserData(userId)
      if (result.success && result.data) {
        const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `user-${result.data.email}-export.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success("User data exported successfully")
      } else {
        toast.error(result.error || "Failed to export user data")
      }
    } catch {
      toast.error("Failed to export user data")
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportAll = async () => {
    setIsExporting(true)
    try {
      const result = await exportAllUsers()
      if (result.success && result.data) {
        const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `all-users-export-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success(`Exported ${result.data.totalUsers} users successfully`)
      } else {
        toast.error(result.error || "Failed to export users")
      }
    } catch {
      toast.error("Failed to export users")
    } finally {
      setIsExporting(false)
    }
  }

  const handleCheckUnsynced = async () => {
    setIsCheckingUnsynced(true)
    try {
      const result = await getUnsyncedUsers()
      if (result.success && result.data) {
        setUnsyncedCount(result.data.length)
        if (result.data.length > 0) {
          toast.info(`${result.data.length} users not synced to local database`)
          // Export unsynced users
          const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" })
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `unsynced-users-${new Date().toISOString().split("T")[0]}.json`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          toast.success("Unsynced users exported")
        } else {
          toast.success("All users are synced")
        }
      } else {
        toast.error(result.error || "Failed to check unsynced users")
      }
    } catch {
      toast.error("Failed to check unsynced users")
    } finally {
      setIsCheckingUnsynced(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]"
        >
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#faf8f5] border-[#e8e4df]">
        <DialogHeader>
          <DialogTitle className="text-[#2d2a26]">Export Data</DialogTitle>
          <DialogDescription className="text-[#6b6560]">
            Export your notes and user data as JSON
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={handleExportUser}
            disabled={isExporting}
            className="justify-start gap-2 bg-[#2d2a26] hover:bg-[#1a1815] text-white"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export My Data"}
          </Button>
          <Button
            onClick={handleExportAll}
            disabled={isExporting}
            variant="outline"
            className="justify-start gap-2 border-[#e8e4df] hover:bg-[#f0ebe5]"
          >
            <Users className="h-4 w-4" />
            Export All Users (Admin)
          </Button>
          <Button
            onClick={handleCheckUnsynced}
            disabled={isCheckingUnsynced}
            variant="outline"
            className="justify-start gap-2 border-[#e8e4df] hover:bg-[#f0ebe5]"
          >
            {unsyncedCount > 0 ? (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            ) : (
              <RefreshCw className={`h-4 w-4 ${isCheckingUnsynced ? "animate-spin" : ""}`} />
            )}
            {isCheckingUnsynced 
              ? "Checking..." 
              : unsyncedCount > 0 
                ? `${unsyncedCount} Unsynced Users` 
                : "Check Unsynced Users"
            }
          </Button>
          {unsyncedCount > 0 && (
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {unsyncedCount} users exist in Clerk but not in local database
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
