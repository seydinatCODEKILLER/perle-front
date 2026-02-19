import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useCurrentUser, useAuth } from "@/features/auth";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { ROUTES } from "@/routes";

export const UserMenuDropdown = () => {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const { logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const getInitials = () => {
    if (!user) return "?";
    const prenom = user.prenom?.[0] || "";
    const nom = user.nom?.[0] || "";
    return `${prenom}${nom}`.toUpperCase() || "U";
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 h-auto py-2 px-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar} alt={user?.prenom} />
              <AvatarFallback className="text-xs">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium leading-none">
                {user?.prenom} {user?.nom}
              </span>
              <span className="text-xs text-muted-foreground leading-none mt-1">
                {user?.email || user?.phone}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email || user?.phone}
              </p>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate(ROUTES.PROFILE)}>
            <User className="w-4 h-4 mr-2" />
            Mon profil
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setIsLogoutModalOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Se déconnecter"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Se déconnecter"
        cancelText="Annuler"
        variant="destructive"
      />
    </>
  );
};