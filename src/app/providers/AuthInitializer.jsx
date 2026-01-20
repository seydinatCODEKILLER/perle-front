import { useEffect } from "react";
import { useAuth } from "@/features/auth";
import { OrganizelyLoader } from "@/components/loader/OrganizelyLoader";

export const AuthInitializer = ({ children }) => {
  const { initializeAuth, isInitialized, isLoading } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isInitialized) {
    return <OrganizelyLoader fullScreen showText size="xl" />;
  }

  return (
    <>
      {/* ✅ Indicateur optionnel pendant la vérification en arrière-plan */}
      {isLoading && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-background/80 backdrop-blur-sm border rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              <span className="text-sm text-muted-foreground">
                Vérification...
              </span>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};