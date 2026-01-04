import { Shield } from "lucide-react";

/**
 * Notice de sécurité
 */
export const SecurityNotice = () => (
  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
    <Shield className="w-4 h-4 text-green-500" />
    <span>Vos données sont protégées et chiffrées</span>
  </div>
);