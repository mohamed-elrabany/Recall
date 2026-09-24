import Modal from "../layout/Modal";
import type { BookMark } from "../../types/bookmark";

import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteBookmark({
  bookmark,
  isOpen,
  onClose,
  onDelete,
  onDeleting = false,
}: {
  bookmark: BookMark;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onDeleting?: boolean;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onDelete}
      title="Delete Bookmark"
      saveText="Delete"
      cancelText="Cancel"
      onSubmitting={onDeleting}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <RiDeleteBin6Line className="h-6 w-6" />
        </div>

        <h3 className="mb-2 text-base font-semibold text-foreground">
          Delete this bookmark?
        </h3>

        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">
            "{bookmark.title || bookmark.url || "Untitled Bookmark"}"
          </span>
          ? This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}