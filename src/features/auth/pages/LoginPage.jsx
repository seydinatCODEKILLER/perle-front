import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useLogin } from "../hooks/useLogin";
import { useParallaxEffect } from "../components/login/hooks/useParallaxEffect";
import { loginSchema } from "../validators/login.schema";
import { LoginFormPanel } from "../components/login/LoginFormPanel";
import { LoginIllustration } from "../components/login/LoginIllustration";

/**
 * Formulaire de connexion principal
 */
export const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } =
    useParallaxEffect();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden">
      {/* Left Panel - Illustration */}
      <LoginIllustration rotateX={rotateX} rotateY={rotateY} />

      {/* Right Panel - Form */}
      <LoginFormPanel
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};
