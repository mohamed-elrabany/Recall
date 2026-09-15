import { supabase } from "../lib/supabaseClient";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function register({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const username: string = `${firstName} ${lastName}`;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function deleteAccount({ userId }: { userId: string }) {
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) {
    throw error;
  }
}

export async function resendConfirmation({ email }: { email: string }) {
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) throw error;
}
