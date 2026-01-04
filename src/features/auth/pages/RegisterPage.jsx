/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRegister } from "../hooks/useRegister";
import { registerSchema } from "../validators/register.schema";
import { LeftPanel } from "../components/register/LeftPanel";
import { RightPanel } from "../components/register/RightPanel";
import { useAvatarUpload } from "../components/register/hooks/useAvatarUpload";

export const RegisterPage = () => {
  const { mutate: register, isPending } = useRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
    },
  });

  const { preview, handleUpload } = useAvatarUpload(form);

  const onSubmit = (values) => {
    const avatarFile =
      values.avatar instanceof FileList ? values.avatar[0] : undefined;
    const { confirmPassword, ...registerData } = values;

    register({
      ...registerData,
      avatar: avatarFile,
    });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT PANEL - Avatar & Features */}
      <LeftPanel preview={preview} onUpload={handleUpload} />

      {/* RIGHT PANEL - Form */}
      <RightPanel form={form} onSubmit={onSubmit} isPending={isPending} />
    </div>
  );
};
