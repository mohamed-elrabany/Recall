export function getInitials(fullName: string | undefined): string {
  if (!fullName) return "N/A";
  const names = fullName.split(" ");
  const initials = names
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
  return initials || "N/A";
}
