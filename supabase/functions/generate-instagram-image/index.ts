
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ImageGenerationRequest {
  imageUrl: string;
  text: string;
  textColor: 'white' | 'black';
}

async function generateImageWithTextOverlay(
  imageUrl: string, 
  text: string, 
  textColor: 'white' | 'black'
): Promise<string> {
  // Fetch the original image
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error('Failed to fetch image');
  }
  
  const imageBlob = await imageResponse.blob();
  const imageArrayBuffer = await imageBlob.arrayBuffer();
  
  // Create canvas for image manipulation
  const canvas = new OffscreenCanvas(1080, 1080); // Instagram square format
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  // Load and draw the image
  const image = new Image();
  const imageDataUrl = `data:${imageBlob.type};base64,${btoa(String.fromCharCode(...new Uint8Array(imageArrayBuffer)))}`;
  
  return new Promise((resolve, reject) => {
    image.onload = () => {
      // Draw the image to fill the canvas
      ctx.drawImage(image, 0, 0, 1080, 1080);
      
      // Add semi-transparent overlay for better text readability
      const overlayColor = textColor === 'white' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
      ctx.fillStyle = overlayColor;
      ctx.fillRect(0, 0, 1080, 1080);
      
      // Configure text styling (matching UrbanVision font style)
      ctx.fillStyle = textColor;
      ctx.font = 'bold 72px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add text shadow for better readability
      ctx.shadowColor = textColor === 'white' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Word wrap function
      const wrapText = (text: string, maxWidth: number) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
          const word = words[i];
          const width = ctx.measureText(currentLine + ' ' + word).width;
          if (width < maxWidth) {
            currentLine += ' ' + word;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        }
        lines.push(currentLine);
        return lines;
      };
      
      // Wrap text and draw it
      const maxWidth = 900; // Leave some margin
      const lines = wrapText(text, maxWidth);
      const lineHeight = 80;
      const startY = 540 - ((lines.length - 1) * lineHeight) / 2;
      
      lines.forEach((line, index) => {
        ctx.fillText(line, 540, startY + index * lineHeight);
      });
      
      // Convert canvas to blob
      canvas.convertToBlob({ type: 'image/jpeg', quality: 0.9 }).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(blob);
      }).catch(reject);
    };
    
    image.onerror = () => reject(new Error('Failed to load image'));
    image.src = imageDataUrl;
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { imageUrl, text, textColor }: ImageGenerationRequest = await req.json();

    console.log('Generating Instagram image with overlay for:', text);

    if (!imageUrl || !text) {
      throw new Error('Missing required parameters: imageUrl and text');
    }

    // Generate the image with text overlay
    const generatedImageDataUrl = await generateImageWithTextOverlay(imageUrl, text, textColor);

    return new Response(
      JSON.stringify({
        success: true,
        imageDataUrl: generatedImageDataUrl,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Image generation error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
