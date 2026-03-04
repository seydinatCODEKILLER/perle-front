import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Search, User, UserCircle } from "lucide-react";
import { createDebtSchema } from "../validators/debt.schema";
import { useOrganizationMembers } from "@/features/members/hooks/useMembers";
import { cn } from "@/lib/utils";

export const CreateDebtModal = ({
  open,
  onClose,
  organizationId,
  onSubmit,
  isPending = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  const { data: membersData, isLoading } = useOrganizationMembers(
    organizationId,
    {
      status: "ACTIVE",
      limit: 1000,
    },
  );

  const members = useMemo(() => membersData?.members || [], [membersData]);

  // ✅ Filtrer les membres selon la recherche
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return members.slice(0, 2);

    const search = searchTerm.toLowerCase();
    return members.filter((member) => {
      const displayInfo = member.displayInfo || {
        firstName: member.user?.prenom,
        lastName: member.user?.nom,
        phone: member.user?.phone,
        email: member.user?.email,
      };

      const fullName =
        `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.toLowerCase();
      const phone = displayInfo.phone || "";
      const email = displayInfo.email || "";

      return (
        fullName.includes(search) ||
        phone.includes(search) ||
        email.includes(search) ||
        member.memberNumber?.toLowerCase().includes(search)
      );
    });
  }, [members, searchTerm]);

  const form = useForm({
    resolver: zodResolver(createDebtSchema),
    defaultValues: {
      membershipId: "",
      title: "",
      description: "",
      initialAmount: 0,
      dueDate: "",
    },
  });

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  const handleClose = () => {
    form.reset();
    setSearchTerm("");
    setSelectedMember(null);
    onClose();
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    form.setValue("membershipId", member.id);
    form.clearErrors("membershipId");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <DialogTitle>Créer une dette</DialogTitle>
              <DialogDescription>
                Enregistrer une nouvelle dette pour un membre
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* ✅ Sélection du membre avec recherche */}
            <FormField
              control={form.control}
              name="membershipId"
              // eslint-disable-next-line no-unused-vars
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membre *</FormLabel>

                  {/* Membre sélectionné */}
                  {selectedMember ? (
                    <div className="rounded-lg border p-3 bg-muted/30">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={
                                selectedMember.displayInfo?.avatar ||
                                selectedMember.user?.avatar
                              }
                            />
                            <AvatarFallback className="text-sm">
                              {(() => {
                                const displayInfo = selectedMember.displayInfo || {
                                  firstName: selectedMember.user?.prenom,
                                  lastName: selectedMember.user?.nom,
                                };
                                const name = `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`;
                                return (
                                  name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2) || "??"
                                );
                              })()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium truncate">
                                {(() => {
                                  const displayInfo = selectedMember.displayInfo || {
                                    firstName: selectedMember.user?.prenom,
                                    lastName: selectedMember.user?.nom,
                                  };
                                  return `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() || "Inconnu";
                                })()}
                              </p>
                              {selectedMember.displayInfo?.isProvisional && (
                                <Badge
                                  variant="secondary"
                                  className="text-[9px] h-4 px-1 bg-amber-500/10 text-amber-600 shrink-0"
                                >
                                  <UserCircle className="w-2.5 h-2.5 mr-0.5" />
                                  Provisoire
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {selectedMember.displayInfo?.phone ||
                                selectedMember.user?.phone ||
                                "-"}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedMember(null);
                            form.setValue("membershipId", "");
                          }}
                        >
                          Changer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Barre de recherche */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Rechercher par nom, email ou téléphone..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>

                      {/* ✅ Liste limitée des membres */}
                      <div className="space-y-2">
                        {isLoading ? (
                          // Skeleton - 2 items
                          [...Array(2)].map((_, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-lg border"
                            >
                              <Skeleton className="w-10 h-10 rounded-full" />
                              <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                              </div>
                              <Skeleton className="h-6 w-16" />
                            </div>
                          ))
                        ) : filteredMembers.length === 0 ? (
                          <div className="text-center py-6 text-muted-foreground border rounded-lg">
                            <User className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">
                              {searchTerm
                                ? "Aucun membre trouvé"
                                : "Aucun membre actif"}
                            </p>
                          </div>
                        ) : (
                          <>
                            {filteredMembers.map((member) => {
                              const displayInfo = member.displayInfo || {
                                firstName: member.user?.prenom,
                                lastName: member.user?.nom,
                                phone: member.user?.phone,
                                email: member.user?.email,
                                avatar: member.user?.avatar,
                                isProvisional: !member.userId,
                              };

                              const displayName =
                                `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() ||
                                "Inconnu";
                              const displayContact =
                                displayInfo.email ||
                                displayInfo.phone ||
                                "Pas de contact";

                              const userInitials = displayName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2) || "??";

                              return (
                                <button
                                  key={member.id}
                                  type="button"
                                  onClick={() => handleSelectMember(member)}
                                  className={cn(
                                    "w-full p-3 rounded-lg border transition-all text-left",
                                    "hover:border-primary/50 hover:bg-accent",
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10">
                                      <AvatarImage src={displayInfo.avatar} />
                                      <AvatarFallback className="text-sm">
                                        {userInitials}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <p className="text-sm font-medium truncate">
                                          {displayName}
                                        </p>
                                        {displayInfo.isProvisional && (
                                          <Badge
                                            variant="secondary"
                                            className="text-[9px] h-4 px-1 bg-amber-500/10 text-amber-600 shrink-0"
                                          >
                                            <UserCircle className="w-2.5 h-2.5 mr-0.5" />
                                            Provisoire
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-xs text-muted-foreground truncate">
                                        {displayContact}
                                      </p>
                                    </div>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs shrink-0"
                                    >
                                      {member.role}
                                    </Badge>
                                  </div>
                                </button>
                              );
                            })}

                            {/* ✅ Indicateur s'il y a plus de résultats */}
                            {!searchTerm && members.length > 2 && (
                              <p className="text-xs text-center text-muted-foreground py-2">
                                {members.length - 2} autre{members.length - 2 > 1 ? 's' : ''} membre{members.length - 2 > 1 ? 's' : ''} disponible{members.length - 2 > 1 ? 's' : ''}. Utilisez la recherche pour les trouver.
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Titre */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Prêt personnel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Détails de la dette..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Montant */}
            <FormField
              control={form.control}
              name="initialAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant (FCFA) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 50000"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date d'échéance */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'échéance (optionnelle)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                type="button"
                onClick={handleClose}
                disabled={isPending}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isPending || !selectedMember}>
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Création...
                  </>
                ) : (
                  "Créer la dette"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};