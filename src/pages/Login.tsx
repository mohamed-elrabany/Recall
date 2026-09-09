import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { Link } from "react-router";
import { useState } from "react";

export function Component() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <main className="min-h-screen">
      <section className="min-h-screen bg-primary-lighter flex items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col gap-8 bg-card p-6 rounded-2xl shadow-lg">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>

            <p className="text-sm text-muted-foreground">
              Sign in to access your saved links.
            </p>
          </div>

          <form className="space-y-4">
            <Input
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="w-full flex flex-col items-stretch gap-1">
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="self-end w-fit text-sm text-primary font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button className="w-full" variant="primary">
              Sign In
            </Button>
          </form>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            <span>or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-semibold transition-colors duration-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
