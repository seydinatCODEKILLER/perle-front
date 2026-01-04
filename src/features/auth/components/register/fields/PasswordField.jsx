import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
 * Calculer la force du mot de passe
 */
const calculatePasswordStrength = (password) => {
  if (!password) return { level: 0, text: "", color: "" };

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = [
    { level: 0, text: "Très faible", color: "bg-red-500" },
    { level: 1, text: "Faible", color: "bg-orange-500" },
    { level: 2, text: "Moyen", color: "bg-yellow-500" },
    { level: 3, text: "Bon", color: "bg-blue-500" },
    { level: 4, text: "Fort", color: "bg-green-500" },
    { level: 5, text: "Excellent", color: "bg-green-600" },
  ];

  return levels[strength];
};

/**
 * Composant de champ mot de passe avec indicateur de force
 */
export const PasswordField = ({ control, name, label, placeholder, showStrength = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const strength = showStrength ? calculatePasswordStrength(field.value) : null;

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="h-12 pr-12 rounded-xl"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                {showStrength && strength && field.value && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            level <= strength.level
                              ? strength.color
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Force: {strength.text}
                    </p>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        );
      }}
    />
  );
};