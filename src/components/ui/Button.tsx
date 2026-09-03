type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const variants = {
    primary:
      "bg-primary text-white hover:brightness-90",

    secondary:
      "border text-foreground border-muted bg-transparent text-foreground hover:bg-muted",
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        rounded-lg px-4 py-2 gap-2
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