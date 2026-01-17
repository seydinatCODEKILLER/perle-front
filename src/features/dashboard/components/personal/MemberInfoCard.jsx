/* eslint-disable react-hooks/static-components */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Mail, Phone, Calendar, Hash, Shield, 
  CheckCircle, XCircle, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { formatDate } from "../../utils/dashboard.utils";

export const MemberInfoCard = ({ memberInfo }) => {
  if (!memberInfo) return null;

  const { 
    memberNumber,
    fullName,
    email,
    phone,
    avatar,
    joinDate,
    status,
    role,
    profile
  } = memberInfo;

  const getStatusColor = () => {
    switch (status) {
      case "ACTIVE": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "INACTIVE": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "SUSPENDED": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case "ADMIN": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "FINANCIAL_MANAGER": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "MEMBER": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "ACTIVE": return CheckCircle;
      case "INACTIVE": return XCircle;
      case "SUSPENDED": return Clock;
      default: return User;
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <CardTitle className="text-base sm:text-lg font-bold">
              Mes Informations
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
          {/* Avatar et nom */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-primary/20">
              <AvatarImage src={avatar} alt={fullName} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg sm:text-xl">
                {fullName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold truncate">
                {fullName}
              </h3>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                <Badge className={cn("text-xs px-2", getStatusColor())}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {status?.toLowerCase()}
                </Badge>
                <Badge className={cn("text-xs px-2", getRoleColor())}>
                  <Shield className="w-3 h-3 mr-1" />
                  {role?.toLowerCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="truncate">{email || "Non renseigné"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>{phone || "Non renseigné"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Hash className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="font-mono">{memberNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>Membre depuis {formatDate(joinDate)}</span>
            </div>
          </div>

          {/* Informations du profil */}
          {profile && (
            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Informations complémentaires</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                {profile.dateOfBirth && (
                  <p>📅 Né(e) le {formatDate(profile.dateOfBirth)}</p>
                )}
                {profile.profession && (
                  <p>💼 {profile.profession}</p>
                )}
                {profile.address && (
                  <p>📍 {profile.address}</p>
                )}
              </div>
            </div>
          )}

          {/* Badge de membre */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Identifiant unique</span>
              <code className="font-mono bg-muted px-2 py-1 rounded">
                {memberNumber}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};