import { IoIosMailUnread } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";

import { useEffect, useState } from "react";
import { useSearchParams, useFetcher, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

import { resendConfirmation } from "../services/authServices";

import Button from "../components/ui/Button";

export function Component() {
  const [timer, setTimer] = useState(30);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const fetcher = useFetcher<{ success?: boolean; error?: string }>();

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          navigate("/dashboard", { replace: true });
        }
      },
    );
    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/dashboard", { replace: true });
      } else if (attempts >= 100) {
        // ~5 minutes
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    document.title = "Verify Email - Recall";
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = (): void => {
    if (!email) return;
    fetcher.submit({ email }, { method: "post" });
    setTimer(30);
  };

  const isResending = fetcher.state === "submitting";

  return (
    <main className="min-h-screen">
      <section className="min-h-screen bg-primary-lighter flex items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col gap-8 bg-card p-6 rounded-2xl shadow-lg text-center">
          <div className="w-fit mx-auto flex items-center justify-center rounded-full bg-primary/10 p-4">
            <IoIosMailUnread className="text-4xl text-primary" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Verify your email
            </h2>

            <p className="text-sm text-muted-foreground">
              We've sent a verification email to your inbox. Please check your
              email and click on the verification link to complete the
              registration process.
            </p>
          </div>

          {timer > 0 && (
            <AnimatePresence>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-muted-foreground"
              >
                You can resend the verification email in{" "}
                <span className="font-bold text-primary">{timer}</span> seconds.
              </motion.p>
            </AnimatePresence>
          )}

          <Button
            disabled={isResending || timer > 0}
            variant="primary"
            onClick={handleResend}
            className={`w-full ${isResending || timer > 0 ? "opacity-50 cursor-not-allowed hover:brightness-100" : "cursor-pointer"}`}
          >
            <AnimatePresence>
              {isResending ? (
                <p>Resending</p>
              ) : (
                <p>Resend verification email</p>
              )}
              {isResending && (
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
          <AnimatePresence>
            {fetcher.data?.error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3, delay: 5 } }}
                transition={{ duration: 0.3 }}
                className="text-sm text-primary text-center"
              >
                {fetcher.data.error}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {fetcher.data?.success && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3, delay: 5 } }}
                transition={{ duration: 0.3 }}
                className="text-sm text-primary text-center"
              >
                Verification email resent successfully!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  try {
    await resendConfirmation({ email });
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to resend verification email",
    };
  }
}
