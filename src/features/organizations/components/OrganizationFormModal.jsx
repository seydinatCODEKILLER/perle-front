import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, Edit } from "lucide-react";
import { CreateOrganizationForm } from "./CreateOrganizationForm";
import { EditOrganizationForm } from "./EditOrganizationForm";
import {
  prepareUpdateFormData,
  transformOrganizationData,
} from "../utils/organization-data-transformer";

/**
 * Modal pour créer ou modifier une organisation
 */
export const OrganizationFormModal = ({
  open,
  onOpenChange,
  mode = "create",
  organization = null,
  onCreate,
  onUpdate,
  isPending,
}) => {
  const isEditMode = mode === "edit";

  const handleCreateSubmit = (data) => {
    const formData = transformOrganizationData(data);
    onCreate(formData);
  };

  const handleUpdateSubmit = (data, existingLogo) => {
    const formData = prepareUpdateFormData(data, existingLogo);
    onUpdate({ id: organization.id, formData });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:max-w-3xl max-h-[95vh] flex flex-col p-0">
        {/* Header fixe */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start gap-3">
            {/* Icône */}
            <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
              {isEditMode ? (
                <Edit className="w-5 h-5 text-primary" />
              ) : (
                <Building2 className="w-5 h-5 text-primary" />
              )}
            </div>
            {/* Textes */}
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl pr-8">
                {isEditMode
                  ? `Modifier "${organization?.name}"`
                  : "Créer une nouvelle organisation"}
              </DialogTitle>
              <DialogDescription className="mt-1.5 text-sm">
                {isEditMode
                  ? "Mettez à jour les informations de votre organisation"
                  : "Remplissez les informations pour créer votre dahira, association ou tontine"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Contenu scrollable */}
        <ScrollArea className="flex-1 px-6 overflow-y-auto">
          <div className="py-6">
            {isEditMode ? (
              <EditOrganizationForm
                organization={organization}
                onSubmit={handleUpdateSubmit}
                isPending={isPending}
                onCancel={() => onOpenChange(false)}
              />
            ) : (
              <CreateOrganizationForm
                onSubmit={handleCreateSubmit}
                isPending={isPending}
                onCancel={() => onOpenChange(false)}
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
