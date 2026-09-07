import { useState, useEffect } from "react";

import Appearance from "../components/settings/Apperance";
import Account from "../components/settings/Account";
import Data from "../components/settings/Data";
import DangerZone from "../components/settings/DangerZone";

import type { LayoutMode, ThemeMode } from "../types/settings";

export default function Settings() {
    const [user, setUser] = useState<any | null>(null);
    const [layout, setLayout] = useState<LayoutMode>("grid");
    const [theme, setTheme] = useState<ThemeMode>("system");

    useEffect(()=>{
        // Fetch user data from an API or local storage
        setUser({
            name: "Mohamed Loay",
            email: "mohamed.loay@example.com"
        });
    },[]);

    return(
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
            <Account user={user} />
            <Appearance layout={layout} theme={theme} changeLayout={setLayout} toggleTheme={setTheme} />
            <Data />
            <DangerZone />
        </div>
    );
}