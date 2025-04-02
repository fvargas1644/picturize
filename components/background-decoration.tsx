"use client"

import { useTheme } from "@/contexts/theme-context"

export function BackgroundDecoration() {
  const { currentScheme } = useTheme()

  return (
    <>
      {/* Círculo decorativo superior derecho */}
      <div
        className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full opacity-60 z-0"
        style={{ backgroundColor: currentScheme.surface }}
      ></div>

      {/* Forma orgánica inferior izquierda */}
      <div
        className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-[40%_60%_70%_30%_/_30%_30%_70%_70%] opacity-40 z-0"
        style={{ backgroundColor: currentScheme.surface }}
      ></div>

      {/* Línea decorativa central */}
      <div
        className="absolute top-[30%] left-0 w-full h-[1px] opacity-5 z-0"
        style={{ backgroundColor: currentScheme.text }}
      ></div>

      {/* Puntos decorativos */}
      <div
        className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full opacity-10 z-0"
        style={{ backgroundColor: currentScheme.text }}
      ></div>
      <div
        className="absolute top-[40%] right-[15%] w-3 h-3 rounded-full opacity-10 z-0"
        style={{ backgroundColor: currentScheme.text }}
      ></div>
      <div
        className="absolute bottom-[25%] left-[30%] w-2 h-2 rounded-full opacity-10 z-0"
        style={{ backgroundColor: currentScheme.text }}
      ></div>
    </>
  )
}

