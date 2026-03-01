// components/form/GenderField.jsx (version compacte)

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mars, Venus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const GenderField = ({ control }) => (
  <FormField
    control={control}
    name="gender"
    render={({ field }) => (
      <FormItem className="space-y-3">
        <FormLabel className="text-sm font-medium">Genre</FormLabel>

        <FormControl>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="grid grid-cols-2 gap-3"
          >
            {/* MALE */}
            <motion.label
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all",
                field.value === "MALE"
                  ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/20"
                  : "border-border/50 bg-card/50 hover:border-blue-500/30 hover:bg-blue-500/5"
              )}
            >
              <RadioGroupItem value="MALE" className="sr-only" />
              
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                field.value === "MALE"
                  ? "bg-blue-500"
                  : "bg-blue-500/10"
              )}>
                <Mars className={cn(
                  "h-5 w-5 transition-colors",
                  field.value === "MALE" ? "text-white" : "text-blue-500"
                )} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  field.value === "MALE"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-foreground"
                )}>
                  Homme
                </span>
              </div>

              {/* Check indicator */}
              {field.value === "MALE" && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.label>

            {/* FEMALE */}
            <motion.label
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all",
                field.value === "FEMALE"
                  ? "border-pink-500 bg-pink-500/10 dark:bg-pink-500/20"
                  : "border-border/50 bg-card/50 hover:border-pink-500/30 hover:bg-pink-500/5"
              )}
            >
              <RadioGroupItem value="FEMALE" className="sr-only" />
              
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                field.value === "FEMALE"
                  ? "bg-pink-500"
                  : "bg-pink-500/10"
              )}>
                <Venus className={cn(
                  "h-5 w-5 transition-colors",
                  field.value === "FEMALE" ? "text-white" : "text-pink-500"
                )} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  field.value === "FEMALE"
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-foreground"
                )}>
                  Femme
                </span>
              </div>

              {/* Check indicator */}
              {field.value === "FEMALE" && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.label>
          </RadioGroup>
        </FormControl>

        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
);