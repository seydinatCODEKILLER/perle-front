import { Outlet, useParams } from "react-router-dom";
import { OrganizationSidebar } from "@/components/layout/OrganizationSidebar";
import { OrganizationRouter } from "@/features/organizations/routes/OrganizationRouter";
import { FloatLogoutWithConfirm } from "@/components/layout/FloatLogoutWithConfirm";
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { useOrganization } from "@/features/organizations/hooks/useOrganizations";

/**
 * Layout principal des organisations
 * La logique de routing est déléguée à OrganizationRouter
 */
export const OrganizationLayout = () => {
  const { organizationId } = useParams();
  const { data: organization } = useOrganization(organizationId);

  // OrganizationRouter gère le chargement et les redirections
  return (
    <OrganizationRouter>
      <SidebarProvider defaultOpen>
        <div className="flex h-screen w-full">
          <OrganizationSidebar 
            organization={organization} 
            userRole={organization?.userRole} 
          />

          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
              <SidebarTrigger />
            </header>
            
            <main className="flex-1 overflow-auto">
              <div className="p-4 md:p-6">
                <Outlet />
              </div>
            </main>
          </SidebarInset>

          <FloatLogoutWithConfirm />
        </div>
      </SidebarProvider>
    </OrganizationRouter>
  );
};