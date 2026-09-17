import { NavLink, useNavigate, useLocation } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { navItems } from "../../utils/navItems";
import { getInitials } from "../../utils/nameInitials";

import { MdAdd } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

import Logo from "../ui/Logo";
import Button from "../ui/Button";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.user.user);
  const initials = getInitials(user?.full_name);

  return (
    <aside className="hidden md:flex sticky top-0 h-screen overflow-y-auto w-64 bg-card p-4 flex-col justify-between items-start gap-6 border-r border-border">
      <div className="w-full space-y-4">
        <Logo />
        <Button
          aria-label="Add new link"
          className="w-full flex items-center justify-center gap-2"
          variant="primary"
          onClick={() => navigate("bookmarks/add", { state: { backgroundLocation: location } })}
        >
          <MdAdd className="w-5 h-5" />
          Save new
        </Button>
        <nav>
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
                const Icon= item.icon;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2 py-3 rounded-lg font-medium transition-all duration-150
                        ${
                        isActive
                            ? "bg-primary/10 text-primary font-bold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`
                    }
                  >
                    <Icon className="w-5 h-5"/>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="w-full flex flex-col items-stretch gap-2 border-t border-border pt-2">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-extrabold text-primary"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {initials}
            </div>
          )}
          </div>
          <div className="min-w-0">
            <p
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="text-xs text-foreground font-semibold"
            >
              {user?.full_name || "Mohamed Loay"}
            </p>
            <span className="text-[10px] text-muted-foreground">
              {user?.email || "lolo@example.com"}
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2 hover:text-red-500"
        >
          <PiSignOutBold className="w-5 h-5" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
