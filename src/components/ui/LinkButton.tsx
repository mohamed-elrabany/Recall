import { Link } from "react-router";

type LinkButtonProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function LinkButton({
  to,
  children,
  className = "",
  variant = "primary",
}: LinkButtonProps) {
  const variants = {
    primary: "bg-primary text-white hover:brightness-90",
    secondary:
      "border border-muted bg-transparent text-foreground hover:bg-muted",
  };

  return (
    <Link
      to={to}
      className={`
        flex items-center justify-center gap-2
        rounded-lg px-4 py-2
        text-sm font-semibold
        transition-all duration-150
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}