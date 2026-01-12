import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { CreateOrganizationForm } from "./CreateOrganizationForm";
import { transformOrganizationData } from "../utils/organization-data-transformer";

/**
 * Modal de création d'organisation
 */
export const OrganizationFormModal = ({
  open,
  onOpenChange,
  onCreate,
  isPending,
}) => {
  const handleSubmit = (data) => {
    const formData = transformOrganizationData(data);
    console.log(data);
    onCreate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">
                Créer une nouvelle organisation
              </DialogTitle>
              <DialogDescription className="mt-2">
                Remplissez les informations pour créer votre dahira, association
                ou tontine
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <CreateOrganizationForm
          onSubmit={handleSubmit}
          isPending={isPending}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
