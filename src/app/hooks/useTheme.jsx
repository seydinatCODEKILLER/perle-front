import { useContext } from "react";
import { ThemeProviderContext } from "../themes/themeProviderContext";
import { THEMES } from "../themes";


/**
 * Hook pour utiliser le thème
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

/**
 * Hook pour basculer entre dark et light
 * @returns {() => void}
 */
export const useToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return () => {
    if (theme === THEMES.SYSTEM) {
      // Si système, passer en mode explicite
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? THEMES.DARK
        : THEMES.LIGHT;
      
      setTheme(systemTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
    } else {
      // Basculer entre light et dark
      setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
    }
  };
};

/**
 * Hook pour obtenir le thème effectif (résout "system")
 * @returns {string} - "light" ou "dark"
 */
export const useEffectiveTheme = () => {
  const { theme } = useTheme();

  if (theme === THEMES.SYSTEM) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  }

  return theme;
};