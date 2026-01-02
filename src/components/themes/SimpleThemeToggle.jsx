import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffectiveTheme, useToggleTheme } from "@/app/hooks/useTheme";

/**
 * Bouton simple pour basculer entre clair/sombre
 */
export const SimpleThemeToggle = () => {
  const toggleTheme = useToggleTheme();
  const effectiveTheme = useEffectiveTheme();

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={toggleTheme}
      aria-label="Changer le thème"
    >
      {effectiveTheme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};