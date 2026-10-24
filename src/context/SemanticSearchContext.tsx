
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import { useLocation } from "react-router";

import { useSemanticSearch } from "../hooks/useSemanticSearch";
import type { BookMark } from "../types/bookmark";
import type {
  SearchScope,
} from "../types/semanticSearch";

interface SemanticSearchContextValue {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  scope: SearchScope;
  tagId: string | null;
  results: BookMark[];
  loading: boolean;
  error: string | null;
}

const SemanticSearchContext =
  createContext<SemanticSearchContextValue | null>(null);

export function SemanticSearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();
  const [query, setQuery] = useState("");


  useEffect(() => {
    setQuery("");
  }, [location.pathname]);


  const params = new URLSearchParams(location.search);
  const selectedTagId = params.get("tagId");


  let scope: SearchScope = "all";
  let tagId: string | null = null;

  if (location.pathname.startsWith("/favorites")) {
    scope = "favorites";
  } else if (
    location.pathname.startsWith("/tags") &&
    selectedTagId
  ) {
    scope = "tag";
    tagId = selectedTagId;
  }

  const {
    results,
    loading,
    error,
  } = useSemanticSearch({
    query,
    scope,
    tagId,
  });

  return (
    <SemanticSearchContext.Provider
      value={{
        query,
        setQuery,
        scope,
        tagId,
        results,
        loading,
        error,
      }}
    >
      {children}
    </SemanticSearchContext.Provider>
  );
}

export function useSemanticSearchContext() {
  const context = useContext(SemanticSearchContext);

  if (!context) {
    throw new Error(
      "useSemanticSearchContext must be used within SemanticSearchProvider"
    );
  }

  return context;
}
