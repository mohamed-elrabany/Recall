
import { useMemo, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { getTagNames } from "../utils/tagsNames";

const DEFAULT_TAGS: string[] = [
  "Programming",
  "Learning",
  "Technology",
  "Research",
  "Ideas",
];

const RECOMMENDATION_LIMIT = 5;

// Normalize names for duplicate checking without changing their display.
function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

function getUniqueTags(tagNames: string[]): string[] {
  const seen = new Set<string>();

  return tagNames.reduce<string[]>((uniqueTags, tag) => {
    const trimmedTag = tag.trim();
    const normalizedTag = normalizeTag(trimmedTag);

    if (normalizedTag && !seen.has(normalizedTag)) {
      seen.add(normalizedTag);
      uniqueTags.push(trimmedTag);
    }

    return uniqueTags;
  }, []);
}

export const useTagManager = (initialTags: string[] = []) => {
  const [tags, setTags] = useState<string[]>(() =>
    getUniqueTags(initialTags),
  );

  // Get saved tags from Redux and convert them into strings.
  const userTags = useAppSelector((state) => state.tags);

  const savedTagNames = useMemo(
    () => getTagNames(userTags),
    [userTags],
  );

  // Combine saved tags and defaults, removing duplicates.
  const availableTagPool = useMemo(
    () => getUniqueTags([...savedTagNames, ...DEFAULT_TAGS]),
    [savedTagNames],
  );

  // Recommendations exclude tags that are already selected.
  // Keep the list filled to five when enough candidates are available.
  const recommendedTags = useMemo(() => {
    const selectedNames = new Set(tags.map(normalizeTag));

    return availableTagPool
      .filter((tag) => !selectedNames.has(normalizeTag(tag)))
      .slice(0, RECOMMENDATION_LIMIT);
  }, [availableTagPool, tags]);

  function commitTag(tagInput: string) {
    const newTag = tagInput.trim().replace(/,$/, "").trim();

    if (!newTag) return;

    setTags((prevTags) => {
      const alreadySelected = prevTags.some(
        (tag) => normalizeTag(tag) === normalizeTag(newTag),
      );

      return alreadySelected ? prevTags : [...prevTags, newTag];
    });
  }

  function selectRecommendedTag(tag: string) {
    // Use the same logic as manually adding a tag.
    commitTag(tag);
  }

  function updateTagInput(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (inputValue.endsWith(",")) {
      commitTag(inputValue);
      e.target.value = "";
    }
  }

  function handleTagRemove(tagToRemove: string | null) {
    if (tagToRemove) {
      setTags((prevTags) =>
        prevTags.filter(
          (tag) => normalizeTag(tag) !== normalizeTag(tagToRemove),
        ),
      );
    } else {
      setTags((prevTags) => prevTags.slice(0, -1));
    }
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitTag(e.currentTarget.value);
      e.currentTarget.value = "";
    } else if (
      e.key === "Backspace" &&
      tags.length > 0 &&
      e.currentTarget.value === ""
    ) {
      handleTagRemove(null);
    }
  }

  return {
    tags,
    recommendedTags,
    updateTagInput,
    commitTag,
    selectRecommendedTag,
    handleTagRemove,
    handleTagKeyDown,
  };
};
