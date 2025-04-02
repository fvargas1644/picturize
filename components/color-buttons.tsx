"use client"

import { useTheme } from "@/contexts/theme-context"

export function ColorButtons() {
  const { changeColorScheme, colorSchemes } = useTheme()

  return (
    <div className="fixed bottom-8 right-8 z-40 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg flex gap-2">
      {Object.keys(colorSchemes).map((schemeName) => (
        <button
          key={schemeName}
          onClick={() => changeColorScheme(schemeName)}
          className="w-8 h-8 rounded-full transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          style={{
            backgroundColor: colorSchemes[schemeName].accent,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          aria-label={`Cambiar a tema ${colorSchemes[schemeName].name}`}
          title={colorSchemes[schemeName].name}
        />
      ))}
    </div>
  )
}

