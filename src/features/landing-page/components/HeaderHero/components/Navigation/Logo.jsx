// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Building } from "lucide-react";

export const Logo = () => (
  <motion.div 
    className="flex items-center gap-2"
    whileHover={{ scale: 1.05 }}
  >
    <div className="p-2 bg-linear-to-br from-blue-600 to-indigo-600 rounded-4xl">
      <Building className="h-6 w-6 text-white" />
    </div>
    <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent hidden md:inline">
      Organizely
    </span>
  </motion.div>
);