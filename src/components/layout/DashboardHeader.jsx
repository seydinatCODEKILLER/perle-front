import { OrgHeaderWithSwitch } from "@/components/layout/OrgHeaderWithSwitch";
import { HorizontalNav } from "@/components/layout/HorizontalNav";
import { useOrganization } from "@/features/organizations/hooks/useOrganizations";
import { useNavigationSpace } from "@/features/organizations/hooks/useNavigationSpace";
import { getNavigationItems, hasManagementAccess } from "@/features/organizations/utils/navigation.utils";
import { useParams } from "react-router-dom";
import { authSelectors, useAuthStore } from "@/features/auth";

export const DashboardHeader = ({ onRefresh, isRefreshing }) => {
  const { organizationId } = useParams();
  const { data: organization } = useOrganization(organizationId);
  const user = useAuthStore(authSelectors.user);

  const { currentSpace, setSpace } = useNavigationSpace(organizationId);

  const userRole = organization?.userRole || "MEMBER";
  const canAccessManagement = hasManagementAccess(userRole);

  const navItems = getNavigationItems(userRole, currentSpace);

  return (
    <div className="lg:hidden sticky top-0 z-40 bg-muted">
      <OrgHeaderWithSwitch
        organization={organization}
        user={user}
        currentSpace={currentSpace}
        onSpaceChange={canAccessManagement ? setSpace : undefined}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        canSwitchSpace={canAccessManagement}
      />

      {/* Navigation horizontale avec coins arrondis */}
      <div className="bg-background rounded-t-2xl">
        <HorizontalNav items={navItems} />
      </div>
    </div>
  );
};