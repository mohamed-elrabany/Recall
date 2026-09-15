export type Profile={
  id: string;
  full_name: string;
  avatar_url?: string;
  theme_preference?: "light" | "dark" | "system";
  createdAt: Date;
  updatedAt: Date;
};