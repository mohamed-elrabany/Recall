import { FaBolt, FaArrowRightLong } from "react-icons/fa6";

import LinkButton from "../ui/LinkButton";
import { motion } from "framer-motion";

const fadeUp = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="flex items-center justify-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full w-fit mx-auto origin-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.3,
          }}
          className="flex items-center gap-2"
        >
          <FaBolt className="w-3 h-3 text-primary shrink-0" />

          <p className="text-primary font-semibold text-xs whitespace-nowrap">
            Semantic search for your saved links
          </p>
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        {...fadeUp}
        transition={{
          delay: 0.5,
          duration: 0.5,
        }}
        className="mt-6 text-4xl md:text-5xl font-bold text-foreground"
      >
        Search your saved links{" "}
        <span className="text-primary">by meaning,</span> not exact words
      </motion.h1>

      {/* Description */}
      <motion.p
        {...fadeUp}
        transition={{
          delay: 0.7,
          duration: 0.5,
        }}
        className="mt-5 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto"
      >
        Recall remembers what you saved and understands what you meant when you
        saved it — so you can find anything by describing the idea, not by
        remembering the title.
      </motion.p>

      {/* Actions */}
      <motion.div
        {...fadeUp}
        transition={{
          delay: 0.9,
          duration: 0.5,
        }}
        className="mt-8 w-full flex flex-col md:flex-row items-center justify-center gap-2"
      >
        <LinkButton
          variant="primary"
          to="/register"
          className="w-full md:w-fit"
        >
          Get Started free
          <FaArrowRightLong className="w-3 h-3" />
        </LinkButton>

        <LinkButton
          to="/login"
          variant="secondary"
          className="w-full md:w-fit"
        >
          Sign in
        </LinkButton>
      </motion.div>
    </section>
  );
}