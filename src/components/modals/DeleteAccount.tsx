
import Modal from "../layout/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteAccount({
  isOpen,
  onClose,
  onDelete,
  onDeleting = false,
}: {
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
      title="Delete Account"
      saveText="Delete Account"
      cancelText="Cancel"
      onSubmitting={onDeleting}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <RiDeleteBin6Line className="h-6 w-6" />
        </div>

        <h3 className="mb-2 text-base font-semibold text-foreground">
          Permanently delete your account?
        </h3>

        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          This will permanently delete your account and remove your access to
          your saved bookmarks and personal data. This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}
