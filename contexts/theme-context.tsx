"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Definir los esquemas de colores disponibles
type ColorScheme = {
  name: string
  background: string
  text: string
  accent: string
  secondary: string
  surface: string
}

const colorSchemes: Record<string, ColorScheme> = {
  default: {
    name: "Default",
    background: "#f8f5f2",
    text: "#2d2a28",
    accent: "#a67c52",
    secondary: "#5c574f",
    surface: "#e8e1d9",
  },
  blue: {
    name: "Azul",
    background: "#f0f5f9",
    text: "#1e2a3a",
    accent: "#3d7dd8",
    secondary: "#4a5568",
    surface: "#e1e8f0",
  },
  green: {
    name: "Verde",
    background: "#f2f7f2",
    text: "#1c2a1c",
    accent: "#4a8c52",
    secondary: "#4a5d4a",
    surface: "#e1ede1",
  },
  pink: {
    name: "Rosa",
    background: "#fdf2f8",
    text: "#2a1c24",
    accent: "#d8527b",
    secondary: "#6d4e5c",
    surface: "#f5e1ea",
  },
  dark: {
    name: "Oscuro",
    background: "#1a1a1a",
    text: "#f0f0f0",
    accent: "#e6a954",
    secondary: "#a0a0a0",
    surface: "#2c2c2c",
  },
}

// Crear el contexto
type ThemeContextType = {
  currentScheme: ColorScheme
  changeColorScheme: (schemeName: string) => void
  colorSchemes: Record<string, ColorScheme>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Proveedor del contexto
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>(colorSchemes.default)

  const changeColorScheme = (schemeName: string) => {
    if (colorSchemes[schemeName]) {
      setCurrentScheme(colorSchemes[schemeName])

      // Actualizar las variables CSS para transiciones suaves
      document.documentElement.style.setProperty("--background", colorSchemes[schemeName].background)
      document.documentElement.style.setProperty("--text", colorSchemes[schemeName].text)
      document.documentElement.style.setProperty("--accent", colorSchemes[schemeName].accent)
      document.documentElement.style.setProperty("--secondary", colorSchemes[schemeName].secondary)
      document.documentElement.style.setProperty("--surface", colorSchemes[schemeName].surface)
    }
  }

  return (
    <ThemeContext.Provider value={{ currentScheme, changeColorScheme, colorSchemes }}>{children}</ThemeContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

