import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Building2, User } from "lucide-react";
import { SPACES } from "@/config/navigation.config";

export const MobileOrgHeader = ({ 
  organization, 
  user, 
  currentSpace, 
  onSpaceChange 
}) => {
  const [open, setOpen] = useState(false);

  const orgInitials = organization?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const userInitials = user?.prenom && user?.nom
    ? `${user.prenom[0]}${user.nom[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "?";

  const isPersonalSpace = currentSpace === SPACES.PERSONAL;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background lg:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo + Nom Organisation */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={organization?.logo} alt={organization?.name} />
            <AvatarFallback className="text-xs bg-primary/10">
              {orgInitials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-semibold truncate">
              {organization?.name}
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {user?.prenom} {user?.nom}
            </p>
          </div>
        </div>

        {/* Menu Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Profil */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.avatar} alt={user?.prenom} />
                  <AvatarFallback className="text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">
                    {user?.prenom} {user?.nom}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-primary mt-0.5">
                    {organization?.userRole}
                  </p>
                </div>
              </div>

              {/* Switch Espace Personnel / Gestion */}
              <div className="p-3 rounded-lg border bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="space-switch" className="text-sm">
                      Espace personnel
                    </Label>
                  </div>
                  <Switch
                    id="space-switch"
                    checked={!isPersonalSpace}
                    onCheckedChange={(checked) =>
                      onSpaceChange(checked ? SPACES.MANAGEMENT : SPACES.PERSONAL)
                    }
                  />
                </div>
                {!isPersonalSpace && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pl-6">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Mode Gestion</span>
                  </div>
                )}
              </div>

              {/* Organisation Info */}
              <div className="p-3 rounded-lg border space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Organisation actuelle
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={organization?.logo} />
                    <AvatarFallback className="text-xs">
                      {orgInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">
                      {organization?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {organization?.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};