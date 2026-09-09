import { useState } from "react";

export const useTagManager = (initialTags: string[] = []) => {
  const [tags, setTags] = useState<string[]>(initialTags);

  function updateTagInput(e: React.ChangeEvent<HTMLInputElement>) {
    //logic for updating the tag input
    const inputValue: string = e.target.value;
    if (inputValue.endsWith(",")) {
      commitTag(inputValue);
      e.target.value = "";
    }
  }

  function commitTag(tagInput: string) {
    // Logic for committing the tag
    const newTag: string = tagInput.trim().replace(/,$/, "");
    if (newTag) {
      setTags((prevTags) =>
        prevTags.includes(newTag) ? prevTags : [...prevTags, newTag],
      );
    }
  }

  function handleTagRemove(tagToRemove: string | null) {
    if (tagToRemove) {
      setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
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

  return { tags, updateTagInput, commitTag, handleTagRemove, handleTagKeyDown };
};
