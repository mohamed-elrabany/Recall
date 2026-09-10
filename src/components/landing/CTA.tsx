import { FaArrowRightLong } from "react-icons/fa6";
import { motion, type Variants } from "framer-motion";

import LinkButton from "../ui/LinkButton";

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function CTA() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 md:pb-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="rounded-2xl bg-primary p-10 text-center md:p-14"
      >
        <motion.h2
          variants={itemVariants}
          className="mb-4 text-2xl font-extrabold text-white md:text-3xl"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Start saving smarter today
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-8 max-w-sm text-sm text-white/80 md:text-base"
        >
          Join thousands of curious people who actually find what they saved.
        </motion.p>

        <motion.div variants={itemVariants}>
          <LinkButton
            variant="secondary"
            to="/register"
            className="mx-auto w-fit border-none bg-white font-bold text-primary hover:bg-white/90 hover:gap-8 duration-300"
          >
            Get started free
            <FaArrowRightLong className="h-4 w-4" />
          </LinkButton>
        </motion.div>
      </motion.div>
    </section>
  );
}