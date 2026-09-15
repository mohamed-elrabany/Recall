import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import {
  Form,
  Link,
  useNavigation,
  useActionData,
  redirect,
} from "react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { login } from "../services/authServices";

import { CgSpinner } from "react-icons/cg";

export function Component() {
  const navigation = useNavigation();
  const actionData = useActionData() as {
    error?: string;
    needsConfirmation?: boolean;
    email?: string;
  } | null;
  const isSubmitting = navigation.state === "submitting";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touchedInputs, setTouchedInputs] = useState({
    email: false,
    password: false,
  });

  const emailRegex: RegExp = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  );
  const isFormValid: boolean = emailRegex.test(email) && password.length >= 8;

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

          <Form method="post" className="space-y-4">
            <Input
              id="email"
              name="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onBlur={() => setTouchedInputs({ ...touchedInputs, email: true })}
              errorMessage={
                touchedInputs.email && !emailRegex.test(email)
                  ? "Please enter a valid email address"
                  : ""
              }
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="w-full flex flex-col items-stretch gap-1">
              <Input
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() =>
                  setTouchedInputs({ ...touchedInputs, password: true })
                }
                errorMessage={
                  touchedInputs.password && password.length < 8
                    ? "Password must be at least 8 characters"
                    : ""
                }
              />

              <button
                type="button"
                className="self-end w-fit text-sm text-primary font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              disabled={!isFormValid}
              variant="primary"
              type="submit"
              className={`w-full ${!isFormValid ? "opacity-50 cursor-not-allowed hover:brightness-100" : "cursor-pointer"}`}
            >
              <AnimatePresence>
                {isSubmitting ? <p>Signing in</p> : <p>Sign in</p>}
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CgSpinner className="animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            {actionData?.error && !actionData?.needsConfirmation && (
              <p className="text-sm text-destructive text-center text-primary">
                {actionData.error}
              </p>
            )}

            {actionData?.needsConfirmation && (
              <p className="text-sm text-muted-foreground text-center">
                Email not confirmed{" "}
                <Link
                  to={`/verify-email?email=${actionData?.email}`}
                  className="text-primary hover:underline font-semibold transition-colors duration-300"
                >
                  Verify email
                </Link>
              </p>
            )}
          </Form>

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

export async function action({ request }: { request: Request }) {
  console.log("Login action called");
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await login({ email, password });
    return redirect("/dashboard");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    if (message.toLowerCase().includes("email not confirmed")) {
      return {
        error: "Please verify your email before logging in.",
        needsConfirmation: true,
        email,
      };
    }
    return { error: message };
  }
}
