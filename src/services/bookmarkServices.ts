import { supabase } from "../lib/supabaseClient";
import type { BookMark } from "../types/bookmark";

export async function fetchBookmarks(): Promise<BookMark[] | null> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addBookmark(bookmark: BookMark): Promise<BookMark | null> {
  const { data, error } = await supabase
  .from("bookmarks")
  .insert(bookmark)
  .select()
  .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateBookmark(id: string, bookmark: BookMark): Promise<BookMark | null> {
  const { data, error } = await supabase
    .from("bookmarks")
    .update({
      ...bookmark,
      status: "processing",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteBookmark(id: string): Promise<void> {
  const {  error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getBookmarkById(id: string): Promise<BookMark | null> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function toggleBookmarkFavorite(id: string, isFavorite: boolean) {
  const { data, error } = await supabase
    .from("bookmarks")
    .update({ is_favorite: isFavorite })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
