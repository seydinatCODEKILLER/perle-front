import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/**
 * Champs Nom & Prénom
 */
export const NameFields = ({ control }) => (
  <div className="grid grid-cols-2 gap-4">
    <FormField
      control={control}
      name="prenom"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Prénom</FormLabel>
          <FormControl>
            <Input {...field} placeholder="John" className="h-12 rounded-xl" />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="nom"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Doe" className="h-12 rounded-xl" />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  </div>
);