import { IoSearch } from "react-icons/io5";
import { FiTag } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { MdOutlineShield } from "react-icons/md";
import type { IconType } from "react-icons";


type FeaturesProps = {
  icon: IconType;
  title: string;
  description: string;
};
const cardsData: FeaturesProps[] = [
  {
    icon: GoShareAndroid,
    title: "Save from anywhere",
    description: "Browser extension, mobile share sheet, direct paste — one tap to save.",
  },
  {
    icon: IoSearch,
    title: "Meaning-based search",
    description: "Powered by vector embeddings. Finds items even when you use different words than the original.",
  },
  {
    icon: FiTag,
    title: "Auto-tagging",
    description: "Tags and categories applied automatically. Edit them anytime.",
  },
  {
    icon: MdOutlineShield,
    title: "Private & yours",
    description: "No selling your reading habits. Your saves are encrypted and private by default.",
  },
];

const FeaturesCard = ({
  icon: Icon,
  title,
  description,
}: FeaturesProps) => {
  return (
    <div className="rounded-xl border border-border/60 bg-background p-6 shadow-lg md:p-8">
      <div className="flex items-start gap-4">
        
        {/* Icon */}
        <div className="flex shrink-0 items-center justify-center rounded-lg bg-primary/10 p-3">
          <Icon className="h-8 w-8 text-primary" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <h3
            style={{ fontFamily: "Manrope, sans-serif" }}
            className="text-lg font-semibold text-foreground"
          >
            {title}
          </h3>

          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default function Features() {
    return(
        <section id="features" className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center">
                    <span className="text-sm uppercase font-bold text-primary">Features</span>
                    <h2 className="text-4xl font-bold text-foreground">Everything your brain needs</h2>
                </div>                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {cardsData.map((card, index) => (
                        <FeaturesCard key={index} {...card} />
                    ))}
                </div>

            </div>
        </section>
    );
}