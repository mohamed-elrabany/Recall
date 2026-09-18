export type BookMark={
    id?:string;
    url:string;
    title?:string;
    snippet?: string;
    notes?:string;
    icon?: string;
    embedding?: number[];
    is_favorite?:boolean;
    tags?:string[];
    status:"processing" | "done" | "manual" | "failed";
    created_at?: string;
    updated_at?: string;
    user_id: string;
}

export const bookmarks: BookMark[] = [
  {
    id: "1",
    title: "React Documentation",
    snippet: "Official React docs for hooks, components, and best practices.",
    url: "https://react.dev",
    tags: ["react", "docs", "frontend"],
    created_at: "2026-01-15T00:00:00.000Z",
    updated_at: "2026-01-15T00:00:00.000Z",
    notes: "Check the new compiler section again.",
    is_favorite: true,
    user_id: "user1",
    icon: "https://react.dev/favicon.ico",
    status: "done"
  },
  {
    id: "2",
    title: "TypeScript Handbook",
    snippet: "Comprehensive guide to TypeScript's type system.",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    tags: ["typescript", "docs"],
    created_at: "2026-02-03T00:00:00.000Z",
    updated_at: "2026-02-10T00:00:00.000Z",
    notes: "",
    is_favorite: false,
    icon: "https://www.typescriptlang.org/favicon-32x32.png",
    user_id: "user2",
    status: "processing"
  },
  {
    id: "3",
    title: "React Router",
    snippet: "Declarative routing for React applications.",
    url: "https://reactrouter.com",
    tags: ["react", "routing"],
    created_at: "2026-03-21T00:00:00.000Z",
    updated_at: "2026-03-25T00:00:00.000Z",
    notes: "Review nested routes and loaders.",
    is_favorite: true,
    icon: "https://reactrouter.com/favicon-light.png",
    user_id: "user3",
    status: "manual"
  },
  {
    id: "4",
    title: "Tailwind CSS Docs",
    snippet: "Utility-first CSS framework documentation.",
    url: "https://tailwindcss.com/docs",
    tags: ["css", "tailwind", "frontend"],
    created_at: "2026-04-11T00:00:00.000Z",
    updated_at: "2026-04-11T00:00:00.000Z",
    notes: "Look into container queries support.",
    is_favorite: false,
    icon: "https://tailwindcss.com/favicons/favicon-32x32.png",
    user_id: "user4",
    status: "failed"
  },
  {
    id: "5",
    title: "MDN Web Docs",
    snippet: "Reference for HTML, CSS, and JavaScript.",
    url: "https://developer.mozilla.org",
    tags: ["reference", "javascript", "css", "html"],
    created_at: "2026-05-02T00:00:00.000Z",
    updated_at: "2026-05-02T00:00:00.000Z",
    notes: "",
    is_favorite: false,
    icon: "https://developer.mozilla.org/favicon-48x48.png",
    user_id: "user5",
    status: "done"
  },
];