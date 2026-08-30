import { FaBolt, FaArrowRightLong } from "react-icons/fa6";

import { Link } from "react-router";

import LinkButton from "../ui/LinkButton";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center">
      
      <div className="flex items-center justify-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full w-fit mx-auto">
        <FaBolt className="w-3 h-3 text-primary" />
        <p className="text-primary font-semibold text-xs">
          Semantic search for your saved links
        </p>
      </div>

      <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
        Search your saved links{" "}
        <span className="text-primary">by meaning,</span> not exact words
      </h1>

      <p className="mt-5 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
        Recall remembers what you saved and understands what you meant when you
        saved it — so you can find anything by describing the idea, not by
        remembering the title.
      </p>

      <div className="mt-8 w-full flex flex-col md:flex-row items-center justify-center gap-2">
        <LinkButton variant="primary" to="/register" className="w-full md:w-fit">
                Get Started free
            <FaArrowRightLong className="w-3 h-3" />     
        </LinkButton>



        <LinkButton to="/login" variant="secondary" className="w-full md:w-fit">
            Sign in
        </LinkButton>
      </div>

    </section>
  );
}