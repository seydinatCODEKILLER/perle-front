import { Outlet } from "react-router-dom";
import { OrganizationSidebar } from "@/components/layout/OrganizationSidebar";
import { OrganizationRouter } from "@/features/organizations/routes/OrganizationRouter";
import { FloatLogoutWithConfirm } from "@/components/layout/FloatLogoutWithConfirm";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useOrganization } from "@/features/organizations/hooks/useOrganizations";
import { useNavigationSpace } from "@/features/organizations/hooks/useNavigationSpace";
import { useParams } from "react-router-dom";

export const OrganizationLayout = () => {
  const { organizationId } = useParams();
  const { data: organization } = useOrganization(organizationId);

  const { currentSpace, setSpace } = useNavigationSpace(organizationId);

  const userRole = organization?.userRole || "MEMBER";

  return (
    <OrganizationRouter>
      <SidebarProvider defaultOpen>
        <div className="flex h-screen w-full">
          {/* Sidebar Desktop uniquement */}
          <div className="hidden lg:block">
            <OrganizationSidebar
              organization={organization}
              userRole={userRole}
              currentSpace={currentSpace}
              onSpaceChange={setSpace}
            />
          </div>

          <SidebarInset className="flex-1">
            {/* Header Desktop uniquement */}
            <header className="sticky top-0 z-10 hidden lg:flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
              <SidebarTrigger />
            </header>

            {/* Contenu principal - SANS header ni nav mobile */}
            <main className="flex-1 overflow-auto bg-background lg:bg-muted">
              <div className="p-0 lg:p-6">
                <Outlet />
              </div>
            </main>
          </SidebarInset>

          {/* Bouton de déconnexion */}
          <FloatLogoutWithConfirm />
        </div>
      </SidebarProvider>
    </OrganizationRouter>
  );
};