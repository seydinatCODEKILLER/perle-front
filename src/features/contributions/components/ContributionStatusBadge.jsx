import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getStatusOption } from "../utils/contribution-helpers";

export const ContributionStatusBadge = ({ status, className }) => {
  const option = getStatusOption(status);

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", option.color, option.bg, className)}
    >
      {option.label}
    </Badge>
  );
};