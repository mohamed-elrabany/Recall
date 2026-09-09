import { NavLink, useNavigate, useLocation } from "react-router";
import { navItems } from "../../utils/navItems";

import { MdAdd } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

import Logo from "../ui/Logo";
import Button from "../ui/Button";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

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
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="text-primary font-bold">ML</span>
          </div>
          <div className="min-w-0">
            <p
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="text-xs text-foreground font-semibold"
            >
              Mohamed Loay
            </p>
            <span className="text-[10px] text-muted-foreground">
              lolo@example.com
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
