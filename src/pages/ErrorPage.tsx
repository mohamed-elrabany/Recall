import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { LuInfo } from "react-icons/lu";
import Logo from "../components/ui/Logo";

export default function ErrorPage() {
  const error = useRouteError();

  // No error object means we got here via the catch-all "*" route
  const isNotFound =
    !error || (isRouteErrorResponse(error) && error.status === 404);

  const title = isNotFound ? "Page not found" : "Something went wrong";
  const description = isNotFound
    ? "The page you're looking for doesn't exist or has been moved."
    : "An unexpected error occurred. Try reloading the page, or head back home.";

  const details =
    import.meta.env.DEV && error instanceof Error ? error.message : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <Logo />

      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card px-6 py-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          {isNotFound ? (
            <span
              className="text-2xl font-extrabold text-primary"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              404
            </span>
          ) : (
            <LuInfo size={28} className="text-primary" />
          )}
        </div>

        <h1 className="text-xl font-bold text-foreground">{title}</h1>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {details && (
          <pre className="mt-4 w-full overflow-x-auto rounded-lg bg-muted p-3 text-left text-xs text-muted-foreground">
            {details}
          </pre>
        )}

        <div className="mt-8 flex gap-3">
          {!isNotFound && (
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Try again
            </button>
          )}

          <Link
            to="/"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}