import { supabase } from "../lib/supabaseClient";
import type { Tag } from "../types/tag";

export async function fetchTags(): Promise<Tag[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data as Tag[];
}
