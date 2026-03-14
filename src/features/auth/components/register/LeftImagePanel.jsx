// features/auth/components/register/LeftImagePanel.jsx

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Building2, Shield, Users, TrendingUp } from "lucide-react";

export const LeftImagePanel = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-[45%] relative overflow-hidden bg-linear-to-br from-orange-500 via-orange-600 to-indigo-600">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Organization Manager</h2>
              <p className="text-sm text-white/80">Pro Edition</p>
            </div>
          </div>
        </motion.div>

        {/* Center Image/Illustration */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-md">
            {/* Placeholder for your image */}
            <div className="aspect-square rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Gérez vos organisations facilement
                </h3>
                <p className="text-white/80 text-sm">
                  Une solution complète pour la gestion de vos organisations, membres et finances
                </p>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              className="absolute -top-4 -right-4 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Shield className="w-6 h-6 mb-2 text-white" />
              <p className="text-xs font-medium">100% Sécurisé</p>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <TrendingUp className="w-6 h-6 mb-2 text-white" />
              <p className="text-xs font-medium">Croissance rapide</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom features */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Sécurité avancée</h4>
              <p className="text-sm text-white/80">Vos données sont chiffrées et protégées</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Gestion collaborative</h4>
              <p className="text-sm text-white/80">Travaillez en équipe efficacement</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Analyses en temps réel</h4>
              <p className="text-sm text-white/80">Suivez vos performances instantanément</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};