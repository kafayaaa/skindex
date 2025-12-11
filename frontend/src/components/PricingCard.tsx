// components/PricingCard.tsx
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export default function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  highlighted,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 border transition-all duration-300 ${
        highlighted
          ? "border-cyan-300 dark:border-cyan-700 bg-linear-to-b from-cyan-50/50 to-white dark:from-cyan-900/20 dark:to-zinc-900 scale-105 shadow-lg"
          : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-cyan-600 text-white text-sm font-medium">
            Populer
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          {name}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            {price}
          </span>
          {period && (
            <span className="text-zinc-600 dark:text-zinc-400">{period}</span>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          highlighted
            ? "bg-cyan-600 hover:bg-cyan-700 text-white"
            : "border border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
