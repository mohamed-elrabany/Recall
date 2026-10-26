
import Modal from "../layout/Modal";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Logout({
  isOpen,
  onClose,
  onLogout,
  onLoggingOut = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onLoggingOut?: boolean;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onLogout}
      title="Logout"
      saveText="Logout"
      cancelText="Cancel"
      onSubmitting={onLoggingOut}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <RiLogoutBoxLine className="h-6 w-6" />
        </div>

        <h3 className="mb-2 text-base font-semibold text-foreground">
          Log out of your account?
        </h3>

        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Are you sure you want to log out? You'll need to sign in again to
          access your bookmarks.
        </p>
      </div>
    </Modal>
  );
}
