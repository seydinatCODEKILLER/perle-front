/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "@/components/ui/form";
import { registerSchema } from "../../validators/register.schema";
import { useRegister } from "../../hooks/useRegister";
import { LeftImagePanel } from "./LeftImagePanel";
import { Step1Personal } from "./steps/Step1Personal";
import { Step2Contact } from "./steps/Step2Contact";
import { Step3Security } from "./steps/Step3Security";
import { Step4Avatar } from "./steps/Step4Avatar";
import { Building2 } from "lucide-react";
import { StepIndicator } from "./StepIndicator";

const STEPS = [
  { id: 1, title: "Informations personnelles", icon: "user" },
  { id: 2, title: "Contact", icon: "mail" },
  { id: 3, title: "Sécurité", icon: "lock" },
  { id: 4, title: "Photo de profil", icon: "image" },
];

export const MultiStepRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate: register, isPending } = useRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      email: "",
      phone: "",
      gender: undefined,
      password: "",
      confirmPassword: "",
      avatar: undefined,
    },
    mode: "onChange",
  });

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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
    <div className="fixed inset-0 flex overflow-hidden">
      {/* LEFT PANEL - Image (Desktop only) */}
      <LeftImagePanel />

      {/* RIGHT PANEL - Form */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 p-4 sm:p-6 lg:p-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative lg:hidden">
                <div className="absolute inset-0 bg-linear-to-br from-orange-500 to-indigo-600 rounded-xl blur opacity-50 dark:opacity-30" />
                <div className="relative p-2 bg-linear-to-br from-orange-500 to-indigo-600 rounded-xl">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Créer un compte
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Rejoignez-nous en quelques étapes
                </p>
              </div>
            </div>

            {/* Login link (mobile) */}
            <a
              href="/login"
              className="lg:hidden text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
            >
              Se connecter
            </a>
          </div>

          {/* Step indicator */}
          <div className="mt-6">
            <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />
          </div>
        </div>

        {/* Form Container - Scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="max-w-md mx-auto px-6 sm:px-8 py-8 sm:py-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <Step1Personal
                      key="step1"
                      control={form.control}
                      onNext={nextStep}
                      form={form}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2Contact
                      key="step2"
                      control={form.control}
                      onNext={nextStep}
                      onPrev={prevStep}
                      form={form}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3Security
                      key="step3"
                      control={form.control}
                      onNext={nextStep}
                      onPrev={prevStep}
                      form={form}
                    />
                  )}
                  {currentStep === 4 && (
                    <Step4Avatar
                      key="step4"
                      control={form.control}
                      onPrev={prevStep}
                      onSubmit={form.handleSubmit(onSubmit)}
                      isPending={isPending}
                      form={form}
                    />
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 p-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs sm:text-sm text-center text-slate-600 dark:text-slate-400">
            Vous avez déjà un compte ?{" "}
            <a
              href="/login"
              className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 underline underline-offset-2 transition-colors"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};