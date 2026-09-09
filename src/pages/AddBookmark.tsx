import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useTagManager } from "../hooks/useTagManager";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { IoClose } from "react-icons/io5";
import { MdAdd, MdLink } from "react-icons/md";
import { LuFileText, LuLoaderCircle, LuCheck } from "react-icons/lu";

const buttontags: string[] = ["tag1", "tag2", "tag3", "tag4", "tag5"];

export function Component() {
  const navigate = useNavigate();
  const isMobile: boolean = useMediaQuery("(max-width: 768px)");
  const { tags, updateTagInput, commitTag, handleTagRemove, handleTagKeyDown } = useTagManager();

  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  //   const [isLoading, setIsLoading] = useState(false)
  //   const [fetched, setFetched] = useState(false)
  //   const [previewTitle, setPreviewTitle] = useState("Example Website")
  //   const [previewDomain, setPreviewDomain] = useState("example.com")
  const isLoading: boolean = false;
  const fetched: boolean = false;
  const previewTitle: string = "Example Website";
  const previewDomain: string = "example.com";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic here
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
                max-h-[90vh]
                overflow-y-auto
                rounded-t-2xl
                shadow-lg
                p-6
                md:max-w-xl
                md:max-h-none
                md:overflow-visible
                md:rounded-2xl
            "
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-lg font-bold text-foreground"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Save to Recall
            </h2>

            <button
              type="button"
              aria-label="Close"
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
            >
              <IoClose className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <Input
              id="url"
              type="text"
              label="URL"
              icon={MdLink}
              name="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <AnimatePresence initial={false}>
              {(isLoading || fetched) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4 p-3 rounded-xl bg-muted border border-border/60 flex items-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <LuLoaderCircle
                        size={16}
                        className="text-primary animate-spin flex-shrink-0"
                      />

                      <span className="text-sm text-muted-foreground">
                        Fetching page info…
                      </span>
                    </>
                  ) : (
                    <>
                      <LuCheck
                        size={16}
                        className="text-secondary flex-shrink-0"
                      />

                      <div className="min-w-0">
                        <p
                          className="text-sm font-semibold text-foreground truncate"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          {previewTitle}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {previewDomain}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <Input
              id="notes"
              type="text"
              textarea
              rows={4}
              label="Notes (optional)"
              icon={LuFileText}
              name="notes"
              placeholder="Why are you using this? What do you want to remember?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div>
              <div>
                <label
                  //   htmlFor={props.id}
                  className="block text-xs font-semibold text-muted-foreground mb-1.5 cursor-pointer"
                >
                  Tags
                </label>
                <div className="flex items-center gap-2 flex-wrap border-2 border-border px-4 py-3 rounded-lg">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-primary/10 text-[10px] text-primary px-2 py-1 font-medium rounded-full"
                      >
                        {tag}
                        <IoClose
                          onClick={() => handleTagRemove(tag)}
                          size={12}
                          className="ml-1 inline-block cursor-pointer"/>
                      </span>
                    ))}
                    <input type="text"
                    className="flex-1 bg-transparent text-sm text-foreground  placeholder:text-muted-foreground outline-none"
                    placeholder={tags.length === 0 ? "Add tags..." : undefined} onChange={(e) => updateTagInput(e)}
                    onKeyDown={(e) => handleTagKeyDown(e)} />
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2 flex-wrap">
                {buttontags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => commitTag(tag)}
                    className="flex items-center gap-1 bg-muted-foreground/10 text-[10px] text-muted-foreground px-2 py-1 font-medium rounded-full"
                  >
                    <MdAdd />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
                className="w-full"
              >
                Cancel
              </Button>

              <Button type="submit" variant="primary" className="w-full">
                Save Bookmark
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
