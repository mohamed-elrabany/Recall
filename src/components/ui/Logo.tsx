import { GoBookmarkFill } from "react-icons/go";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center bg-primary rounded-lg p-2">
        <GoBookmarkFill className="w-4 h-4 text-white" />
      </div>

      <span className="text-foreground font-bold text-xl">Recall</span>
    </div>
  );
}
