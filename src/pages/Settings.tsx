import Appearance from "../components/settings/Apperance";
import Account from "../components/settings/Account";
import Data from "../components/settings/Data";
import DangerZone from "../components/settings/DangerZone";

import { useTheme } from "../hooks/useTheme";
import { useLayout } from "../hooks/useLayout";
import { useAppSelector } from "../store/hooks";

export function Component() {
  const { theme, changeTheme } = useTheme();
  const { layout, changeLayout } = useLayout();

  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <Account user={user} />

      <Appearance
        layout={layout}
        theme={theme}
        changeLayout={changeLayout}
        toggleTheme={changeTheme}
      />

      <Data />
      <DangerZone />
    </div>
  );
}