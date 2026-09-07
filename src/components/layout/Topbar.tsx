import { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { FaBookmark } from "react-icons/fa6";
import { IoSearch, IoSparkles } from "react-icons/io5";
import { MdGridOn, MdList } from "react-icons/md";

import type { LayoutMode } from "../../types/settings";

export default function Topbar() {
    const location = useLocation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [layout, setLayout] = useState<LayoutMode>("grid");

    useEffect(()=>{
        setSearchQuery("");
        setInputFocused(false);
    }, [location.pathname]);

  return (
    <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 flex items-center gap-3">
      {/* App Icon  */}
      <div className="lg:hidden flex items-center justify-center bg-primary rounded-lg p-2">
        <FaBookmark className="w-4 h-4 text-white" />
      </div>

      {/* Search Bar  */}
      <div className="flex-1">
        <div
          className={`flex justify-between items-center w-full px-4 py-2 
            border-2 border-border bg-card
            ${inputFocused ? "border-primary ring-3 ring-primary/10" : ""} 
            rounded-full gap-3
            transition-colors
            `}
        >
          {/* Search content */}
          <div className="flex flex-1 min-w-0 items-center gap-2 text-sm text-foreground">
            <IoSearch className="w-4 h-4 text-muted-foreground shrink-0" />

            <input
              type="text"
              value={searchQuery}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, not just keywords..."
              className="flex-1 min-w-0 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-primary font-semibold">
            <IoSparkles className="w-4 h-4 text-primary shrink-0" />
            <span className="shrink-0 text-[10px]">Semantic</span>
          </div>

          {/* Results */}
          {/* <p className="shrink-0 whitespace-nowrap text-[10px] text-primary bg-primary/10 px-3 py-1.5 font-semibold rounded-full">
            3 results
          </p> */}
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
              {(["grid", "list"] as LayoutMode[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLayout(l)}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${layout === l ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l === "grid" ? <MdGridOn className="w-4 h-4" /> : <MdList className="w-4 h-4" />}
                </button>
              ))}
            </div>
    </div>
  );
}
