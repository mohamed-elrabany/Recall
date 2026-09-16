import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUserLayout, userActions } from "../store/slices/userSlice";
import type { RootState } from "../store/store";
import type { LayoutMode } from "../types/settings";

export function useLayout() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  const layout = user?.card_layout ?? "grid";

  function changeLayout(newLayout: LayoutMode) {
    if (!user) return;

    dispatch(userActions.setLayout(newLayout));
    dispatch(
      updateUserLayout({
        userId: user.id,
        layout: newLayout,
      })
    );
  }

  return {
    layout,
    changeLayout,
  };
}
