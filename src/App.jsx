import { AppProviders } from "./app/providers/AppProviders";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";

/**
 * Composant principal de l'application
 */
export function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <Toaster 
        position="top-right" 
        richColors 
        expand 
        visibleToasts={5}
        closeButton
      />
    </AppProviders>
  );
}