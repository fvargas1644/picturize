'use server'

import sharp from 'sharp';

export async function convertImageToPixels(arrayBuffer: any){

    const imageBuffer = Buffer.from(arrayBuffer);

    // Usar sharp para procesar la imagen y obtener los datos de píxeles
    const image = sharp(imageBuffer).resize(300, 300);
    const { data } = await image.raw().toBuffer({ resolveWithObject: true });

    // Convertir los datos crudos a un array de objetos RGB
    const pixels = [];
    for (let i = 0; i < data.length; i += 3) {
      const r = data[i];       // Red
      const g = data[i + 1];   // Green
      const b = data[i + 2];   // Blue
      pixels.push([r, g, b ]);
    } 

    return pixels;

}