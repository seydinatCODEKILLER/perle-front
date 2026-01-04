import { Phone } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/**
 * Champ de saisie du numéro de téléphone
 */
export const PhoneField = ({ control }) => (
  <FormField
    control={control}
    name="phone"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium">
          Numéro de téléphone
        </FormLabel>
        <FormControl>
          <motion.div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="+221 77 123 45 67"
              type="tel"
              className="h-12 pl-10 rounded border-2 border-gray-200 focus:border-purple-600 focus:ring-0 transition-all duration-300"
              {...field}
            />
          </motion.div>
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
);