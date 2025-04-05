import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertImageToPixels (url : any) {

  // Crea una imagen a partir del blob
  const img = new Image();
  img.src = url;

  // Espera a que la imagen cargue
  img.onload = () => {
    // Crear un canvas para extraer los píxeles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Establece el tamaño del canvas al tamaño de la imagen
    canvas.width = img.width;
    canvas.height = img.height;

    // Dibuja la imagen en el canvas
    ctx.drawImage(img, 0, 0);

    // Extrae los datos de la imagen (píxeles en formato RGBA)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imageData)

    if(imageData.data) {
      
    // Los datos de la imagen estarán en imageData.data (un array de valores RGBA)
    return "a"
    }

  };
};
