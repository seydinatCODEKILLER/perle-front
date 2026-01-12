import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { CreateOrganizationForm } from "./CreateOrganizationForm";
import { EditOrganizationForm } from "./EditOrganizationForm";
import { prepareUpdateFormData, transformOrganizationData } from "../utils/organization-data-transformer";

/**
 * Modal pour créer ou modifier une organisation
 */
export const OrganizationFormModal = ({
  open,
  onOpenChange,
  mode = "create", // "create" ou "edit"
  organization = null, // Requis pour le mode "edit"
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

  const getTitle = () => {
    return isEditMode
      ? `Modifier "${organization?.name}"`
      : "Créer une nouvelle organisation";
  };

  const getDescription = () => {
    return isEditMode
      ? "Mettez à jour les informations de votre organisation"
      : "Remplissez les informations pour créer votre dahira, association ou tontine";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{getTitle()}</DialogTitle>
              <DialogDescription className="mt-2">
                {getDescription()}
              </DialogDescription>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-2 hover:bg-accent transition-colors"
              disabled={isPending}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};
