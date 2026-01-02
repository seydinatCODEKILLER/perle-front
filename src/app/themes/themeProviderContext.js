import { createContext } from "react";
import { THEMES } from "./theme.constant";

/**
 * Context pour le thème
 */
export const ThemeProviderContext = createContext({
  theme: THEMES.SYSTEM,
  setTheme: () => null,
});
