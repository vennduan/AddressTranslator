/**
 * API Router Worker
 * 
 * A generic API routing worker that handles multiple endpoints.
 * Currently supports:
 * - /transadd: Translation service using Mistral AI
 * 
 * - Run "npm run dev" in your terminal to start a development server
 * - Run "npm run deploy" to publish your worker
 * 
 * Learn more at https://developers.cloudflare.com/workers/
 */

// CORS headers helper
function getCorsHeaders() {
  const allowedOrigin = "*";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
    "Access-Control-Max-Age": "86400",
  };
}

// Handle OPTIONS preflight requests
function handleOptions() {
  return new Response(null, { headers: getCorsHeaders() });
}

// Handle /transadd endpoint - Translation service
async function handleTransadd(request, env) {
  const corsHeaders = getCorsHeaders();
  
  // Mistral AI API configuration
  const MISTRAL_API_URL = "https://api.mistral.ai/v1/agents/completions";
  const MISTRAL_API_KEY = env.MISTRAL_API_KEY;
  
  // Check if API key is configured
  if (!MISTRAL_API_KEY) {
    return new Response(JSON.stringify({ error: "MISTRAL_API_KEY is not configured" }), { 
      status: 500, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
  
  // Check if API_ID is configured
  if (!env.API_ID) {
    return new Response(JSON.stringify({ error: "API_ID is not configured" }), { 
      status: 500, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
  
  // Parse request body
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON body", details: err.message }), { 
      status: 400, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
  
  // Check if messages field exists
  if (!requestBody.messages) {
    return new Response(JSON.stringify({ error: "Missing messages field" }), { 
      status: 400, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
  
  // Convert messages to Mistral AI format
  // Support both translateType and tranlateType (typo) for backward compatibility
  const translateType = requestBody.translateType || requestBody.tranlateType || "cn2en";
  
  let messages = Array.isArray(requestBody.messages)
    ? requestBody.messages
    : [
        {
          role: "user",
          content:
            requestBody.messages +
            (translateType === "cn2en"
              ? "please translate to English address"
              : "please translate to Chinese address"),
        },
      ];
  
  // Construct Mistral AI request body
  const mistralRequestBody = {
    agent_id: env.API_ID,
    messages: messages,
  };
  
  // Call Mistral AI API
  const mistralResponse = await fetch(MISTRAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${MISTRAL_API_KEY}`,
    },
    body: JSON.stringify(mistralRequestBody),
  });
  
  // Check if Mistral AI response is successful
  if (!mistralResponse.ok) {
    const errorText = await mistralResponse.text();
    return new Response(JSON.stringify({ 
      error: "Failed to call Mistral AI API", 
      status: mistralResponse.status,
      details: errorText 
    }), {
      status: mistralResponse.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  
  // Parse Mistral AI response
  const mistralResponseData = await mistralResponse.json();
  
  // Return response to client
  return new Response(JSON.stringify(mistralResponseData), {
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

// Main router
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Handle OPTIONS preflight requests
    if (request.method === "OPTIONS") {
      return handleOptions();
    }
    
    // Route handling
    if (pathname === "/transadd" || pathname.startsWith("/transadd/")) {
      return handleTransadd(request, env);
    }
    
    // 404 for unmatched routes
    return new Response("Not Found", { 
      status: 404,
      headers: getCorsHeaders(),
    });
  },
};