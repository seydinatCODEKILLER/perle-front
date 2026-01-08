// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const DesktopNavigation = ({ items }) => (
  <nav className="hidden lg:flex items-center gap-8">
    {items.map((item) => (
      <motion.a
        key={item.label}
        href={item.href}
        className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative group"
        whileHover={{ y: -2 }}
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300" />
      </motion.a>
    ))}
  </nav>
);