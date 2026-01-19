import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateMemberSchema, updateMemberRoleSchema, updateMemberStatusSchema } from "../validators/member.schema";
import { MEMBER_ROLE_OPTIONS, MEMBER_STATUS_OPTIONS } from "../constants/member.constants";
import { formatRole, formatStatus } from "../utils/member-helpers";
import { User, Shield, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export const EditMemberModal = ({
  open,
  onClose,
  member,
  onUpdateRole,
  onUpdateStatus,
  onUpdateMember,
  isUpdatingRole = false,
  isUpdatingStatus = false,
  isUpdatingMember = false,
}) => {
  const [activeTab, setActiveTab] = useState("role");

  const roleForm = useForm({
    resolver: zodResolver(updateMemberRoleSchema),
    defaultValues: {
      role: member?.role || "MEMBER",
    },
  });

  const statusForm = useForm({
    resolver: zodResolver(updateMemberStatusSchema),
    defaultValues: {
      status: member?.status || "ACTIVE",
    },
  });

  const memberForm = useForm({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      role: member?.role || "MEMBER",
      memberNumber: member?.memberNumber || "",
    },
  });

  const handleRoleSubmit = (data) => {
    if (member && onUpdateRole) {
      onUpdateRole({
        membershipId: member.id,
        role: data.role,
      });
    }
  };

  const handleStatusSubmit = (data) => {
    if (member && onUpdateStatus) {
      onUpdateStatus({
        membershipId: member.id,
        status: data.status,
      });
    }
  };

  const handleMemberSubmit = (data) => {
    if (member && onUpdateMember) {
      onUpdateMember({
        membershipId: member.id,
        updateData: data,
      });
    }
  };

  const isUpdating = isUpdatingRole || isUpdatingStatus || isUpdatingMember;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Modifier le membre</DialogTitle>
              <DialogDescription>
                {member?.user?.prenom} {member?.user?.nom}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="role">
              <Shield className="w-4 h-4 mr-2" />
              Rôle
            </TabsTrigger>
            <TabsTrigger value="status">
              <Activity className="w-4 h-4 mr-2" />
              Statut
            </TabsTrigger>
            <TabsTrigger value="member">
              <User className="w-4 h-4 mr-2" />
              Membre
            </TabsTrigger>
          </TabsList>

          {/* Onglet Rôle */}
          <TabsContent value="role" className="space-y-4 pt-4">
            <Form {...roleForm}>
              <form onSubmit={roleForm.handleSubmit(handleRoleSubmit)} className="space-y-4">
                <FormField
                  control={roleForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rôle du membre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un rôle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MEMBER_ROLE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex flex-col">
                                <span>{option.label}</span>
                                <span className="text-xs text-muted-foreground">
                                  {option.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground mt-2">
                        Rôle actuel : <span className="font-medium">{formatRole(member?.role)}</span>
                      </p>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </TabsContent>

          {/* Onglet Statut */}
          <TabsContent value="status" className="space-y-4 pt-4">
            <Form {...statusForm}>
              <form onSubmit={statusForm.handleSubmit(handleStatusSubmit)} className="space-y-4">
                <FormField
                  control={statusForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut du membre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MEMBER_STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  option.value === "ACTIVE" ? "bg-green-500" :
                                  option.value === "INACTIVE" ? "bg-yellow-500" :
                                  "bg-red-500"
                                }`} />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground mt-2">
                        Statut actuel : <span className="font-medium">{formatStatus(member?.status)}</span>
                      </p>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </TabsContent>

          {/* Onglet Membre */}
          <TabsContent value="member" className="space-y-4 pt-4">
            <Form {...memberForm}>
              <form onSubmit={memberForm.handleSubmit(handleMemberSubmit)} className="space-y-4">
                <FormField
                  control={memberForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rôle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un rôle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MEMBER_ROLE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={memberForm.control}
                  name="memberNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de membre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: MBR001" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isUpdating}>
            Annuler
          </Button>
          
          <Button
            onClick={() => {
              if (activeTab === "role") roleForm.handleSubmit(handleRoleSubmit)();
              if (activeTab === "status") statusForm.handleSubmit(handleStatusSubmit)();
              if (activeTab === "member") memberForm.handleSubmit(handleMemberSubmit)();
            }}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Mise à jour...
              </>
            ) : (
              "Enregistrer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};