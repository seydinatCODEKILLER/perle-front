// components/contribution-plans/ViewPlanMembersModal.jsx

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  CheckCircle, 
  Clock, 
  Users, 
  UserCircle,
  TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatPlan,
  formatPlanAmounts,
} from "../utils/contribution-plan-helpers";
import { cn } from "@/lib/utils";

export const ViewPlanMembersModal = ({
  open,
  onClose,
  plan,
  contributions,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const formattedPlan = plan ? formatPlan(plan) : null;
  const amounts = plan ? formatPlanAmounts(plan) : null;

  // Grouper les contributions par membre
  const memberContributions = useMemo(() => {
    if (!contributions) return [];

    return contributions.map((contrib) => {
      const displayInfo = contrib.membership?.displayInfo || {
        firstName: contrib.membership?.user?.prenom,
        lastName: contrib.membership?.user?.nom,
        phone: contrib.membership?.user?.phone,
        email: contrib.membership?.user?.email,
        avatar: contrib.membership?.user?.avatar,
        isProvisional: !contrib.membership?.userId,
      };

      return {
        ...contrib,
        displayInfo,
        memberFullName:
          `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() ||
          "Inconnu",
      };
    });
  }, [contributions]);

  // Filtrer par recherche et statut
  const filteredMembers = useMemo(() => {
    let filtered = memberContributions;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (contrib) =>
          contrib.memberFullName.toLowerCase().includes(search) ||
          contrib.displayInfo.phone?.toLowerCase().includes(search) ||
          contrib.displayInfo.email?.toLowerCase().includes(search),
      );
    }

    if (activeTab === "paid") {
      filtered = filtered.filter((c) => c.status === "PAID");
    } else if (activeTab === "pending") {
      filtered = filtered.filter(
        (c) => c.status === "PENDING" || c.status === "OVERDUE",
      );
    }

    return filtered;
  }, [memberContributions, searchTerm, activeTab]);

  // Stats
  const stats = useMemo(() => {
    const total = memberContributions.length;
    const paid = memberContributions.filter((c) => c.status === "PAID").length;
    const pending = memberContributions.filter(
      (c) => c.status === "PENDING" || c.status === "OVERDUE",
    ).length;

    return { total, paid, pending };
  }, [memberContributions]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full h-[95vh] sm:h-[90vh] p-0 flex flex-col gap-0">
        {/* ✅ Header moderne avec gradient - Responsive */}
        <div className="relative overflow-hidden bg-linear-to-br text-white">
          {/* Effet de fond */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[20px_20px]" />
          
          <DialogHeader className="relative p-4 sm:p-6 pb-4 sm:pb-5">
            {/* Titre + badges */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm shrink-0">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <DialogTitle className="text-base sm:text-xl font-bold mb-1 truncate">
                    {plan?.name}
                  </DialogTitle>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-[10px] sm:text-xs bg-white/20 border-white/30 text-white">
                      {formattedPlan?.formattedFrequency}
                    </Badge>
                    {amounts?.hasDifferentiation ? (
                      <>
                        <Badge variant="secondary" className="text-[10px] sm:text-xs bg-blue-500/20 border-blue-400/30 text-blue-100">
                          ♂ {amounts.maleAmount}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] sm:text-xs bg-pink-500/20 border-pink-400/30 text-pink-100">
                          ♀ {amounts.femaleAmount}
                        </Badge>
                      </>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] sm:text-xs bg-white/20 border-white/30 text-white">
                        {amounts?.amount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* ✅ Barre de recherche + tabs - Responsive */}
        <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2 space-y-2 sm:space-y-3 shrink-0 border-b bg-muted/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 h-9 sm:h-10 text-sm"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-8 sm:h-9">
              <TabsTrigger value="all" className="text-[10px] sm:text-xs gap-1 sm:gap-1.5 px-1 sm:px-3">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">Tous</span>
                <span className="inline xs:hidden">({stats.total})</span>
                <span className="hidden xs:inline">({stats.total})</span>
              </TabsTrigger>
              <TabsTrigger value="paid" className="text-[10px] sm:text-xs gap-1 sm:gap-1.5 px-1 sm:px-3">
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">Payés</span>
                <span className="inline xs:hidden">({stats.paid})</span>
                <span className="hidden xs:inline">({stats.paid})</span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-[10px] sm:text-xs gap-1 sm:gap-1.5 px-1 sm:px-3">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">Attente</span>
                <span className="inline xs:hidden">({stats.pending})</span>
                <span className="hidden xs:inline">({stats.pending})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* ✅ Liste scrollable - Responsive */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-3 sm:p-6 space-y-2">
              {isLoading ? (
                [...Array(8)].map((_, i) => <MemberItemSkeleton key={i} />)
              ) : filteredMembers.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground opacity-50" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {searchTerm ? "Aucun membre trouvé" : "Aucun membre"}
                  </p>
                  {searchTerm && (
                    <p className="text-xs text-muted-foreground">
                      Essayez un autre terme
                    </p>
                  )}
                </div>
              ) : (
                filteredMembers.map((contrib) => (
                  <MemberItem key={contrib.id} contribution={contrib} />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Composant membre responsive
const MemberItem = ({ contribution }) => {
  const { displayInfo, memberFullName, status, amount } = contribution;

  const statusConfig = {
    PAID: {
      icon: CheckCircle,
      label: "Payé",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200/50 dark:border-green-800/50",
    },
    PENDING: {
      icon: Clock,
      label: "En attente",
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      border: "border-orange-200/50 dark:border-orange-800/50",
    },
    OVERDUE: {
      icon: Clock,
      label: "En retard",
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200/50 dark:border-red-800/50",
    },
    CANCELLED: {
      icon: Clock,
      label: "Annulé",
      color: "text-gray-600",
      bg: "bg-gray-50 dark:bg-gray-950/30",
      border: "border-gray-200/50 dark:border-gray-800/50",
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;
  const StatusIcon = config.icon;

  const userInitials = memberFullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

  return (
    <div
      className={cn(
        "group flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border transition-all hover:shadow-md",
        status === "PAID" ? config.bg : "bg-card",
        config.border,
      )}
    >
      {/* ✅ Avatar responsive */}
      <Avatar className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 ring-2 ring-background">
        <AvatarImage src={displayInfo.avatar} />
        <AvatarFallback className="text-[10px] sm:text-xs font-semibold bg-linear-to-br from-primary/20 to-primary/10">
          {userInitials}
        </AvatarFallback>
      </Avatar>

      {/* ✅ Infos membre responsive */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
          <p className="text-xs sm:text-sm font-semibold truncate">{memberFullName}</p>
          {displayInfo.isProvisional && (
            <Badge variant="secondary" className="text-[7px] sm:text-[8px] h-3 sm:h-3.5 px-0.5 sm:px-1 bg-amber-500/10 text-amber-600 border-amber-200 shrink-0">
              <UserCircle className="w-2 h-2 mr-0.5" />
              <span className="hidden xs:inline">Prov.</span>
            </Badge>
          )}
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
          {displayInfo.phone || displayInfo.email || "-"}
        </p>
      </div>

      {/* ✅ Montant + Statut responsive */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-3 shrink-0">
        <div className="text-right">
          <p className="text-xs sm:text-sm font-bold whitespace-nowrap">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "XOF",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              notation: "compact",
              compactDisplay: "short",
            }).format(amount)}
          </p>
        </div>
        
        {/* Desktop: Badge complet */}
        <div className={cn("hidden sm:flex items-center gap-1 px-2 py-1 rounded-md", config.bg)}>
          <StatusIcon className={cn("w-3.5 h-3.5", config.color)} />
          <span className={cn("text-xs font-medium", config.color)}>
            {config.label}
          </span>
        </div>

        {/* Mobile: Icône seule */}
        <div className={cn("flex sm:hidden items-center justify-center w-6 h-6 rounded-md", config.bg)}>
          <StatusIcon className={cn("w-3.5 h-3.5", config.color)} />
        </div>
      </div>
    </div>
  );
};

const MemberItemSkeleton = () => (
  <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border bg-card">
    <Skeleton className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0" />
    <div className="flex-1 space-y-1.5">
      <Skeleton className="h-3 sm:h-3.5 w-24 sm:w-32" />
      <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-24" />
    </div>
    <Skeleton className="h-6 sm:h-8 w-16 sm:w-24 shrink-0" />
  </div>
);