/* eslint-disable no-unused-vars */
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Suivi des dépenses en temps réel",
  "Budgets personnalisés et alertes",
  "Rapports détaillés et insights",
];

/**
 * Composant liste des fonctionnalités
 */
export const FeaturesList = () => (
  <motion.div
    className="space-y-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
  >
    {features.map((feature, index) => (
      <FeatureItem key={index} text={feature} />
    ))}
  </motion.div>
);

const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3 text-white/90">
    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
      <CheckCircle2 className="w-5 h-5" />
    </div>
    <span className="text-sm">{text}</span>
  </div>
);