export default function Row({label, description, danger, children}: {label: string, description?: string, danger?: boolean, children: React.ReactNode}) {
    return(
        <div className={`flex items-center justify-between px-5 py-4 border-b border-border last:border-0 ${danger ? "bg-red-500/5" : ""}`}>
            <div>
                <p className={`text-sm font-semibold ${danger ? "text-red-500" : "text-foreground"}`} style={{ fontFamily: "Manrope, sans-serif" }}>
                    {label}
                </p>
                {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
            </div>
            
            {children}
        </div>
    );
}