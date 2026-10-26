import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: corsHeaders },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders },
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify the caller's identity using their access token.
    const supabase = createClient(supabaseUrl, anonKey);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return Response.json(
        { error: "Invalid or expired session" },
        { status: 401, headers: corsHeaders },
      );
    }

    // Admin privileges stay on the server, never in the frontend.
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Remove the user's avatar files from Storage first.
    // Adjust "avatars" and the path to match how AdjustAvatar uploads files.
    const { data: files, error: listError } = await supabaseAdmin.storage
      .from("avatars")
      .list(user.id);

    if (listError) {
      console.error("Failed to list avatar files:", listError.message);
    } else if (files?.length) {
      const { error: removeError } = await supabaseAdmin.storage
        .from("avatars")
        .remove(files.map((f) => `${user.id}/${f.name}`));

      if (removeError) {
        console.error("Failed to remove avatar files:", removeError.message);
      }
    }

    // Deleting the auth user cascades to profiles and other user tables.
    const { error: deleteError } =
      await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error("Account deletion failed:", deleteError.message);

      return Response.json(
        { error: "Failed to delete account" },
        { status: 500, headers: corsHeaders },
      );
    }

    return Response.json(
      { success: true, message: "Account deleted successfully" },
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Unexpected error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
});