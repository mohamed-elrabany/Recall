import { IoSearch } from "react-icons/io5";

type ResultCardProps = {
  icon: string;
  title: string;
  link: string;
  tag: string;
  percentage: string;
};

type ResultCardComponentProps = {
  card: ResultCardProps;
  index: number;
};

const cardsData: ResultCardProps[] = [
  {
    icon: "📄",
    title: "Attention Is All You Need — Original Transformer Paper",
    link: "arxiv.org",
    tag: "machine learning",
    percentage: "99%",
  },
  {
    icon: "🧠",
    title: "The Unreasonable Effectiveness of Recurrent Neural Networks",
    link: "karpathy.github.io",
    tag: "research",
    percentage: "94%",
  },
  {
    icon: "🔍",
    title: "Building a semantic search engine with embeddings",
    link: "openai.com",
    tag: "backend",
    percentage: "87%",
  },
];

const ResultCard = ({ card, index }: ResultCardComponentProps) => {
  return (
    <div
      style={{ opacity: 1 - index * 0.2 }}
      className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-background"
    >
      {/* Left side */}
      <div className="flex flex-1 min-w-0 items-center gap-4">
        <span className="text-xl shrink-0">{card.icon}</span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="truncate text-sm font-semibold text-foreground"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {card.title}
          </p>

          <p className="text-xs text-muted-foreground truncate">{card.link}</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-2">
        <p className="w-fit whitespace-nowrap rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-semibold text-primary">
          {card.tag}
        </p>

        <p className="whitespace-nowrap text-xs font-bold text-primary">
          {card.percentage}
        </p>
      </div>
    </div>
  );
};

export default function SearchMockup() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 md:pb-28">
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/50">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
          <div className="flex-1 mx-4 h-6 bg-background rounded-md flex items-center px-3">
            <span className="text-xs text-muted-foreground">app.recall.so</span>
          </div>
        </div>
        <div className="space-y-4 p-6 md:p-8">
          <div className="w-full border-4 border-primary/20 rounded-xl">
            <div className="flex justify-between items-center w-full p-4 border-2 border-primary rounded-lg gap-3">
              {/* Search content */}
              <div className="flex flex-1 min-w-0 items-center gap-2 text-sm text-foreground font-semibold">
                <IoSearch className="w-6 h-6 text-primary shrink-0" />

                <p>"that article about attention mechanisms"</p>
              </div>

              {/* Results */}
              <p className="shrink-0 whitespace-nowrap text-[10px] text-primary bg-primary/10 px-3 py-1.5 font-semibold rounded-full">
                3 results
              </p>
            </div>
          </div>
          {cardsData.map((card, index) => (
            <ResultCard key={index} card={card} index={index} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center p-4">
          ✦ Found by meaning, not by exact words
        </p>
      </div>
    </section>
  );
}
