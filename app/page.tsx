import { Gallery } from "@/components/gallery"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundDecoration } from "@/components/background-decoration"
import { ColorButtons } from "@/components/color-buttons"
import { AIImageGenerator } from "@/components/ai-image-generator"

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <BackgroundDecoration />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10 mt-24">
        <div id="home" className="mt-16 mb-20 text-center">
          <h1 className="text-5xl font-serif italic mb-6 relative inline-block" style={{ color: "var(--text)" }}>
            Galería Creativa
            <span
              className="absolute -bottom-3 left-0 w-full h-[1px] opacity-30"
              style={{ backgroundColor: "var(--text)" }}
            ></span>
          </h1>
          <p className="max-w-xl mx-auto font-light tracking-wide text-lg" style={{ color: "var(--secondary)" }}>
            Una colección de momentos capturados en disposición artística
          </p>
        </div>
        <Gallery />
        <AIImageGenerator />
      </main>
      <Footer />
      <ColorButtons />
    </div>
  )
}

