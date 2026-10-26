import Logo from "../components/ui/Logo";

export default function LoadingPage() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background"
    >
      <div className="animate-pulse">
        <Logo />
      </div>

      <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/2 animate-[slide_1.2s_ease-in-out_infinite] rounded-full bg-primary" />
      </div>

      <span className="sr-only">Loading Recall…</span>
    </div>
  );
}