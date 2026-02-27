import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Settings } from "lucide-react";
import { useUpdateOrganizationSettings } from "../hooks/useOrganizationSettings";
import { organizationSettingsSchema } from "../validations/organization-settings.schema";
import { PaymentSettings } from "../components/PaymentSettings";
import { ReminderSettings } from "../components/ReminderSettings";
import { NotificationSettings } from "../components/NotificationSettings";
import { SecuritySettings } from "../components/SecuritySettings";
import { useOrganization } from "@/features/organizations/hooks/useOrganizations";
import { PageWithBackButton } from "@/components/layout/PageWithBackButton";

export const OrganizationSettingsPage = () => {
  const { organizationId } = useParams();
  const navigate = useNavigate();

  const { data: organization, isLoading } = useOrganization(organizationId);
  const updateMutation = useUpdateOrganizationSettings();

  const form = useForm({
    resolver: zodResolver(organizationSettingsSchema),
    defaultValues: {
      allowPartialPayments: true,
      autoReminders: true,
      reminderDays: [1, 3, 7],
      emailNotifications: true,
      smsNotifications: false,
      whatsappNotifications: false,
      sessionTimeout: 60,
    },
  });

  useEffect(() => {
    if (organization?.settings) {
      form.reset({
        allowPartialPayments:
          organization.settings.allowPartialPayments ?? true,
        autoReminders: organization.settings.autoReminders ?? true,
        reminderDays: organization.settings.reminderDays ?? [1, 3, 7],
        emailNotifications: organization.settings.emailNotifications ?? true,
        smsNotifications: organization.settings.smsNotifications ?? false,
        whatsappNotifications:
          organization.settings.whatsappNotifications ?? false,
        sessionTimeout: organization.settings.sessionTimeout ?? 60,
      });
    }
  }, [organization, form]);

  const handleSubmit = (data) => {
    updateMutation.mutate({
      organizationId,
      settingsData: data,
    });
  };

  const hasChanges = form.formState.isDirty;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Paramètres"
          description="Configuration de l'organisation"
        />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="space-y-6">
        <PageHeader title="Paramètres" />
        <Card>
          <CardContent className="py-12 text-center">
            <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">
              Organisation introuvable
            </h3>
            <p className="text-muted-foreground mb-4">
              Cette organisation n'existe pas ou vous n'y avez pas accès
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <PageWithBackButton backTo={`/organizations/${organizationId}/dashboard`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <PageHeader
            title="Paramètres de l'organisation"
            description={organization.name}
          />
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
        {/* Formulaire */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Paiements */}
            <PaymentSettings form={form} />

            {/* Rappels */}
            <ReminderSettings form={form} />

            {/* Notifications */}
            {/* <NotificationSettings form={form} /> */}

            {/* Sécurité */}
            <SecuritySettings form={form} />

            {/* Boutons d'action */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={!hasChanges || updateMutation.isPending}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={!hasChanges || updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageWithBackButton>
  );
};
