import { IoSearch } from "react-icons/io5";
import { FiTag } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import type { IconType } from "react-icons";


type HowItWorksProps = {
  icon: IconType;
  title: string;
  description: string;
  step: string;
};
const cardsData: HowItWorksProps[] = [
  {
    icon: GoShareAndroid,
    title: "Save from anywhere",
    description: "Paste a URL, use the browser extension, or share from mobile. Recall grabs the content automatically.",
    step: "01"
  },
  {
    icon: FiTag,
    title: "Auto-tagging happens",
    description: "Recall reads the content and attaches relevant tags and a summary — no manual work needed.",
    step: "02"
  },
  {
    icon: IoSearch,
    title: "Search by meaning",
    description: "Type what you remember — the idea, the concept, the feeling — and Recall finds the right item.",
    step: "03"
  },
];

const HowItWorksCard = ({ icon: Icon, title, description, step }: HowItWorksProps) => {
    return(
        <div className="flex flex-col items-start justify-center gap-2 p-6 md:p-8 rounded-xl border border-border/60 bg-background shadow-lg">
            <div className="w-full flex items-start justify-between gap-2">
                <div className="flex items-center justify-center bg-primary/10 p-3 rounded-lg">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
                <span 
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-3xl font-extrabold text-border">{step}</span>
            </div>
            <h3 
            style={{ fontFamily: "Manrope, sans-serif" }}
            className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}

export default function HowItWorks() {
    return(
        <section id="how" className="bg-muted/40 border-y border-border py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center">
                    <span className="text-sm uppercase font-bold text-primary">How it works</span>
                    <h2 className="text-4xl font-bold text-foreground">Three steps to a better memory</h2>
                </div>                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {cardsData.map((card, index) => (
                        <HowItWorksCard key={index} {...card} />
                    ))}
                </div>

            </div>
        </section>
    );
}