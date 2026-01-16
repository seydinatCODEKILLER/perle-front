import { Outlet } from "react-router-dom";
import { OrganizationSidebar } from "@/components/layout/OrganizationSidebar";
import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { useOrganization } from "@/features/organizations/hooks/useOrganizations";

export const OrganizationLayout = () => {
  const { organizationId } = useParams();

  const { data: organization, isLoading } = useOrganization(organizationId);

  // Pour l'instant, on utilise le rôle depuis l'organization
  // Plus tard, on récupérera le rôle depuis le membership
  const userRole = organization?.userRole || "MEMBER";
  console.log(organization);
  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            Chargement de l'organisation...
          </p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Organisation non trouvée</h1>
          <p className="text-muted-foreground">
            Cette organisation n'existe pas ou vous n'y avez pas accès.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full">
        <OrganizationSidebar organization={organization} userRole={userRole} />

        {/* Contenu principal */}
        <SidebarInset>
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
