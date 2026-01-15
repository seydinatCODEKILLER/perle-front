import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { NAVIGATION_ITEMS } from "../../constants/navigation";
import { Logo } from "./Logo";
import { DesktopNavigation } from "./DesktopNavigation";
import { useNavigate } from "react-router-dom";

export const NavigationHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300"
      style={{
        backgroundColor: `rgba(var(--background), ${headerOpacity.get()})`,
        backdropFilter: `blur(${headerBlur.get()}px)`,
        transform: `scale(${headerScale.get()})`,
      }}
    >
      <motion.div
        className={`mx-auto max-w-7xl py-4 ${
          isScrolled 
            ? "rounded-xl border border-border/50 bg-background/80 backdrop-blur-lg mt-2 mx-4 sm:mx-6 shadow-xl dark:shadow-2xl" 
            : ""
        }`}
        initial={false}
        animate={{
          paddingLeft: isScrolled ? "1.5rem" : "0",
          paddingRight: isScrolled ? "1.5rem" : "0",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <Logo />
          
          <DesktopNavigation 
            items={NAVIGATION_ITEMS}
            isScrolled={isScrolled}
          />
          
          <RightSideActions 
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          items={NAVIGATION_ITEMS}
          onClose={() => setIsMenuOpen(false)}
        />
      </motion.div>
    </motion.header>
  );
};

const RightSideActions = ({ isMenuOpen, onMenuToggle }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="hidden lg:flex items-center gap-4">
        <ThemeToggle />

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground hover:bg-accent"
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

      <div className="lg:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          className="text-muted-foreground hover:text-foreground"
          onClick={onMenuToggle}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
};