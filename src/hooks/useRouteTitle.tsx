import { useEffect } from "react";
import { useMatches } from "react-router";

const DEFAULT_TITLE = "Recall — Save Links, Find Them by Meaning";

export function useRouteTitle() {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const title = (current?.handle as { documentTitle?: string } | undefined)
    ?.documentTitle;

  useEffect(() => {
    document.title = title ?? DEFAULT_TITLE;
  }, [title]);
}