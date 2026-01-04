import { Phone } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/**
 * Champ Téléphone
 */
export const PhoneField = ({ control }) => (
  <FormField
    control={control}
    name="phone"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Téléphone</FormLabel>
        <FormControl>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              {...field}
              type="tel"
              placeholder="+221 77 123 45 67"
              className="h-12 pl-11 rounded"
            />
          </div>
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
);