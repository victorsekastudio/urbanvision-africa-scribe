
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InstagramPostRequest {
  articleId: string;
  imageUrl: string;
  caption: string;
  imageText?: string;
  textColor?: 'white' | 'black';
}

async function generateImageWithText(
  imageUrl: string, 
  text: string, 
  textColor: 'white' | 'black' = 'white'
): Promise<string> {
  const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/generate-instagram-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
    },
    body: JSON.stringify({
      imageUrl,
      text,
      textColor,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate image with text overlay');
  }

  const result = await response.json();
  return result.imageDataUrl;
}

async function postToInstagram(imageUrl: string, caption: string): Promise<any> {
  const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
  const instagramUserId = Deno.env.get('INSTAGRAM_USER_ID');

  if (!accessToken || !instagramUserId) {
    throw new Error('Instagram credentials not configured');
  }

  // Step 1: Create media container
  const containerResponse = await fetch(
    `https://graph.instagram.com/v18.0/${instagramUserId}/media`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
        caption: caption,
        access_token: accessToken,
      }),
    }
  );

  if (!containerResponse.ok) {
    const error = await containerResponse.text();
    throw new Error(`Failed to create Instagram media container: ${error}`);
  }

  const containerData = await containerResponse.json();
  const creationId = containerData.id;

  // Step 2: Publish the media
  const publishResponse = await fetch(
    `https://graph.instagram.com/v18.0/${instagramUserId}/media_publish`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken,
      }),
    }
  );

  if (!publishResponse.ok) {
    const error = await publishResponse.text();
    throw new Error(`Failed to publish Instagram post: ${error}`);
  }

  const publishData = await publishResponse.json();
  return {
    postId: publishData.id,
    postUrl: `https://www.instagram.com/p/${publishData.id}/`,
  };
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

    const { articleId, imageUrl, caption, imageText, textColor }: InstagramPostRequest = await req.json();

    console.log('Posting to Instagram for article:', articleId);

    let finalImageUrl = imageUrl;

    // Generate image with text overlay if text is provided
    if (imageText && imageText.trim()) {
      console.log('Generating image with text overlay:', imageText);
      finalImageUrl = await generateImageWithText(imageUrl, imageText, textColor || 'white');
    }

    // Post to Instagram
    const result = await postToInstagram(finalImageUrl, caption);

    // Update article with Instagram post information
    const { error: updateError } = await supabaseClient
      .from('articles')
      .update({
        instagram_post_id: result.postId,
        instagram_post_url: result.postUrl,
        social_media_posted_at: new Date().toISOString(),
      })
      .eq('id', articleId);

    if (updateError) {
      console.error('Error updating article with Instagram info:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        postId: result.postId,
        postUrl: result.postUrl,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Instagram posting error:', error);
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
