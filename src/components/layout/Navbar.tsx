import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import { Link } from "react-router";
import { useState } from "react";

import Button from "../ui/Button";
import LinkButton from "../ui/LinkButton";
import Logo from "../ui/Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/70 border-b border-border/60 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 p-2">
        <Logo />

        <nav>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <li>
              <a
                href="#how"
                className="hover:text-foreground transition-colors"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="hover:text-foreground transition-colors"
              >
                Features
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center justify-center gap-2">
          <LinkButton variant="secondary" to="/login">
            Log in
          </LinkButton>
          <LinkButton variant="primary" to="/register">
            Sign up Free
          </LinkButton>
        </div>

        <div className="md:hidden">
          <Button
            className="border border-muted bg-transparent text-foreground hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <IoClose className="w-4 h-4" />
            ) : (
              <RxHamburgerMenu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden space-y-4 p-4 flex flex-col items-center justify-start bg-card border-border border-t">
          <ul className="w-full flex flex-col items-center gap-4 text-sm font-medium text-muted-foreground mt-2">
            <li className="w-full">
              <a
                href="#how"
                className="hover:text-foreground transition-colors text-start w-full"
              >
                How it works
              </a>
            </li>
            <li className="w-full">
              <a
                href="#features"
                className="hover:text-foreground transition-colors text-start w-full"
              >
                Features
              </a>
            </li>
          </ul>
          <div className="w-full grid grid-cols-2 items-center justify-center gap-2">
            <Button variant="secondary">
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="primary">
              <Link to="/register">Sign up free</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
