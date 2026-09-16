import { supabase } from "../lib/supabaseClient";
import type { Profile } from "../types/profile";
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

export async function updateUserData(profile: Profile) {
    const { data, error } = await supabase
    .from("profiles")
    .update({profile})
    .eq("id", profile.id)
    .select()
    .single();

    if (error) {
        console.error("Error updating user data:", error);
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
