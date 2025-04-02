"use client"

import { useTheme } from "@/contexts/theme-context"

export function Footer() {
  const { currentScheme } = useTheme()

  return (
    <footer className="py-12 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center space-x-6">
            <a
              href="#"
              className="transition-colors duration-300"
              style={{ color: currentScheme.secondary, hover: { color: currentScheme.accent } }}
            >
              Instagram
            </a>
            <span
              className="w-1 h-1 rounded-full opacity-30"
              style={{ backgroundColor: currentScheme.secondary }}
            ></span>
            <a
              href="#"
              className="transition-colors duration-300"
              style={{ color: currentScheme.secondary, hover: { color: currentScheme.accent } }}
            >
              Pinterest
            </a>
            <span
              className="w-1 h-1 rounded-full opacity-30"
              style={{ backgroundColor: currentScheme.secondary }}
            ></span>
            <a
              href="#"
              className="transition-colors duration-300"
              style={{ color: currentScheme.secondary, hover: { color: currentScheme.accent } }}
            >
              Behance
            </a>
          </div>
          <p className="text-xs opacity-70 mt-6 font-light" style={{ color: currentScheme.secondary }}>
            © {new Date().getFullYear()} Galería Creativa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

