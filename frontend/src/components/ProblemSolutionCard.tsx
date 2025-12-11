// components/ProblemSolutionCard.tsx
interface ProblemSolutionCardProps {
  problem: string;
  solution: string;
  index: number;
}

export default function ProblemSolutionCard({
  problem,
  solution,
  index,
}: ProblemSolutionCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-linear-to-br from-white to-cyan-50 dark:from-zinc-800 dark:to-cyan-900/10 border border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">
            {index}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Masalah
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{problem}</p>
        </div>
      </div>
      <div className="pl-14">
        <div className="relative">
          <div className="absolute -left-6 top-3 w-4 h-4 border-l-2 border-t-2 border-cyan-300 dark:border-cyan-700 transform -rotate-45" />
          <h4 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
            Solusi Kami
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">{solution}</p>
        </div>
      </div>
    </div>
  );
}
