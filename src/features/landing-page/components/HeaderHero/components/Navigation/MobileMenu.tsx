import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MobileMenu = ({ isOpen, items, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="lg:hidden mt-4 pb-4 border-t border-border pt-4"
    >
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-muted-foreground hover:text-foreground hover:bg-accent py-2 px-3 rounded-lg transition-colors"
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
            onClick={() => navigate("/login")}
          >
            Connexion
          </Button>
          <Button
            className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            onClick={() => navigate("/register")}
          >
            Essai gratuit
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
