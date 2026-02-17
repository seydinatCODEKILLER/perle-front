import { cn } from "@/lib/utils";

export const ContributionProgressBar = ({ percent, className }) => {
  const color =
    percent >= 100 ? "bg-green-500" :
    percent >= 50  ? "bg-orange-500" :
                     "bg-red-500";

  return (
    <div className={cn("w-full bg-muted rounded-full h-2", className)}>
      <div
        className={cn("h-2 rounded-full transition-all duration-500", color)}
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
};