
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import OrganizationDashboard from "../pages/OrganizationDashboard";
import FinancialDashboard from "../pages/FinancialDashboard";
import PersonalDashboard from "../pages/PersonalDashboard";
import { useOrganization } from "@/features/organizations/hooks/useOrganizations";

/**
 * Router intelligent qui affiche le bon dashboard selon le rôle
 */
export const DashboardRouter = () => {
  const { organizationId } = useParams();
    const { data: organization } = useOrganization(organizationId);


  // Déterminer quel dashboard afficher selon le rôle
  const role =organization?.userRole || "MEMBER";

  switch (role) {
    case "ADMIN":
      return <OrganizationDashboard />;
    
    case "FINANCIAL_MANAGER":
      return <FinancialDashboard />;
    
    case "MEMBER":
    default:
      return <PersonalDashboard />;
  }
};