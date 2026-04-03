"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  enableSystem?: boolean
  attribute?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  attribute = "class",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const root = window.document.documentElement
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const initialTheme = savedTheme || defaultTheme
    
    const applyTheme = (t: Theme) => {
      let resolved: "dark" | "light"
      
      if (t === "system" && enableSystem) {
        resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      } else {
        resolved = t as "dark" | "light"
      }
      
      if (attribute === "class") {
        root.classList.remove("light", "dark")
        root.classList.add(resolved)
      }
    }
    
    applyTheme(initialTheme)
    setThemeState(initialTheme)
  }, [defaultTheme, enableSystem, attribute])

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme)
    setThemeState(newTheme)
    
    const root = window.document.documentElement
    let resolved: "dark" | "light"
    
    if (newTheme === "system" && enableSystem) {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    } else {
      resolved = newTheme as "dark" | "light"
    }
    
    if (attribute === "class") {
      root.classList.remove("light", "dark")
      root.classList.add(resolved)
    }
  }

  const value = { theme, setTheme }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
