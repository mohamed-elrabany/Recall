import { supabase } from "../lib/supabaseClient";
import type { ThemeMode, LayoutMode } from "../types/settings";

export async function getCurrentUser() {
    const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", (await supabase.auth.getUser()).data.user?.id)
    .single();

    if (error) {
        console.error("Error getting current user:", error);
        throw error;
    }
    return data;
}

function extractPathFromUrl(url: string, bucket: string): string | null {
  const marker = `/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length).split("?")[0]; // strip any query params
}

export async function updateAvatar(userId: string, avatar: File) {
  const newFilePath = `${userId}/avatar-${crypto.randomUUID()}.jpg`;

  // 1. Get current avatar_url so we know what to delete afterward
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current avatar:", fetchError);
    throw fetchError;
  }

  const oldFilePath = profile?.avatar_url
    ? extractPathFromUrl(profile.avatar_url, "avatars")
    : null;

  // 2. Upload new image under a unique path (no upsert needed, path is always fresh)
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(newFilePath, avatar, {
      contentType: avatar.type,
    });

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError);
    throw uploadError;
  }

  // 3. Get public URL for the new file
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(newFilePath);

  // 4. Save the new URL in the profile
  const { data, error } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating avatar URL:", error);
    throw error;
  }

  // 5. Now that the swap succeeded, delete the old file
  if (oldFilePath && oldFilePath !== newFilePath) {
    const { error: removeError } = await supabase.storage
      .from("avatars")
      .remove([oldFilePath]);

    if (removeError) {
      // Non-fatal — the user's new avatar is live either way
      console.error("Failed to remove old avatar:", removeError);
    }
  }

  return data;
}

export async function removeAvatar(userId: string) {
  // 1. Get current avatar_url so we know what to delete
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current avatar:", fetchError);
    throw fetchError;
  }

  const filePath = profile?.avatar_url
    ? extractPathFromUrl(profile.avatar_url, "avatars")
    : null;

  // 2. Remove image from storage (only if there is one)
  if (filePath) {
    const { error: removeError } = await supabase.storage
      .from("avatars")
      .remove([filePath]);

    if (removeError) {
      console.error("Error removing avatar:", removeError);
      throw removeError;
    }
  }

  // 3. Remove URL from profile
  const { data, error } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error removing avatar URL:", error);
    throw error;
  }

  return data;
}

export async function updateTheme(userId: string, theme: ThemeMode) {
    const { data, error } = await supabase
    .from("profiles")
    .update({ theme_preference: theme })
    .eq("id", userId)
    .select()
    .single();

    if (error) {
        console.error("Error updating theme:", error);
        throw error;
    }

    return data;
}

export async function updateLayout(userId: string, layout: LayoutMode) {
    const { data, error } = await supabase
    .from("profiles")
    .update({ card_layout: layout })
    .eq("id", userId)
    .select()
    .single();

    if (error) {
        console.error("Error updating layout:", error);
        throw error;
    }

    return data;
}
