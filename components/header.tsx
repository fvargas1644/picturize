"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"

export function Header() {
  const { currentScheme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")
  // Añadir un nuevo estado para controlar la opacidad del fondo
  const [scrollOpacity, setScrollOpacity] = useState(0)

  // Función simple para navegar a las secciones
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Calcular la posición considerando el header
      const headerHeight = 100 // altura aproximada del header en píxeles
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      // Usar scrollTo en lugar de scrollIntoView para más control
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Modificar el efecto de scroll existente para incluir el cálculo de opacidad
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Calcular la opacidad basada en el scroll (0 a 1)
      // 0px = 0, 200px = 1, con transición lineal entre ambos
      const newOpacity = Math.min(scrollPosition / 200, 1)
      setScrollOpacity(newOpacity)

      // El resto del código para detectar la sección activa
      const scrollPositionWithOffset = scrollPosition + 150 // offset para detección temprana

      // Comprobar cada sección
      const homeSection = document.getElementById("home")
      const gallerySection = document.getElementById("gallery")
      const generatorSection = document.getElementById("ai-generator")

      if (generatorSection && scrollPositionWithOffset >= generatorSection.offsetTop - 200) {
        setActiveSection("ai-generator")
      } else if (gallerySection && scrollPositionWithOffset >= gallerySection.offsetTop - 200) {
        setActiveSection("gallery")
      } else {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Ejecutar una vez al inicio para establecer el estado inicial
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Modificar el estilo del header para usar la opacidad calculada
  return (
    <header
      className="py-8 px-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: `${currentScheme.background}${Math.floor(90 + scrollOpacity * 60).toString(16)}`,
        backdropFilter: `blur(${4 + scrollOpacity * 8}px)`,
        boxShadow: scrollOpacity > 0.1 ? `0 4px 20px rgba(0,0,0,${scrollOpacity * 0.1})` : "none",
      }}
    >
      <div
        className="container mx-auto flex justify-between items-center pb-4"
        style={{ borderBottomColor: `${currentScheme.text}10` }}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("home")
          }}
          className="text-xl font-serif italic tracking-wide"
          style={{ color: currentScheme.text }}
        >
          Galería<span style={{ color: currentScheme.accent }}>.</span>
        </a>
        <nav className="space-x-8">
          <a
            href="#home"
            className="text-sm transition-colors duration-300 relative"
            style={{
              color: activeSection === "home" ? currentScheme.text : currentScheme.secondary,
            }}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
          >
            <span className="relative">
              Inicio
              <span
                className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300"
                style={{
                  backgroundColor: currentScheme.accent,
                  width: activeSection === "home" ? "100%" : "0",
                }}
              ></span>
            </span>
          </a>
          <a
            href="#gallery"
            className="text-sm transition-colors duration-300 relative"
            style={{
              color: activeSection === "gallery" ? currentScheme.text : currentScheme.secondary,
            }}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("gallery")
            }}
          >
            <span className="relative">
              Galería
              <span
                className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300"
                style={{
                  backgroundColor: currentScheme.accent,
                  width: activeSection === "gallery" ? "100%" : "0",
                }}
              ></span>
            </span>
          </a>
          <a
            href="#ai-generator"
            className="text-sm transition-colors duration-300 relative"
            style={{
              color: activeSection === "ai-generator" ? currentScheme.text : currentScheme.secondary,
            }}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("ai-generator")
            }}
          >
            <span className="relative">
              Generador
              <span
                className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300"
                style={{
                  backgroundColor: currentScheme.accent,
                  width: activeSection === "ai-generator" ? "100%" : "0",
                }}
              ></span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  )
}

