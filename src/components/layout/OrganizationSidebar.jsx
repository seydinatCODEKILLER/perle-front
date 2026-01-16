import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Users, 
  Coins, 
  CreditCard, 
  History, 
  ArrowLeftRight, 
  Settings,
  Building2,
  User,
  Briefcase,
  ChevronLeft,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useOrganizationNavigation } from "@/shared/hooks/useOrganizationNavigation";
import { ConfirmationModal } from "../modal/ConfirmationModal";

// Mapping des icônes
const ICON_MAP = {
  LayoutDashboard: LayoutDashboard,
  Users: Users,
  Coins: Coins,
  CreditCard: CreditCard,
  History: History,
  ArrowLeftRight: ArrowLeftRight,
  Settings: Settings,
  Building2: Building2,
  User: User,
  Briefcase: Briefcase,
};

export const OrganizationSidebar = ({ 
  organization,
  userRole,
  className 
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();  

  const {
    currentSpace,
    setCurrentSpace,
    navigationItems,
    canSwitchSpace,
  } = useOrganizationNavigation(userRole);

  const handleSwitchSpace = () => {
    setCurrentSpace(currentSpace === "personal" ? "management" : "personal");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackToOrganizations = () => {
    navigate("/organizations");
  };

  return (
    <>
      <Sidebar className={cn("border-r", className)}>
        <SidebarHeader className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToOrganizations}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {organization?.logo ? (
                <img
                  src={organization.logo}
                  alt={organization.name}
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                <Building2 className="w-8 h-8 text-primary" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {organization?.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {organization?.type?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-4">
          {/* Bouton de bascule d'espace */}
          {canSwitchSpace && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Espace
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSwitchSpace}
                  className="h-7 px-2 text-xs"
                >
                  {currentSpace === "personal" ? (
                    <>
                      <Briefcase className="w-3 h-3 mr-1" />
                      Professionnel
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 mr-1" />
                      Personnel
                    </>
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={cn(
                  "p-2 rounded",
                  currentSpace === "personal" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  <User className="w-4 h-4" />
                </div>
                <Separator className="flex-1" />
                <div className={cn(
                  "p-2 rounded",
                  currentSpace === "management" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider">
              {currentSpace === "personal" ? "Espace Personnel" : "Gestion"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
                  const Icon = ICON_MAP[item.icon] || LayoutDashboard;
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <Link to={item.fullPath}>
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rôle</span>
              <span className="font-medium capitalize">{userRole?.toLowerCase()}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Modal de déconnexion */}
      <ConfirmationModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Déconnexion"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        variant="logout"
        confirmText="Se déconnecter"
        cancelText="Annuler"
      />
    </>
  );
};