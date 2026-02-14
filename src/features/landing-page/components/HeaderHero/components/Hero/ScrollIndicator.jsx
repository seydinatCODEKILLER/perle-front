// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center">
      <div className="w-1 h-3 bg-linear-to-b from-blue-400 to-indigo-400 rounded-full mt-2" />
    </div>
  </motion.div>
);