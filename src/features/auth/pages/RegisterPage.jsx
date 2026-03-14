import { MultiStepRegister } from "../components/register/MultiStepRegister";

export const RegisterPage = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <MultiStepRegister />
    </div>
  );
};