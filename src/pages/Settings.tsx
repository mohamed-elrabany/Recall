import Appearance from "../components/settings/Apperance";
import Account from "../components/settings/Account";
import Data from "../components/settings/Data";
import DangerZone from "../components/settings/DangerZone";
import AdjustAvatar from "../components/modals/AdjustAvatar";

import { useTheme } from "../hooks/useTheme";
import { useLayout } from "../hooks/useLayout";
import { useAppSelector } from "../store/hooks";
import { useState } from "react";


export function Component() {
  const { theme, changeTheme } = useTheme();
  const { layout, changeLayout } = useLayout();

  const user = useAppSelector((state) => state.user.user);
  const [openAdjustAvatar, setOpenAdjustAvatar] = useState<boolean | null>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <Account user={user} setOpenModal={setOpenAdjustAvatar} setAvatarUrl={setSelectedImage} />

      <Appearance
        layout={layout}
        theme={theme}
        changeLayout={changeLayout}
        toggleTheme={changeTheme}
      />

      <Data />
      <DangerZone />

      <AdjustAvatar
        userId={user?.id || ""}
        isOpen={!!openAdjustAvatar}
        onClose={() => setOpenAdjustAvatar(false)}
        avatarUrl={selectedImage || ""}
      />

    </div>
  );
}
