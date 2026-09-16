export type Profile={
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  theme_preference?: "light" | "dark" | "system";
  card_layout?: "grid" | "list";
  created_at: Date;
  updated_at: Date;
};