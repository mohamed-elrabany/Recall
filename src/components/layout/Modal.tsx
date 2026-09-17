import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Button from "../ui/Button";

import { IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

export default function Modal({
  children,
  isOpen,
  onClose,
  onSubmit,
  saveText = "Save",
  cancelText = "Cancel",
  title,
  onSubmitting = false,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  saveText?: string;
  cancelText?: string;
  title?: string;
  onSubmitting?: boolean;
}) {
  const isMobile: boolean = useMediaQuery("(max-width: 768px)");

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="
            fixed inset-0 z-100
            flex items-end justify-center
            md:items-center
            bg-background/50
            backdrop-blur-sm
            p-0 md:p-4
          "
          onClick={onClose}
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
              flex
              w-full
              max-h-[90vh]
              flex-col
              overflow-hidden
              rounded-t-2xl
              bg-card
              shadow-lg
              md:max-w-xl
              md:rounded-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>

              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                disabled={onSubmitting}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg
                  bg-muted
                  text-muted-foreground
                  transition-colors
                  hover:bg-border
                  hover:text-foreground
                "
              >
                <IoClose className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>

            {/* Footer */}
            <div className="grid shrink-0 grid-cols-2 gap-4 border-t border-border px-6 py-4">
              <Button
                type="button"
                variant="secondary"
                className={`w-full ${onSubmitting ? "cursor-not-allowed opacity-50 hover:brightness-100" : "cursor-pointer"}`}
                onClick={onClose}
              >
                {cancelText}
              </Button>

              <Button
                type="submit"
                variant="primary"
                className={`w-full ${onSubmitting ? "cursor-not-allowed opacity-50 hover:brightness-100" : "cursor-pointer"}`}
                onClick={onSubmit}
                disabled={onSubmitting}
              >
                <AnimatePresence>
                  {!onSubmitting ? (
                    <p>{saveText}</p>
                  ) : (
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
