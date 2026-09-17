import { supabase } from "../lib/supabaseClient";
import type { ThemeMode, LayoutMode } from "../types/settings";
import type { Profile } from "../types/profile";

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

export async function updateAvatar(userId: string, avatar: File) {
  const filePath = `${userId}/avatar.jpg`;

  // 1. Upload image
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, avatar, {
      upsert: true,
      contentType: avatar.type,
    });

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError);
    throw uploadError;
  }

  // 2. Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  // 3. Save URL in profile
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
