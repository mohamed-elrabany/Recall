import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { updateBookmark as updateBookmarkService } from "../../services/bookmarkServices";
import { useNavigate } from "react-router";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useTagManager } from "../../hooks/useTagManager";
import type { BookMark, BookmarkInput } from "../../types/bookmark";
import { useAppDispatch } from "../../store/hooks";
import { bookmarkActions } from "../../store/slices/bookmarkSlice";
import { getTagNames } from "../../utils/tagsNames";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { MdAdd, MdLink, MdErrorOutline } from "react-icons/md";
import {
  LuFileText,
  LuAlignLeft,
  LuInfo,
} from "react-icons/lu";


export default function EditBookmarkForm({
  bookmark,
  error,
}: {
  bookmark: BookMark;
  error?: string;
}) {
  const initial = useRef(bookmark).current;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { tags, recommendedTags, updateTagInput, commitTag, handleTagRemove, handleTagKeyDown } =
    useTagManager(getTagNames(bookmark.tags));

  const [url, setUrl] = useState(bookmark.url || "");
  const [title, setTitle] = useState(bookmark.title || "");
  const [snippet, setSnippet] = useState(bookmark.snippet || "");
  const [notes, setNotes] = useState(bookmark.notes || "");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasSnippet = Boolean(snippet?.trim());
  const hasNotes = Boolean(notes?.trim());
  const hasContext = hasSnippet || hasNotes;


const initialTagNames = getTagNames(initial.tags);

const normalize = (value: string | null | undefined) =>
  (value ?? "").trim();

const sameTags =
  tags.length === initialTagNames.length &&
  [...tags].sort().every((tag, index) => tag === [...initialTagNames].sort()[index]);

const isUpdated =
  normalize(url) !== normalize(initial.url) ||
  normalize(title) !== normalize(initial.title) ||
  normalize(snippet) !== normalize(initial.snippet) ||
  normalize(notes) !== normalize(initial.notes) ||
  !sameTags;


  useEffect(() => {
    if (bookmark.status === "processing") {
      navigate(`/bookmarks/${bookmark.id}`, { replace: true });
    }
  }, [bookmark.status, bookmark.id, navigate]);

  async function handleUpdateBookmark(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting || !bookmark.id || !hasContext) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const updatedBookmark: BookmarkInput = {
        ...bookmark,
        url,
        title: title || null,
        snippet: snippet || null,
        notes: notes || null,
        tags: tags.length > 0 ? tags : null,
      };

      const updated = await updateBookmarkService(
        bookmark.id,
        updatedBookmark,
        // second dispatch when the embedding finishes (done / failed / manual)
        (final) => dispatch(bookmarkActions.updateBookmark(final)),
      );

      // first dispatch: shows the saved bookmark with status "processing"
      dispatch(bookmarkActions.updateBookmark(updated));
      navigate(`/bookmarks/${bookmark.id}`);
    } catch (err) {
      console.error("Error updating bookmark:", err);
      setSubmitError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="
          fixed inset-0 z-100
          flex items-end justify-center md:items-center
          bg-background/50
          backdrop-blur-sm
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: isMobile ? "100%" : 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: isMobile ? "100%" : 40,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
          }}
          className="
            bg-card
            w-full
            max-h-[80vh]
            overflow-y-auto
            rounded-t-2xl
            shadow-lg
            p-6
            md:max-w-xl
            md:rounded-2xl
          "
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-lg font-bold text-foreground"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Edit bookmark
            </h2>

            <button
              type="button"
              aria-label="Close"
              onClick={() => navigate(-1)}
              className="
                w-8 h-8 rounded-lg bg-muted
                flex items-center justify-center
                text-muted-foreground
                hover:text-foreground
                hover:bg-border
                transition-colors
              "
            >
              <IoClose className="w-4 h-4" />
            </button>
          </div>

          {/* {error && <p className="text-sm text-red-500">{error}</p>} */}

          {submitError && (
            <div
              role="alert"
              className="
      mt-3 flex items-start gap-2.5
      rounded-xl border border-red-500/20
      bg-red-500/5 p-3
      text-sm text-muted-foreground
    "
            >
              <MdErrorOutline
                size={18}
                className="mt-0.5 shrink-0 text-red-500"
              />

              <p className="leading-relaxed">{submitError}</p>
            </div>
          )}
          {!hasContext && (
            <div
              role="alert"
              className="
      mt-3 flex items-start gap-2.5
      rounded-xl border border-amber-500/20
      bg-amber-500/5 p-3
      text-sm text-muted-foreground
    "
            >
              <LuInfo size={18} className="mt-0.5 shrink-0 text-amber-500" />

              <p className="leading-relaxed">
                <span className="font-semibold text-foreground">
                  Summary or Notes required.
                </span>{" "}
                Please fill in at least one of these fields before updating your
                bookmark.
              </p>
            </div>
          )}

          <form onSubmit={handleUpdateBookmark} className="mt-4 space-y-4">
            <Input
              id="url"
              type="text"
              label="URL"
              icon={MdLink}
              name="url"
              placeholder="https://..."
              disabled
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Input
              id="title"
              type="text"
              label="Title"
              name="title"
              placeholder="Article or page title"
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              id="snippet"
              type="text"
              textarea
              rows={4}
              label={`Summary ${hasNotes ? "(optional)" : "(required)"}`}
              icon={LuAlignLeft}
              name="snippet"
              placeholder="A short description of what this link is about..."
              value={snippet}
              required={!hasNotes}
              onChange={(e) => setSnippet(e.target.value)}
            />

            <Input
              id="notes"
              type="text"
              textarea
              rows={4}
              label={`Notes ${hasSnippet ? "(optional)" : "(required)"}`}
              required={!hasSnippet}
              icon={LuFileText}
              name="notes"
              placeholder="Why are you using this? What do you want to remember?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div>
              <div>
                <label
                  className="
                    block text-xs font-semibold
                    text-muted-foreground
                    mb-1.5 cursor-pointer
                  "
                >
                  Tags
                </label>

                <div
                  className="
                    flex items-center gap-2 flex-wrap
                    border-2 border-border
                    px-4 py-3 rounded-lg
                  "
                >
                  {tags?.map((tag) => (
                    <span
                      key={tag}
                      className="
                        inline-block bg-primary/10
                        text-[10px] text-primary
                        px-2 py-1 font-medium
                        rounded-full
                      "
                    >
                      {tag}

                      <IoClose
                        onClick={() => handleTagRemove(tag)}
                        size={12}
                        className="
                          ml-1 inline-block
                          cursor-pointer
                        "
                      />
                    </span>
                  ))}

                  <input
                    type="text"
                    className="
                      flex-1 bg-transparent
                      text-sm text-foreground
                      placeholder:text-muted-foreground
                      outline-none
                    "
                    placeholder={tags.length === 0 ? "Add tags..." : undefined}
                    onChange={(e) => updateTagInput(e)}
                    onKeyDown={(e) => handleTagKeyDown(e)}
                  />
                </div>
              </div>

              {tags.filter(Boolean).map((tag, index) => (
                <input
                  key={`${tag}-${index}`}
                  type="hidden"
                  name="tags"
                  value={tag}
                />
              ))}

              <div
                className="
                  text-xs text-muted-foreground
                  mt-2 flex items-center
                  gap-2 flex-wrap
                "
              >
                {recommendedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => commitTag(tag)}
                    className="
                      flex items-center gap-1
                      bg-muted-foreground/10
                      text-[10px] text-muted-foreground
                      px-2 py-1 font-medium
                      rounded-full
                    "
                  >
                    <MdAdd />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {(error || submitError) && (
              <p className="text-sm text-red-500">{error ?? submitError}</p>
            )}

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
                className="w-full"
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                disabled={!isUpdated || isSubmitting || !hasContext}
                type="submit"
                variant="primary"
                className="w-full"
              >
                <AnimatePresence>
                  {isSubmitting ? <p>Updating</p> : <p>Update Bookmark</p>}

                  {isSubmitting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CgSpinner className="animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
