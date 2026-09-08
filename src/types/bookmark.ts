export type BookMark={
    id?:string;
    title?:string;
    description?:string;
    url?:string;
    tags?:string[];
    createdAt?:Date;
    updatedAt?:Date;
    notes?:string;
    isFavorite?:boolean;
    snippet?: string;
}

export const bookmarks: BookMark[] = [
  {
    id: "1",
    title: "React Documentation",
    description: "Official React docs for hooks, components, and best practices.",
    url: "https://react.dev",
    tags: ["react", "docs", "frontend"],
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
    notes: "Check the new compiler section again.",
    isFavorite: true,
    snippet: "https://react.dev/favicon.ico",
  },
  {
    id: "2",
    title: "TypeScript Handbook",
    description: "Comprehensive guide to TypeScript's type system.",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    tags: ["typescript", "docs"],
    createdAt: new Date("2026-02-03"),
    updatedAt: new Date("2026-02-10"),
    notes: "",
    isFavorite: false,
    snippet: "https://www.typescriptlang.org/favicon-32x32.png",
  },
  {
    id: "3",
    title: "React Router",
    description: "Declarative routing for React applications.",
    url: "https://reactrouter.com",
    tags: ["react", "routing"],
    createdAt: new Date("2026-03-21"),
    updatedAt: new Date("2026-03-25"),
    notes: "Review nested routes and loaders.",
    isFavorite: true,
    snippet: "https://reactrouter.com/favicon-light.png",
  },
  {
    id: "4",
    title: "Tailwind CSS Docs",
    description: "Utility-first CSS framework documentation.",
    url: "https://tailwindcss.com/docs",
    tags: ["css", "tailwind", "frontend"],
    createdAt: new Date("2026-04-11"),
    updatedAt: new Date("2026-04-11"),
    notes: "Look into container queries support.",
    isFavorite: false,
    snippet: "https://tailwindcss.com/favicons/favicon-32x32.png",
  },
  {
    id: "5",
    title: "MDN Web Docs",
    description: "Reference for HTML, CSS, and JavaScript.",
    url: "https://developer.mozilla.org",
    tags: ["reference", "javascript", "css", "html"],
    createdAt: new Date("2026-05-02"),
    updatedAt: new Date("2026-05-02"),
    notes: "",
    isFavorite: false,
    snippet: "https://developer.mozilla.org/favicon-48x48.png",
  },
];