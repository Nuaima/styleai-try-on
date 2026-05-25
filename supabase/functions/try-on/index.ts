import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userImage, garmentImage, garmentName } = await req.json();

    if (!userImage || !garmentImage) {
      return new Response(
        JSON.stringify({ error: "Missing userImage or garmentImage" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `You are a virtual try-on assistant. Take the person from the FIRST image and dress them in the garment shown in the SECOND image (${garmentName ?? "garment"}).
Replace their current outfit with this exact garment — preserving its color, print, text, embroidery, fabric texture, silhouette, and overall design exactly as shown in the second image. If the second image shows a full outfit (kurta with shalwar/palazzo/dupatta, dress, suit, etc.), dress the person in the complete outfit.
Render the person as a FULL-BODY shot from head to toe. If the original photo is cropped (waist-up, half-body, etc.), naturally extend the frame downward to show the full body, legs, and feet with realistic proportions, footwear, and a background that seamlessly continues the original scene.
Keep the person's face, hair, skin tone, body proportions, pose, and the original background style completely unchanged. The garment should fit naturally with realistic folds, drape, lighting, and shadows that match the original photo.
Output only the final photorealistic full-body image of the person wearing this outfit.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: userImage } },
              { type: "image_url", image_url: { url: garmentImage } },
            ],
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ error: "AI try-on failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const generated = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generated) {
      console.error("No image in response", JSON.stringify(data).slice(0, 500));
      return new Response(
        JSON.stringify({ error: "Try-on did not return an image. Please try a clearer photo." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ image: generated }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("try-on error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
