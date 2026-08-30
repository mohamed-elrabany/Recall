import { FaArrowRightLong } from "react-icons/fa6";

import LinkButton from "../ui/LinkButton";

export default function CTA() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 md:pb-28">
      <div className="rounded-2xl bg-primary p-10 text-center md:p-14">
        
        <h2
          className="mb-4 text-2xl font-extrabold text-white md:text-3xl"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Start saving smarter today
        </h2>

        <p className="mx-auto mb-8 max-w-sm text-sm text-white/80 md:text-base">
          Join thousands of curious people who actually find what they saved.
        </p>

        <LinkButton
          variant="secondary"
          to="/register"
          className="mx-auto w-fit border-none bg-white font-bold text-primary hover:bg-white/90"
        >
          Get started free
          <FaArrowRightLong className="h-4 w-4" />
        </LinkButton>

      </div>
    </section>
  );
}