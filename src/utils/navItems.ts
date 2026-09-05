import type { IconType } from "react-icons";
import { FiHome, FiSettings, FiTag } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";


export type NavItem = {
  name: string;
  path: string;
  icon: IconType;
};

export const navItems: NavItem[] = [
  {
    name: "Home",
    path: "/dashboard",
    icon: FiHome,
  },
  { name: "Tags", path: "/tags", icon: FiTag },
  {
    name: "Favorites",
    path: "/favorites",
    icon: MdFavoriteBorder,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];