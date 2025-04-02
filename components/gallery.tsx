"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageModal } from "./image-modal"
import { useTheme } from "@/contexts/theme-context"

// Definir la estructura de datos para las imágenes
type GalleryImage = {
  id: number
  src: string
  alt: string
  width: number
  height: number
}

// Actualizar el array de imágenes para tener solo 3 elementos
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Imagen de galería 1",
    width: 600,
    height: 800,
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=900",
    alt: "Imagen de galería 2",
    width: 900,
    height: 600,
  },
  {
    id: 3,
    src: "/placeholder.svg?height=700&width=700",
    alt: "Imagen de galería 3",
    width: 700,
    height: 700,
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const { currentScheme } = useTheme()

  // Reemplazar el grid estándar con un layout creativo
  return (
    <div id="gallery" className="py-12">
      <div className="relative h-[90vh] w-full overflow-hidden">
        {/* Primera imagen - Posición superior izquierda, rotada ligeramente */}
        <div
          className="absolute top-[5%] left-[10%] w-[40%] h-auto z-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transform rotate-[-3deg] hover:rotate-0 transition-all duration-700 cursor-pointer hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
          onClick={() => setSelectedImage(galleryImages[0])}
        >
          <div className="relative aspect-[3/4]">
            <div
              className="absolute -inset-1 rounded-lg transform rotate-[1deg] z-0"
              style={{ backgroundColor: currentScheme.surface }}
            ></div>
            <Image
              src={galleryImages[0].src || "/placeholder.svg"}
              alt={galleryImages[0].alt}
              fill
              className="object-cover rounded-lg relative z-10"
              sizes="(max-width: 768px) 80vw, 40vw"
            />
            <div
              className="absolute inset-0 hover:bg-opacity-10 transition-colors duration-500 rounded-lg z-20"
              style={{
                backgroundColor: `${currentScheme.text}00`,
                hover: { backgroundColor: `${currentScheme.text}1A` },
              }}
            />
          </div>
        </div>

        {/* Segunda imagen - Posición central derecha, más grande */}
        <div
          className="absolute top-[15%] right-[5%] w-[45%] h-auto z-20 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transform hover:scale-[1.02] transition-all duration-700 cursor-pointer hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
          onClick={() => setSelectedImage(galleryImages[1])}
        >
          <div className="relative aspect-[3/2]">
            <div
              className="absolute -inset-1 rounded-lg transform -rotate-[1deg] z-0"
              style={{ backgroundColor: currentScheme.surface }}
            ></div>
            <Image
              src={galleryImages[1].src || "/placeholder.svg"}
              alt={galleryImages[1].alt}
              fill
              className="object-cover rounded-lg relative z-10"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
            <div
              className="absolute inset-0 hover:bg-opacity-10 transition-colors duration-500 rounded-lg z-20"
              style={{
                backgroundColor: `${currentScheme.text}00`,
                hover: { backgroundColor: `${currentScheme.text}1A` },
              }}
            />
          </div>
        </div>

        {/* Tercera imagen - Posición inferior, centrada y superpuesta */}
        <div
          className="absolute bottom-[5%] left-[25%] w-[50%] h-auto z-30 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transform rotate-[2deg] hover:rotate-0 transition-all duration-700 cursor-pointer hover:shadow-[0_15px_35px_rgba(0,0,0,0.18)]"
          onClick={() => setSelectedImage(galleryImages[2])}
        >
          <div className="relative aspect-square">
            <div
              className="absolute -inset-1 rounded-lg transform rotate-[1deg] z-0"
              style={{ backgroundColor: currentScheme.surface }}
            ></div>
            <Image
              src={galleryImages[2].src || "/placeholder.svg"}
              alt={galleryImages[2].alt}
              fill
              className="object-cover rounded-lg relative z-10"
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            <div
              className="absolute inset-0 hover:bg-opacity-10 transition-colors duration-500 rounded-lg z-20"
              style={{
                backgroundColor: `${currentScheme.text}00`,
                hover: { backgroundColor: `${currentScheme.text}1A` },
              }}
            />
          </div>
        </div>
      </div>

      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  )
}

