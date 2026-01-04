import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Loader2, Eye, EyeOff, Wallet, Shield, Phone } from "lucide-react";

import { loginSchema } from "../validators/login.schema";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IMAGE_URL } from "@/shared/constants/asset.const";

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Animation values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden">
      {/* Left Section - Illustration */}
      <motion.div
        className="hidden lg:flex w-1/2 relative overflow-hidden"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={IMAGE_URL.CONNEXION}
            alt="MoneyWise Dashboard"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Right Section - Login Form */}
      <motion.div
        className="flex w-full lg:w-1/2 items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="w-full max-w-md space-y-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-center">
              <motion.div
                className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-600 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Wallet className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-purple-600">
                Content de vous revoir
              </h2>
              <p className="text-muted-foreground text-sm">
                Centralisez et gérez votre organisation en toute simplicité.{" "}
              </p>
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Phone Field */}
                <FormField
                  control={form.control}
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
                            className="h-12 pl-10 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-0 transition-all duration-300"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
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
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-0 pr-12 transition-all duration-300"
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

                {/* Remember Me & Forgot Password */}
                <motion.div
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                    />
                    <span className="text-muted-foreground">Se souvenir</span>
                  </label>
                  <motion.a
                    href="/forgot-password"
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    Mot de passe oublié ?
                  </motion.a>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition-all duration-300"
                    disabled={isPending}
                    size="lg"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connexion...
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p>
              Pas encore de compte ?{" "}
              <motion.a
                href="/register"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                whileHover={{ x: 2 }}
              >
                S'inscrire gratuitement
              </motion.a>
            </p>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Shield className="w-3 h-3 text-purple-600" />
            <span>Vos données sont sécurisées et chiffrées</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
