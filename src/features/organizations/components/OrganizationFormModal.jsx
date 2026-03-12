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
 * Responsive sur tous les écrans (mobile, tablette, desktop)
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
      <DialogContent 
        className="
          w-[calc(100%-2rem)] 
          max-w-[95vw] 
          sm:max-w-[90vw] 
          md:max-w-3xl 
          lg:max-w-4xl
          max-h-[90vh] 
          sm:max-h-[85vh]
          flex 
          flex-col 
          p-0 
          gap-0
          overflow-hidden
        "
      >
        {/* Header fixe - Responsive */}
        <DialogHeader className="
          px-4 
          sm:px-5 
          md:px-6 
          pt-4 
          sm:pt-5 
          md:pt-6 
          pb-3 
          sm:pb-4 
          border-b 
          shrink-0
        ">
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Icône - Cache sur très petit écran si nécessaire */}
            <div className="
              hidden 
              xs:flex
              p-2 
              sm:p-2.5 
              rounded-lg 
              bg-primary/10 
              shrink-0
            ">
              {isEditMode ? (
                <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              ) : (
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              )}
            </div>
            
            {/* Textes - Responsive */}
            <div className="flex-1 min-w-0">
              <DialogTitle className="
                text-lg 
                sm:text-xl 
                md:text-2xl 
                pr-6 
                sm:pr-8 
                line-clamp-2
              ">
                {isEditMode
                  ? `Modifier "${organization?.name}"`
                  : "Créer une nouvelle organisation"}
              </DialogTitle>
              
              <DialogDescription className="
                mt-1 
                sm:mt-1.5 
                text-xs 
                sm:text-sm 
                line-clamp-2 
                sm:line-clamp-none
              ">
                {isEditMode
                  ? "Mettez à jour les informations de votre organisation"
                  : "Remplissez les informations pour créer votre dahira, association ou tontine"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Contenu scrollable - Responsive */}
        <ScrollArea className="
          flex-1 
          overflow-y-auto 
          overscroll-contain
        ">
          <div className="
            px-4 
            sm:px-5 
            md:px-6 
            py-4 
            sm:py-5 
            md:py-6
          ">
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