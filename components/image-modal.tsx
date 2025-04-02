"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

type ImageModalProps = {
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  onClose: () => void
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  const { currentScheme } = useTheme()

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      style={{ backgroundColor: `${currentScheme.text}E6` }}
    >
      <div
        className="relative max-w-5xl w-full h-auto max-h-[90vh] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        style={{ backgroundColor: currentScheme.background }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-white transition-colors"
          style={{ backgroundColor: `${currentScheme.text}80`, hover: { backgroundColor: `${currentScheme.text}B3` } }}
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative w-full h-full p-4">
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Overlay para cerrar al hacer clic fuera de la imagen */}
      <div className="absolute inset-0 z-40" onClick={onClose} />
    </div>
  )
}

