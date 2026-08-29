import { FaBookmark } from "react-icons/fa6";

export default function Footer() {
    return(
        <footer className="bg-background border-t border-border/60 p-4">
            <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center bg-primary rounded-lg p-2 ">
                    <FaBookmark className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">© 2026 Recall. All rights reserved.</p>
            </div>
        </footer>
    );
}