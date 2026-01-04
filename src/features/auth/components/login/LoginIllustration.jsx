// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { IMAGE_URL } from "@/shared/constants/asset.const";

/**
 * Illustration animée pour la page de login
 */
export const LoginIllustration = ({ rotateX, rotateY }) => (
  <motion.div
    className="hidden lg:flex w-1/2 relative overflow-hidden"
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={IMAGE_URL.CONNEXION}
        alt="MoneyWise Dashboard"
        className="w-full h-full object-cover"
      />
    </motion.div>
  </motion.div>
);