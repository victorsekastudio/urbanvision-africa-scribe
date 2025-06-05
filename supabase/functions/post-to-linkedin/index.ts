
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { articleId, imageUrl, caption, imageText, textColor = 'white' } = await req.json();
    
    console.log('LinkedIn posting request:', { articleId, imageUrl, caption, imageText, textColor });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get LinkedIn credentials from environment
    const linkedinAccessToken = Deno.env.get('LINKEDIN_ACCESS_TOKEN');
    const linkedinPersonId = Deno.env.get('LINKEDIN_PERSON_ID');

    if (!linkedinAccessToken || !linkedinPersonId) {
      throw new Error('LinkedIn credentials not configured. Please set LINKEDIN_ACCESS_TOKEN and LINKEDIN_PERSON_ID in your environment variables.');
    }

    let finalImageUrl = imageUrl;

    // Generate image with text overlay if imageText is provided
    if (imageText && imageText.trim()) {
      console.log('Generating LinkedIn image with text overlay');
      
      const imageGenerationResponse = await fetch(`${supabaseUrl}/functions/v1/generate-linkedin-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          imageUrl,
          text: imageText,
          textColor,
        }),
      });

      if (imageGenerationResponse.ok) {
        const imageBlob = await imageGenerationResponse.blob();
        
        // Upload the generated image to a temporary storage or use it directly
        // For now, we'll convert it to base64 and upload to LinkedIn directly
        const imageArrayBuffer = await imageBlob.arrayBuffer();
        const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(imageArrayBuffer)));
        
        // Upload image to LinkedIn
        const uploadResponse = await fetch('https://api.linkedin.com/rest/images?action=initializeUpload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${linkedinAccessToken}`,
            'Content-Type': 'application/json',
            'LinkedIn-Version': '202309',
          },
          body: JSON.stringify({
            initializeUploadRequest: {
              owner: `urn:li:person:${linkedinPersonId}`,
            },
          }),
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          const uploadUrl = uploadData.value.uploadUrl;
          const imageUrn = uploadData.value.image;

          // Upload the actual image
          const imageUploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${linkedinAccessToken}`,
            },
            body: imageArrayBuffer,
          });

          if (imageUploadResponse.ok) {
            finalImageUrl = imageUrn;
            console.log('Image uploaded to LinkedIn successfully');
          }
        }
      }
    }

    // Create LinkedIn post
    const postData = {
      author: `urn:li:person:${linkedinPersonId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: caption,
          },
          shareMediaCategory: 'IMAGE',
          media: finalImageUrl ? [{
            status: 'READY',
            description: {
              text: 'Article image',
            },
            media: finalImageUrl.startsWith('urn:li:') ? finalImageUrl : imageUrl,
            title: {
              text: 'Urban Vision Article',
            },
          }] : [],
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    console.log('Posting to LinkedIn:', JSON.stringify(postData, null, 2));

    const response = await fetch('https://api.linkedin.com/rest/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${linkedinAccessToken}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': '202309',
      },
      body: JSON.stringify(postData),
    });

    const responseText = await response.text();
    console.log('LinkedIn API response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status} - ${responseText}`);
    }

    const linkedinResponse = JSON.parse(responseText);
    console.log('LinkedIn post created successfully:', linkedinResponse);

    // Update article with LinkedIn post information
    const { error: updateError } = await supabase
      .from('articles')
      .update({
        linkedin_post_id: linkedinResponse.id,
        linkedin_post_url: `https://www.linkedin.com/feed/update/${linkedinResponse.id}`,
        social_media_posted_at: new Date().toISOString(),
      })
      .eq('id', articleId);

    if (updateError) {
      console.error('Error updating article with LinkedIn post info:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        postId: linkedinResponse.id,
        postUrl: `https://www.linkedin.com/feed/update/${linkedinResponse.id}`,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error posting to LinkedIn:', error);
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
