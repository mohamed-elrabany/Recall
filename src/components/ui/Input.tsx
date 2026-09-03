import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { MdError } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  errorMessage,
  ...props
}: InputProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-xs font-semibold text-muted-foreground mb-1.5 cursor-pointer"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={props.id}
          type={inputType}
          placeholder={placeholder}
          {...props}
          className="
            w-full px-3 py-4 pr-10
            rounded-lg
            bg-card text-foreground text-sm
            border-2 border-border
            placeholder:text-muted-foreground placeholder:text-sm
            focus:border-primary
            focus:ring-3 focus:ring-primary/20
            outline-none
            transition-[border-color,box-shadow] duration-300 ease-in-out
          "
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-muted-foreground
              hover:text-foreground
              transition-colors
            "
          >
            {showPassword ? (
              <FaRegEyeSlash className="w-4 h-4" />
            ) : (
              <FaRegEye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-start gap-1 text-primary mt-1"
          >
            <MdError className="text-sm sm:text-base" />

            <p className="text-xs sm:text-sm font-medium">
              {errorMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}