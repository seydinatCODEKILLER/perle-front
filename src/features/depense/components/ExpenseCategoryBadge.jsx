import { Badge } from "@/components/ui/badge";
import { getCategoryLabel } from "../utils/expense-helpers";

const CATEGORY_COLORS = {
  EVENT: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  SOCIAL: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  ADMINISTRATIVE: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  MAINTENANCE: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  DONATION: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  INVESTMENT: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  OPERATIONAL: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  OTHER: "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
};

export const ExpenseCategoryBadge = ({ category }) => {
  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.OTHER;

  return (
    <Badge 
      variant="outline"
      className={`text-xs ${colorClass}`}
    >
      {getCategoryLabel(category)}
    </Badge>
  );
};