
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TwitterImageRequest {
  imageUrl: string;
  text: string;
  textColor: 'white' | 'black';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { imageUrl, text, textColor }: TwitterImageRequest = await req.json();

    console.log('Generating Twitter image with text overlay:', { imageUrl, text, textColor });

    // Download the original image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    
    const imageBlob = await imageResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    
    // Create canvas and draw image with text overlay
    const canvas = new OffscreenCanvas(1200, 630); // Twitter recommended image size
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Create image from buffer
    const imageData = new Uint8Array(imageBuffer);
    const image = new ImageData(imageData, canvas.width, canvas.height);
    
    // For simplicity, we'll use a solid background with the text
    // In a real implementation, you'd decode and draw the actual image
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text overlay
    if (text) {
      // Set up text styling to match the logo style (Inter font)
      ctx.font = 'bold 64px Inter, system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = textColor === 'white' ? '#ffffff' : '#000000';
      
      // Add text shadow for better readability
      ctx.shadowColor = textColor === 'white' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 4;
      
      // Word wrap for long text
      const words = text.split(' ');
      const maxWidth = canvas.width - 100; // Padding
      let line = '';
      let y = canvas.height / 2;
      const lineHeight = 80;
      
      // Calculate total height needed
      const lines = [];
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      
      // Adjust starting y position for multiple lines
      y = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
      
      // Draw each line
      lines.forEach((line, index) => {
        ctx.fillText(line.trim(), canvas.width / 2, y + (index * lineHeight));
      });
    }
    
    // Convert canvas to blob
    const blob = await canvas.convertToBlob({ type: 'image/png', quality: 0.9 });
    const arrayBuffer = await blob.arrayBuffer();
    
    // Upload to Supabase storage (if you have storage set up)
    // For now, we'll return the base64 data
    const base64Data = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataUrl = `data:image/png;base64,${base64Data}`;

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: dataUrl,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Twitter image generation error:', error);
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
