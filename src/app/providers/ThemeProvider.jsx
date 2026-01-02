import { useEffect, useState } from "react";
import { THEMES } from "../themes/theme.constant";
import { ThemeProviderContext } from "../themes";

/**
 * Provider pour gérer le thème de l'application
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.defaultTheme="system"]
 * @param {string} [props.storageKey="ui-theme"]
 */
export const ThemeProvider = ({
  children,
  defaultTheme = THEMES.SYSTEM,
  storageKey = "ui-theme",
  ...props
}) => {
  const [theme, setThemeState] = useState(() => {
    // Récupérer le thème depuis localStorage ou utiliser le défaut
    try {
      const stored = localStorage.getItem(storageKey);
      return stored || defaultTheme;
    } catch (error) {
      console.warn("Impossible de lire le thème depuis localStorage:", error);
      return defaultTheme;
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Supprimer les classes de thème existantes
    root.classList.remove(THEMES.LIGHT, THEMES.DARK);

    // Appliquer le thème système si nécessaire
    if (theme === THEMES.SYSTEM) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? THEMES.DARK
        : THEMES.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    // Appliquer le thème choisi
    root.classList.add(theme);
  }, [theme]);

  /**
   * Changer le thème et persister dans localStorage
   */
  const setTheme = (newTheme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.warn("Impossible de sauvegarder le thème:", error);
      setThemeState(newTheme); // Appliquer quand même
    }
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
