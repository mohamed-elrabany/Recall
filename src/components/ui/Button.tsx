import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white hover:brightness-90",

    secondary:
      "border border-muted bg-transparent text-foreground hover:bg-muted",
  };

  return (
    <button
      {...props}
      className={`
        flex items-center justify-center
        gap-2
        rounded-lg
        px-4 py-2
        text-sm font-semibold
        cursor-pointer
        transition-all duration-150
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}