/* eslint-disable no-unused-vars */
// features/auth/components/register/StepIndicator.jsx

import { motion } from "framer-motion";
import { Check, User, Mail, Lock, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_ICONS = {
  user: User,
  mail: Mail,
  lock: Lock,
  image: Image,
};

export const StepIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full">
      {/* Desktop - Full labels */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[step.icon];
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  {/* Circle */}
                  <motion.div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isCompleted && "bg-linear-to-br from-green-500 to-emerald-600 text-white shadow-sm",
                      isCurrent && "bg-linear-to-br from-orange-500 to-indigo-600 text-white shadow-sm scale-110",
                      !isCompleted && !isCurrent && "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                    )}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isCurrent ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </motion.div>

                  {/* Label */}
                  <span className={cn(
                    "text-xs font-medium text-center",
                    isCurrent && "text-orange-600 dark:text-orange-400",
                    !isCurrent && "text-slate-500 dark:text-slate-400"
                  )}>
                    {step.title}
                  </span>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 relative -mt-8">
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700" />
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-green-500 to-emerald-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile - Compact bars */}
      <div className="sm:hidden">
        <div className="flex items-center gap-2 mb-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <motion.div
                key={step.id}
                className={cn(
                  "h-1.5 rounded-full flex-1 transition-all",
                  isCompleted && "bg-linear-to-r from-green-500 to-emerald-600",
                  isCurrent && "bg-linear-to-r from-orange-500 to-indigo-600",
                  !isCompleted && !isCurrent && "bg-slate-200 dark:bg-slate-700"
                )}
                initial={{ scaleX: 0.8 }}
                animate={{ scaleX: 1 }}
              />
            );
          })}
        </div>
        <p className="text-xs text-center text-slate-600 dark:text-slate-400">
          {steps[currentStep - 1]?.title}
        </p>
      </div>
    </div>
  );
};