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
  SidebarMenuItem,
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
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
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

export const OrganizationSidebar = ({ organization, userRole, className }) => {
  const navigate = useNavigate();

  const { currentSpace, setCurrentSpace, navigationItems, canSwitchSpace } =
    useOrganizationNavigation(userRole);

  // eslint-disable-next-line no-unused-vars
  const handleSwitchSpace = () => {
    setCurrentSpace(currentSpace === "personal" ? "management" : "personal");
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

              <div className="relative flex p-1 bg-muted/50 rounded-lg border">
                {/* Indicateur de sélection animé */}
                <div
                  className={cn(
                    "absolute top-1 bottom-1 bg-background rounded-md shadow-sm transition-all duration-200 ease-out",
                    currentSpace === "personal"
                      ? "left-1 right-[50%]"
                      : "left-[50%] right-1",
                  )}
                />

                {/* Bouton Personnel */}
                <button
                  onClick={() => setCurrentSpace("personal")}
                  className={cn(
                    "relative flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors z-10",
                    currentSpace === "personal"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Membre</span>
                  </div>
                </button>

                {/* Bouton Gestion */}
                <button
                  onClick={() => setCurrentSpace("management")}
                  className={cn(
                    "relative flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors z-10",
                    currentSpace === "management"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="hidden sm:inline">Gestion</span>
                  </div>
                </button>
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
              <span className="font-medium capitalize">
                {userRole?.toLowerCase()}
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
