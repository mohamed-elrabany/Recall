import { NavLink } from "react-router";
import { navItems, type NavItem } from "../../utils/navItems";

import { MdAdd } from "react-icons/md";

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-card border-t border-border">
      <ul className="relative grid grid-cols-5 gap-2 items-center justify-around w-full bg-card p-2 border-t border-border">
        {navItems.slice(0, 2).map((item) => renderNavItem(item))}
        <li className="w-full h-full flex justify-center">
          <button
            type="button"
            aria-label="Add new link"
            className="
      flex items-center justify-center
     w-full
      rounded-lg
      bg-primary text-white
      shadow-lg
      cursor-pointer
      hover:brightness-90
      transition-colors duration-150
    "
          >
            <MdAdd className="w-7 h-7" />
          </button>
        </li>
        {navItems.slice(2).map((item) => renderNavItem(item))}
      </ul>
    </nav>
  );
}

const renderNavItem = (item: NavItem) => {
  const Icon = item.icon;
  return (
    <li key={item.name}>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex flex-col items-center gap-2 px-2 py-3 rounded-lg font-medium transition-all duration-150
                        ${
                          isActive
                            ? "bg-primary/10 text-primary font-bold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`
        }
      >
        <Icon className="w-5 h-5" />
        <span className="text-xs">{item.name}</span>
      </NavLink>
    </li>
  );
};
