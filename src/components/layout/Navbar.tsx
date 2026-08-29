import { FaBookmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import { Link } from "react-router";
import { useState } from "react";

import Button from "../ui/Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 border-b border-border/60 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 p-2">
        <div className="flex items-center justify-center bg-primary-lighter p-2 gap-2 w-auto">
          <div className="flex items-center justify-center bg-primary rounded-lg p-2 ">
            <FaBookmark className="w-4 h-4 text-white" />
          </div>
          <p className="text-lighter-primary font-bold text-xl">Recall</p>
        </div>

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
          <Button className="border border-muted bg-transparent text-foreground hover:bg-muted">
            <Link to="/login">Log in</Link>
          </Button>
          <Button className="bg-primary text-white hover:brightness-90">
            <Link to="/register">Sign up Free</Link>
          </Button>
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
            <Button className="border border-muted bg-transparent text-foreground hover:bg-muted">
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="bg-primary text-white hover:brightness-90">
              <Link to="/register">Sign up Free</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
