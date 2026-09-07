export default function Section({title, children}: {title: string, children: React.ReactNode}) {
    return(
        <div className="mb-8">
            <h2 className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-4">{title}</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
                {children}
            </div>
        </div>
    );
}