
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.6/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, text, textColor = 'white' } = await req.json();
    
    console.log('Generating LinkedIn image with:', { imageUrl, text, textColor });

    // Fetch the original image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    
    const imageArrayBuffer = await imageResponse.arrayBuffer();
    const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(imageArrayBuffer)));
    const imageSrc = `data:${imageResponse.headers.get('content-type') || 'image/jpeg'};base64,${imageBase64}`;

    const imageElement = new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '1200px',
            height: '630px',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imageSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
            }}
          />
          
          {text && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
                zIndex: 1,
                maxWidth: '80%',
              }}
            >
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  color: textColor,
                  margin: '0',
                  lineHeight: '1.2',
                  fontFamily: 'system-ui, sans-serif',
                  textShadow: textColor === 'white' 
                    ? '2px 2px 4px rgba(0,0,0,0.8)' 
                    : '2px 2px 4px rgba(255,255,255,0.8)',
                }}
              >
                {text}
              </h1>
              
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '30px',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(0, 119, 181, 0.9)',
                  borderRadius: '8px',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  Follow us on LinkedIn
                </span>
              </div>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    const response = new Response(imageElement.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

    console.log('LinkedIn image generated successfully');
    return response;

  } catch (error) {
    console.error('Error generating LinkedIn image:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
