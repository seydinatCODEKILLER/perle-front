// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { LoginHeader } from "./LoginHeader";
import { PhoneField } from "./fileds/PhoneField";
import { PasswordField } from "./fileds/PasswordField";
import { RememberMeSection } from "./ui/RememberMeSection";
import { LoginButton } from "./ui/LoginButton";
import { RegisterLink } from "./ui/RegisterLink";
import { SecurityNotice } from "./ui/SecurityNotice";
import { Form } from "@/components/ui/form";
/**
 * Panneau du formulaire de connexion
 */
export const LoginFormPanel = ({
  form,
  onSubmit,
  isPending,
  onMouseMove,
  onMouseLeave,
}) => (
  <motion.div
    className="flex w-full lg:w-1/2 items-center justify-center p-4 md:p-8"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
  >
    <motion.div
      className="w-full max-w-md space-y-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {/* Header */}
      <LoginHeader />

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone Field */}
            <PhoneField control={form.control} />

            {/* Password Field */}
            <PasswordField control={form.control} />

            {/* Remember Me Section */}
            {/* <RememberMeSection /> */}

            {/* Submit Button */}
            <LoginButton isPending={isPending} />
          </form>
        </Form>
      </motion.div>

      {/* Register Link */}
      <RegisterLink />

      {/* Security Notice */}
      <SecurityNotice />
    </motion.div>
  </motion.div>
);
