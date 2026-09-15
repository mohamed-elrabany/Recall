import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import {
  Link,
  Form,
  useNavigation,
  useActionData,
  redirect,
} from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { register } from "../services/authServices";
import { useState } from "react";

import { CgSpinner } from "react-icons/cg";

export function Component() {
  const navigation = useNavigation();
  const actionData = useActionData() as { error?: string } | null;
  const isSubmitting = navigation.state === "submitting";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touchedInputs, setTouchedInputs] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const emailRegex: RegExp = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  );
  const isFormValid: boolean =
    firstName.length > 0 &&
    lastName.length > 0 &&
    emailRegex.test(email) &&
    password.length >= 8 &&
    password === confirmPassword;

  return (
    <main className="min-h-screen">
      <section className="min-h-screen bg-primary-lighter flex items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col gap-8 bg-card p-6 rounded-2xl shadow-lg">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Create your account
            </h2>

            <p className="text-sm text-muted-foreground">
              Start building your personal knowledge base.
            </p>
          </div>

          <Form method="post" className="space-y-4">
            <div className="w-full grid grid-cols-2 items-stretch gap-2">
              <Input
                id="first_name"
                name="first_name"
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() =>
                  setTouchedInputs({ ...touchedInputs, firstName: true })
                }
                errorMessage={
                  touchedInputs.firstName && firstName.length === 0
                    ? "First name is required"
                    : ""
                }
              />
              <Input
                id="last_name"
                name="last_name"
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onBlur={() =>
                  setTouchedInputs({ ...touchedInputs, lastName: true })
                }
                errorMessage={
                  touchedInputs.lastName && lastName.length === 0
                    ? "Last name is required"
                    : ""
                }
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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

            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Your password"
              value={password}
              onBlur={() =>
                setTouchedInputs({ ...touchedInputs, password: true })
              }
              errorMessage={
                touchedInputs.password && password.length < 8
                  ? "Password must be at least 8 characters"
                  : ""
              }
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              id="confirm_password"
              name="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onBlur={() =>
                setTouchedInputs({ ...touchedInputs, confirmPassword: true })
              }
              errorMessage={
                touchedInputs.confirmPassword && confirmPassword !== password
                  ? "Passwords do not match"
                  : ""
              }
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              disabled={!isFormValid}
              variant="primary"
              type="submit"
              className={`w-full ${!isFormValid ? "opacity-50 cursor-not-allowed hover:brightness-100" : "cursor-pointer"}`}
            >
              <AnimatePresence>
                {isSubmitting ? <p>Creating account</p> : <p>Create account</p>}
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
            {actionData?.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-primary text-center"
              >
                {actionData.error}
              </motion.div>
            )}
          </Form>

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

// Register.tsx action
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;

  try {
    const data = await register({ email, password, firstName, lastName });
    if (!data.session) {
      // No session = confirmation email was sent, user isn't logged in yet
      return redirect(`/verify-email?email=${encodeURIComponent(email)}`);
    }
    return redirect("/dashboard");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Register failed";
    if (message.toLowerCase().includes("rate limit")) {
      return {
        error: "Too many attempts. Please wait a few minutes and try again.",
      };
    }
    return { error: message };
  }
}
