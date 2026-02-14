import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Phone, Mail, Calendar, Edit, Trash2 } from "lucide-react";
import { formatMember, formatRole, formatStatus } from "../utils/member-helpers";
import { MEMBER_ROLES } from "../constants/member.constants";

export const MemberCard = ({ 
  member, 
  onEdit = () => {}, 
  onDelete = () => {} 
}) => {
  const formattedMember = formatMember(member);
  const isCurrentUser = member.userId === "current-user-id";
  
  const isAdmin = member.role === MEMBER_ROLES.ADMIN;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {formattedMember.fullName || "Utilisateur"}
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant={member.role === "ADMIN" ? "default" : "secondary"}>
                {formatRole(member.role)}
              </Badge>
              <Badge variant={member.status === "ACTIVE" ? "default" : "outline"}>
                {formatStatus(member.status)}
              </Badge>
            </div>
          </div>
          {member.user?.avatar ? (
            <img
              src={member.user.avatar}
              alt={formattedMember.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{member.user?.phone || "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{member.user?.email || "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Membre depuis {formattedMember.joinDate}</span>
          </div>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span>{formattedMember.contributionsCount} cotisations</span>
          <span>•</span>
          <span>{formattedMember.debtsCount} dettes</span>
        </div>
        
        {/* Boutons d'action - désactivés si le membre est ADMIN */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(member)}
            className="flex-1"
            disabled={isAdmin}
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(member)}
            className="flex-1"
            disabled={isCurrentUser || isAdmin}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}