// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

export const ComparisonToggle = ({ showComparison, setShowComparison }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <div className="inline-flex items-center gap-3">
      <Switch
        checked={showComparison}
        onCheckedChange={setShowComparison}
        id="comparison-toggle"
      />
      <Label htmlFor="comparison-toggle" className="text-lg font-medium cursor-pointer">
        Comparer toutes les fonctionnalités
      </Label>
      <HelpCircle className="w-4 h-4 text-muted-foreground" />
    </div>
  </motion.div>
);