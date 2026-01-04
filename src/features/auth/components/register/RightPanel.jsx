// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FormHeader } from "./ui/FormHeader";
import { NameFields } from "./fields/NameFields";
import { EmailField } from "./fields/EmailField";
import { PhoneField } from "./fields/PhoneField";
import { PasswordField } from "./fields/PasswordField";
import { SubmitButton } from "./ui/SubmitButton";
import { SecurityNotice } from "./ui/SecurityNotice";
import { LoginLink } from "./ui/LoginLink";
import { Form } from "@/components/ui/form";

/**
 * Panneau droit - Formulaire
 */
export const RightPanel = ({ form, onSubmit, isPending }) => (
  <motion.div
    className="flex items-center justify-center p-6 lg:p-8 bg-background"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="w-full max-w-md">
      {/* Header */}
      {/* <FormHeader /> */}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <NameFields control={form.control} />
          <EmailField control={form.control} />
          <PhoneField control={form.control} />
          <PasswordField
            control={form.control}
            name="password"
            label="Mot de passe"
            placeholder="••••••••"
            showStrength={true}
          />
          <PasswordField
            control={form.control}
            name="confirmPassword"
            label="Confirmer le mot de passe"
            placeholder="••••••••"
          />
          <SubmitButton isPending={isPending} />
          <SecurityNotice />
          <LoginLink />
        </form>
      </Form>
    </div>
  </motion.div>
);