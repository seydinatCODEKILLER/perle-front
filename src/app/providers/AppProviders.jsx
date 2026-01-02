import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider";
import { AuthInitializer } from "./AuthInitializer";
import { createQueryClient } from "../config/query-client.config";

const queryClient = createQueryClient();

/**
 * Provider global de l'application
 */
export const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <AuthInitializer>
            {children}
          </AuthInitializer>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};