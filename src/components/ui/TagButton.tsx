export default function TagButton({label, count, isActive, onClick}: {label: string, count: number, isActive: boolean, onClick: () => void}) {
    return(
        <div 
        onClick={onClick}
        className={`
        w-fit px-3 py-2
        flex items-center gap-2 
        border border-border hover:border-primary hover:ring-3 hover:ring-primary/40
        font-semibold text-muted-foreground hover:text-primary 
        rounded-full cursor-pointer shadow-md hover:shadow-lg 
        transition-all ease-in-out duration-200${isActive ? " border-primary ring-3 ring-primary/40 text-primary" : ""}`}>
            <p className="text-sm">#{label}</p>
            <span className="text-xs p-1 rounded-full bg-muted">{count}</span>
        </div>
    );
}   