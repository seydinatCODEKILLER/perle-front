import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, Upload, X, AlertCircle } from "lucide-react";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "../constants/profile.constants";

export const AvatarUploadModal = ({
  open,
  onClose,
  currentAvatar,
  onSubmit,
  isPending = false,
}) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Format non supporté. Utilisez JPG, PNG ou WEBP");
      return;
    }

    // Validation de la taille
    if (file.size > MAX_IMAGE_SIZE) {
      setError("L'image est trop volumineuse (max 5MB)");
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Créer preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  const handleClose = () => {
    setPreview(null);
    setSelectedFile(null);
    setError(null);
    onClose();
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Changer la photo de profil</DialogTitle>
              <p className="text-sm text-muted-foreground">
                JPG, PNG ou WEBP (max 5MB)
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={preview || currentAvatar} />
                <AvatarFallback className="text-2xl">?</AvatarFallback>
              </Avatar>
              {preview && (
                <button
                  onClick={handleRemovePreview}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Upload button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_IMAGE_TYPES.join(",")}
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
            >
              <Upload className="w-4 h-4 mr-2" />
              {preview ? "Choisir une autre photo" : "Choisir une photo"}
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isPending}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Upload...
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