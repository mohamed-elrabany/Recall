import TagButton from "../components/ui/TagButton";
import { useLayout } from "../hooks/useLayout";

const tags = [
  { label: "React", count: 10 },
  { label: "JavaScript", count: 8 },
  { label: "TypeScript", count: 5 },
  { label: "CSS", count: 3 },
  { label: "HTML", count: 2 },
  { label: "machine learning", count: 2 },
];

export function Component() {
  const { layout } = useLayout();
  return (
    <div className="px-4 sm:px-6 pt-6 min-h-screen space-y-8">
      <div className="flex flex-col items-start justify-y-start gap-4">
        <h2 className="text-2xl font-bold text-foreground">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <TagButton
              key={index}
              label={tag.label}
              count={tag.count}
              onClick={() => {}}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">Click a tag to see all items in that category.</p>
      </div>
      <div className={`mt-6 grid gap-4 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        # Bookmarks here...
      </div>
    </div>
  );
}
