"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Loader2, ImageIcon, Lock, Wand2, ChevronDown, Check } from "lucide-react"
import Image from "next/image"

// Modelos de IA disponibles
const AI_MODELS = [
  { id: "dall-e-3", name: "DALL-E 3", provider: "OpenAI" },
  { id: "dall-e-2", name: "DALL-E 2", provider: "OpenAI" },
  { id: "stable-diffusion-xl", name: "Stable Diffusion XL", provider: "Stability AI" },
  { id: "midjourney", name: "Midjourney-like", provider: "Otro" },
]

// Tamaños de imagen disponibles
const IMAGE_SIZES = [
  { id: "1024x1024", name: "Cuadrada (1024×1024)" },
  { id: "1792x1024", name: "Horizontal (1792×1024)" },
  { id: "1024x1792", name: "Vertical (1024×1792)" },
]

// Estilos artísticos
const ART_STYLES = [
  { id: "realistic", name: "Realista" },
  { id: "abstract", name: "Abstracto" },
  { id: "digital-art", name: "Arte Digital" },
  { id: "photography", name: "Fotografía" },
  { id: "painting", name: "Pintura" },
]

export function AIImageGenerator() {
  const { currentScheme } = useTheme()
  const [apiKey, setApiKey] = useState("")
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  // Estados para configuraciones
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0])
  const [selectedSize, setSelectedSize] = useState(IMAGE_SIZES[0])
  const [selectedStyle, setSelectedStyle] = useState(ART_STYLES[0])
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)
  const [showStyleDropdown, setShowStyleDropdown] = useState(false)

  // Referencias para los dropdowns
  const modelDropdownRef = useRef<HTMLDivElement>(null)
  const sizeDropdownRef = useRef<HTMLDivElement>(null)
  const styleDropdownRef = useRef<HTMLDivElement>(null)

  // Función para generar imagen (simulada)
  const generateImage = async () => {
    if (!apiKey.trim()) {
      setError("Por favor, ingresa una API Key válida")
      return
    }

    if (!prompt.trim()) {
      setError("Por favor, ingresa una descripción para la imagen")
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      // Simulamos la llamada a la API con un timeout
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // const response = await fetchApi(props)

      // Demo: usamos una imagen de placeholder
      const width = selectedSize.id.split("x")[0]
      const height = selectedSize.id.split("x")[1]
      setGeneratedImage(`/placeholder.svg?height=${height}&width=${width}`)
    } catch (err) {
      setError("Error al generar la imagen. Verifica tu API Key y vuelve a intentar.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  // Función para manejar la carga de imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        setError("El archivo debe ser una imagen (jpg, png, etc.)")
        return
      }

      // Crear URL para la vista previa
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
      setError(null)
    }
  }

  // Función para añadir la imagen generada a la galería
  const addToGallery = () => {
    // Aquí iría la lógica para añadir la imagen a la galería
    alert("¡Imagen añadida a la galería! (Funcionalidad simulada)")
  }

  return (
    <section
      id="ai-generator"
      className="py-16 relative z-10"
      style={{ backgroundColor: `${currentScheme.background}` }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif italic mb-4" style={{ color: currentScheme.text }}>
            Generador de Imágenes con IA
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: currentScheme.secondary }}>
            Crea nuevas imágenes para tu galería utilizando inteligencia artificial. Ingresa tu API Key, describe la
            imagen que deseas y personaliza las opciones.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formulario */}
            <div
              className="rounded-xl p-6 shadow-lg"
              style={{
                backgroundColor: `${currentScheme.surface}30`,
                borderColor: `${currentScheme.text}10`,
                borderWidth: "1px",
              }}
            >
              <div className="space-y-6">
                {/* API Key Input */}
                <div>
                  <label
                    htmlFor="apiKey"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: currentScheme.text }}
                  >
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: `${currentScheme.background}`,
                        color: currentScheme.text,
                        borderColor: `${currentScheme.text}20`,
                        borderWidth: "1px",
                        focusRing: currentScheme.accent,
                      }}
                      placeholder="Ingresa tu API Key"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: currentScheme.secondary }}
                    >
                      <Lock size={16} />
                    </button>
                  </div>
                  <p className="mt-1 text-xs" style={{ color: `${currentScheme.secondary}` }}>
                    Tu API Key no se almacena en ningún servidor.
                  </p>
                </div>

                {/* Prompt Input */}
                <div>
                  <label
                    htmlFor="prompt"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: currentScheme.text }}
                  >
                    Descripción de la imagen
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: `${currentScheme.background}`,
                      color: currentScheme.text,
                      borderColor: `${currentScheme.text}20`,
                      borderWidth: "1px",
                      focusRing: currentScheme.accent,
                    }}
                    placeholder="Describe la imagen que deseas generar..."
                  />
                </div>

                {/* Carga de imagen de referencia */}
                <div>
                  <label
                    htmlFor="imageUpload"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: currentScheme.text }}
                  >
                    Imagen de referencia (opcional)
                  </label>
                  <div className="flex flex-col space-y-3">
                    <div
                      className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        borderColor: `${currentScheme.text}30`,
                        backgroundColor: `${currentScheme.background}50`,
                      }}
                      onClick={() => document.getElementById("imageUpload")?.click()}
                    >
                      {uploadedImage ? (
                        <div className="relative w-full h-32">
                          <Image
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Imagen de referencia"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="py-4 flex flex-col items-center">
                          <ImageIcon size={24} style={{ color: currentScheme.secondary }} className="mb-2" />
                          <p className="text-sm" style={{ color: currentScheme.secondary }}>
                            Haz clic para subir una imagen de referencia
                          </p>
                          <p className="text-xs mt-1" style={{ color: `${currentScheme.secondary}80` }}>
                            O arrastra y suelta una imagen aquí
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    {uploadedImage && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="text-xs px-2 py-1 rounded"
                          style={{ color: currentScheme.accent }}
                          onClick={() => setUploadedImage(null)}
                        >
                          Eliminar imagen
                        </button>
                      </div>
                    )}
                    <p className="text-xs" style={{ color: `${currentScheme.secondary}` }}>
                      La imagen subida se utilizará como referencia para la generación con IA.
                    </p>
                  </div>
                </div>

                {/* Configuraciones */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Selector de Modelo */}
                  <div className="relative">
                    <label className="block mb-2 text-xs font-medium" style={{ color: currentScheme.text }}>
                      Modelo de IA
                    </label>
                    <div ref={modelDropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setShowModelDropdown(!showModelDropdown)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                        style={{
                          backgroundColor: `${currentScheme.background}`,
                          color: currentScheme.text,
                          borderColor: `${currentScheme.text}20`,
                          borderWidth: "1px",
                        }}
                      >
                        <span>{selectedModel.name}</span>
                        <ChevronDown size={16} />
                      </button>

                      {showModelDropdown && (
                        <div
                          className="absolute z-10 mt-1 w-full rounded-lg shadow-lg overflow-hidden"
                          style={{
                            backgroundColor: currentScheme.background,
                            borderColor: `${currentScheme.text}20`,
                            borderWidth: "1px",
                          }}
                        >
                          {AI_MODELS.map((model) => (
                            <button
                              key={model.id}
                              type="button"
                              className="w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:opacity-80"
                              style={{
                                color: currentScheme.text,
                                backgroundColor:
                                  model.id === selectedModel.id ? `${currentScheme.accent}20` : "transparent",
                              }}
                              onClick={() => {
                                setSelectedModel(model)
                                setShowModelDropdown(false)
                              }}
                            >
                              <span>{model.name}</span>
                              {model.id === selectedModel.id && <Check size={16} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selector de Tamaño */}
                  <div className="relative">
                    <label className="block mb-2 text-xs font-medium" style={{ color: currentScheme.text }}>
                      Tamaño
                    </label>
                    <div ref={sizeDropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                        style={{
                          backgroundColor: `${currentScheme.background}`,
                          color: currentScheme.text,
                          borderColor: `${currentScheme.text}20`,
                          borderWidth: "1px",
                        }}
                      >
                        <span>{selectedSize.name}</span>
                        <ChevronDown size={16} />
                      </button>

                      {showSizeDropdown && (
                        <div
                          className="absolute z-10 mt-1 w-full rounded-lg shadow-lg overflow-hidden"
                          style={{
                            backgroundColor: currentScheme.background,
                            borderColor: `${currentScheme.text}20`,
                            borderWidth: "1px",
                          }}
                        >
                          {IMAGE_SIZES.map((size) => (
                            <button
                              key={size.id}
                              type="button"
                              className="w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:opacity-80"
                              style={{
                                color: currentScheme.text,
                                backgroundColor:
                                  size.id === selectedSize.id ? `${currentScheme.accent}20` : "transparent",
                              }}
                              onClick={() => {
                                setSelectedSize(size)
                                setShowSizeDropdown(false)
                              }}
                            >
                              <span>{size.name}</span>
                              {size.id === selectedSize.id && <Check size={16} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selector de Estilo */}
                  <div className="relative">
                    <label className="block mb-2 text-xs font-medium" style={{ color: currentScheme.text }}>
                      Estilo Artístico
                    </label>
                    <div ref={styleDropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setShowStyleDropdown(!showStyleDropdown)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                        style={{
                          backgroundColor: `${currentScheme.background}`,
                          color: currentScheme.text,
                          borderColor: `${currentScheme.text}20`,
                          borderWidth: "1px",
                        }}
                      >
                        <span>{selectedStyle.name}</span>
                        <ChevronDown size={16} />
                      </button>

                      {showStyleDropdown && (
                        <div
                          className="absolute z-10 mt-1 w-full rounded-lg shadow-lg overflow-hidden"
                          style={{
                            backgroundColor: currentScheme.background,
                            borderColor: `${currentScheme.text}20`,
                            borderWidth: "1px",
                          }}
                        >
                          {ART_STYLES.map((style) => (
                            <button
                              key={style.id}
                              type="button"
                              className="w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:opacity-80"
                              style={{
                                color: currentScheme.text,
                                backgroundColor:
                                  style.id === selectedStyle.id ? `${currentScheme.accent}20` : "transparent",
                              }}
                              onClick={() => {
                                setSelectedStyle(style)
                                setShowStyleDropdown(false)
                              }}
                            >
                              <span>{style.name}</span>
                              {style.id === selectedStyle.id && <Check size={16} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botón de Generar */}
                <button
                  type="button"
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-70"
                  style={{
                    backgroundColor: currentScheme.accent,
                    color: "#fff",
                    hover: { opacity: 0.9 },
                  }}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Wand2 size={18} className="mr-2" />
                      Generar Imagen
                    </>
                  )}
                </button>

                {/* Mensaje de error */}
                {error && (
                  <p className="text-sm mt-2" style={{ color: "#e74c3c" }}>
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Previsualización de la imagen */}
            <div
              className="rounded-xl p-6 flex flex-col items-center justify-center min-h-[400px]"
              style={{
                backgroundColor: `${currentScheme.surface}30`,
                borderColor: `${currentScheme.text}10`,
                borderWidth: "1px",
              }}
            >
              {generatedImage ? (
                <div className="w-full h-full flex flex-col items-center">
                  <div className="relative w-full h-64 mb-4">
                    <Image
                      src={generatedImage || "/placeholder.svg"}
                      alt="Imagen generada por IA"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addToGallery}
                    className="mt-4 py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: `${currentScheme.accent}20`,
                      color: currentScheme.accent,
                      hover: { backgroundColor: `${currentScheme.accent}30` },
                    }}
                  >
                    <ImageIcon size={16} className="mr-2" />
                    Añadir a la Galería
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${currentScheme.surface}60` }}
                  >
                    <ImageIcon size={32} style={{ color: currentScheme.secondary }} />
                  </div>
                  <p style={{ color: currentScheme.secondary }}>La imagen generada aparecerá aquí</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: `${currentScheme.secondary}80` }}>
              Este generador utiliza APIs de terceros para crear imágenes. Asegúrate de tener los permisos necesarios
              para usar las imágenes generadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

