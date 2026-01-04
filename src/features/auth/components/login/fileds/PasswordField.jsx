import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/**
 * Champ de saisie du mot de passe avec toggle visibilité
 */
export const PasswordField = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">
            Mot de passe
          </FormLabel>
          <FormControl>
            <motion.div className="relative">
              <Input
                placeholder="Votre mot de passe"
                type={showPassword ? "text" : "password"}
                className="h-12 rounded border-2 border-gray-200 focus:border-purple-600 focus:ring-0 pr-12 transition-all duration-300"
                {...field}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </motion.div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};