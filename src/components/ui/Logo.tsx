import { FaBookmark } from "react-icons/fa6";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center bg-primary rounded-lg p-2">
        <FaBookmark className="w-4 h-4 text-white" />
      </div>

      <span className="text-foreground font-bold text-xl">Recall</span>
    </div>
  );
}
