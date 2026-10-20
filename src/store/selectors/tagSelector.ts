import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Tag } from "../../types/tag";

export const selectTagsWithFrequency = createSelector(
  [(state: RootState) => state.bookmarks],
  (bookmarks) => {
    const tagMap = new Map<string, { tag: Tag; frequency: number }>();

    bookmarks.forEach((bookmark) => {
      (bookmark.tags ?? []).forEach((item) => {
        // Support both Tag objects and legacy string tags.
        const tag: Tag | null =
          typeof item === "string"
            ? null
            : item;

        if (!tag) return;

        const existing = tagMap.get(tag.id);

        if (existing) {
          existing.frequency += 1;
        } else {
          tagMap.set(tag.id, {
            tag,
            frequency: 1,
          });
        }
      });
    });

    return Array.from(tagMap.values()).sort(
      (a, b) => b.frequency - a.frequency,
    );
  },
);
