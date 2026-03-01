// components/layout/DashboardHeader.jsx

import { OrgHeaderWithSwitch } from "@/components/layout/OrgHeaderWithSwitch";
import { HorizontalNav } from "@/components/layout/HorizontalNav";
import { useOrganization } from "@/features/organizations/hooks/useOrganizations";
import { useNavigationSpace } from "@/features/organizations/hooks/useNavigationSpace";
import { getNavigationItems, hasManagementAccess } from "@/features/organizations/utils/navigation.utils";
import { useParams } from "react-router-dom";
import { authSelectors, useAuthStore } from "@/features/auth";
import { WalletProgressCard } from "@/features/dashboard/components/admin/WalletProgressCard";

export const DashboardHeader = ({ 
  onRefresh, 
  isRefreshing,
  wallet,
  memberCount,
  currency 
}) => {
  const { organizationId } = useParams();
  const { data: organization } = useOrganization(organizationId);
  const user = useAuthStore(authSelectors.user);

  const { currentSpace, setSpace } = useNavigationSpace(organizationId);

  const userRole = organization?.userRole || "MEMBER";
  const canAccessManagement = hasManagementAccess(userRole);

  const navItems = getNavigationItems(userRole, currentSpace);

  return (
    <div className="lg:hidden bg-muted/50 dark:bg-muted/30 space-y-0">
      {/* Header avec switch */}
      <OrgHeaderWithSwitch
        organization={organization}
        user={user}
        currentSpace={currentSpace}
        onSpaceChange={canAccessManagement ? setSpace : undefined}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        canSwitchSpace={canAccessManagement}
      />

      {/* Wallet Progress Card */}
      {wallet && (
        <div className="px-4 pb-3">
          <WalletProgressCard
            wallet={wallet}
            memberCount={memberCount}
            currency={currency || organization?.currency || "XOF"}
          />
        </div>
      )}

      {/* Navigation horizontale avec coins arrondis */}
      <div className="bg-background dark:bg-background/95 rounded-t-2xl">
        <HorizontalNav items={navItems} />
      </div>
    </div>
  );
};