'use server'

/* Test Promts 
"I want you to create a creative image for my website showing an artist painting something. Keep in mind the following for the creation of the image: The image you will create will be used for my web page, therefore I want the colors of the image you will create to harmonize with the dominant colors of the web page which are in RGB format and are: (254, 253, 254) (216, 212, 215) (159, 163, 165) (58, 57, 61)"
The image should especially use the following dominant shades in its design: rgb(164, 153, 148) ,rgb(107, 91, 84), rgb(206, 204, 203), rgb(37, 42, 49).

*/

export async function generateImageOpenAI(OPENAI_API_KEY :string) {
  
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: "Create a creative and artistic image for a website. The scene should feature an artist actively painting on a canvas, in a well-composed and visually appealing setting. The style can be realistic or slightly stylized, but it should evoke a sense of inspiration and creativity. The overall color palette should be dominated by the following tones: Warm taupe: rgb(164, 153, 148) Dark brown/charcoal: rgb(107, 91, 84) Soft gray: rgb(206, 204, 203) Deep slate blue/black: rgb(37, 42, 49) These colors should be prominent in the background, clothing, furniture, or canvas—creating a harmonious, slightly muted, and modern artistic atmosphere.",
        n: 1,
        size: '1024x1024',
      }),
    });
  
    const data = await response.json();
  
    // Si la respuesta es exitosa, pasa la URL de la imagen a la página
    const imageUrl = data?.data?.[0]?.url || null;
    console.log(imageUrl)
}