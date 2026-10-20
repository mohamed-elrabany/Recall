import type { Tag } from "../types/tag";

export const getTagNames = (tags: Tag[] | null | undefined): string[] => {
  return tags?.map((tag) => tag.name) ?? [];
};