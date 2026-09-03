import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { Link } from "react-router";
import { useState } from "react";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <main className="min-h-screen">
      <section className="min-h-screen bg-primary-lighter flex items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col gap-8 bg-card p-6 rounded-2xl shadow-lg">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Create your account</h2>

            <p className="text-sm text-muted-foreground">
              Start building your personal knowledge base.
            </p>
          </div>

          <form className="space-y-4">
            <Input
              id="fullname"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />


            <Button className="w-full" variant="primary">
              Create account
            </Button>
          </form>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            <span>or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-semibold transition-colors duration-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
