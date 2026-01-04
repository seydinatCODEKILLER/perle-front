import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
/**
 * Champ Email
 */
export const EmailField = ({ control }) => (
  <FormField
    control={control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              {...field}
              type="email"
              placeholder="john.doe@example.com"
              className="h-12 pl-11 rounded-xl"
            />
          </div>
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
);
