import Section from "../ui/Section";
import Row from "../ui/Row";

import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";
import { MdGridOn, MdList } from "react-icons/md";

import type { LayoutMode, ThemeMode } from "../../types/settings";

interface AppearanceProps {
  layout: LayoutMode;
  theme: ThemeMode;
  changeLayout: (layout: LayoutMode) => void;
  toggleTheme: (theme: ThemeMode) => void;
}

export default function Appearance({ layout, theme, changeLayout, toggleTheme }: AppearanceProps) {
  return (
    <Section title="Appearance">
      <Row label="Theme" description="Choose your preferred theme">
        <div className="hidden sm:flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
          {(["light", "system", "dark"] as ThemeMode[]).map((t) => (
            <button
              key={t}
              onClick={() => toggleTheme(t)}
              className={`flex items-center gap-1 p-1.5 rounded-md transition-colors cursor-pointer ${t === theme ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t === "light" ? (
                <LuSun className="w-4 h-4" />
              ) : t === "dark" ? (
                <LuMoon className="w-4 h-4" />
              ) : (
                <LuMonitor className="w-4 h-4" />
              )}
              <p className="text-xs first-letter:uppercase font-semibold">
                {t}
              </p>
            </button>
          ))}
        </div>
      </Row>
      <Row label="Card layout" description="Default view for your saves">
        <div className="hidden sm:flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
          {(["grid", "list"] as LayoutMode[]).map((l) => (
            <button
              key={l}
              onClick={() => changeLayout(l)}
              className={`flex items-center gap-1 p-1.5 rounded-md transition-colors cursor-pointer ${layout === l ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"}`}
            >
              {l === "grid" ? (
                <MdGridOn className="w-4 h-4" />
              ) : (
                <MdList className="w-4 h-4" />
              )}
              <p className="text-xs first-letter:uppercase font-semibold">
                {l}
              </p>
            </button>
          ))}
        </div>
      </Row>
    </Section>
  );
}
