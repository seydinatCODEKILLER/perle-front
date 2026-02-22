import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Users, Crown, Shield } from "lucide-react";
import { formatRole } from "../utils/member-helpers";

export const MemberSidebarItem = ({ member, isSelected, onClick }) => {
  const getInitials = () => {
    const firstName = member.user?.prenom || "";
    const lastName = member.user?.nom || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?";
  };

  const getRoleIcon = () => {
    switch (member.role) {
      case "ADMIN":
        return <Crown className="w-3 h-3" />;
      case "FINANCIAL_MANAGER":
        return <Shield className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (member.status) {
      case "ACTIVE":
        return "bg-green-500";
      case "INACTIVE":
        return "bg-gray-400";
      case "SUSPENDED":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      onClick={() => onClick(member)}
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer border-b hover:bg-accent/50 transition-colors",
        isSelected && "bg-accent"
      )}
    >
      {/* Avatar avec indicateur de statut */}
      <div className="relative shrink-0">
        <Avatar className="w-12 h-12">
          <AvatarImage src={member.user?.avatar} alt={getInitials()} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        {/* Indicateur de statut */}
        <div
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
            getStatusColor()
          )}
        />
      </div>

      {/* Info membre */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-semibold truncate">
            {member.user?.prenom} {member.user?.nom}
          </p>
          {getRoleIcon() && (
            <span className="text-muted-foreground shrink-0">
              {getRoleIcon()}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {member.user?.email || member.user?.phone}
        </p>
      </div>

      {/* Badge de rôle (optionnel, visible au hover) */}
      {member.role !== "MEMBER" && (
        <Badge
          variant="outline"
          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {formatRole(member.role)}
        </Badge>
      )}
    </div>
  );
};