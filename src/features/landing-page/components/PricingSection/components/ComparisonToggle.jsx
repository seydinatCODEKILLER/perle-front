import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

export const ComparisonToggle = memo(({ showComparison, setShowComparison }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="text-center mb-8 sm:mb-12"
  >
    <div className="inline-flex items-center gap-2 sm:gap-3">
      <Switch
        checked={showComparison}
        onCheckedChange={setShowComparison}
        id="comparison-toggle"
      />
      <Label htmlFor="comparison-toggle" className="text-sm sm:text-base lg:text-lg font-medium cursor-pointer">
        Comparer toutes les fonctionnalités
      </Label>
      <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
    </div>
  </motion.div>
));

ComparisonToggle.displayName = "ComparisonToggle";