
import { useState } from "react";

import Appearance from "../components/settings/Apperance";
import Account from "../components/settings/Account";
import DangerZone from "../components/settings/DangerZone";

import AdjustAvatar from "../components/modals/AdjustAvatar";
import Logout from "../components/modals/Logout";
import DeleteAccount from "../components/modals/DeleteAccount";

import { useTheme } from "../hooks/useTheme";
import { useLayout } from "../hooks/useLayout";
import { useAuth } from "../hooks/useAuth";
import { useAppSelector } from "../store/hooks";

export function Component() {
  const { theme, changeTheme } = useTheme();
  const { layout, changeLayout } = useLayout();

  const {
    handleLogout,
    handleDeleteAccount,
    isSubmitting,
  } = useAuth();

  const user = useAppSelector((state) => state.user.user);

  const [openAdjustAvatar, setOpenAdjustAvatar] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] =
    useState(false);

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <Account
        user={user}
        setOpenModal={setOpenAdjustAvatar}
        setAvatarUrl={setSelectedImage}
      />

      <Appearance
        layout={layout}
        theme={theme}
        changeLayout={changeLayout}
        toggleTheme={changeTheme}
      />

      <DangerZone
        onLogout={() => setOpenLogoutModal(true)}
        onDeleteAccount={() => setOpenDeleteAccountModal(true)}
      />

      <AdjustAvatar
        userId={user?.id || ""}
        isOpen={openAdjustAvatar}
        onClose={() => setOpenAdjustAvatar(false)}
        avatarUrl={selectedImage || ""}
      />

      <Logout
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onLogout={handleLogout}
        onLoggingOut={isSubmitting}
      />

      <DeleteAccount
        isOpen={openDeleteAccountModal}
        onClose={() => setOpenDeleteAccountModal(false)}
        onDelete={handleDeleteAccount}
        onDeleting={isSubmitting}
      />
    </div>
  );
}
