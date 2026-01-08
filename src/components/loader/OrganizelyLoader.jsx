/* eslint-disable no-unused-vars */
import { Building } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const OrganizelyLoader = ({
  size = "lg",
  showText = true,
  fullScreen = false,
  className
}) => {
  const sizeClasses = {
    sm: {
      container: "w-16 h-16",
      icon: "w-8 h-8",
      text: "text-sm"
    },
    md: {
      container: "w-24 h-24",
      icon: "w-12 h-12",
      text: "text-base"
    },
    lg: {
      container: "w-32 h-32",
      icon: "w-16 h-16",
      text: "text-lg"
    },
    xl: {
      container: "w-48 h-48",
      icon: "w-24 h-24",
      text: "text-xl"
    }
  };

  const { container, icon, text } = sizeClasses[size];

  const loaderContent = (
    <div className="flex flex-col items-center justify-center">
      {/* Container principal du loader */}
      <div className={cn("relative", container, className)}>
        {/* Fond de particules animées */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Anneau extérieur */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500/20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Anneau intermédiaire */}
        <motion.div
          className="absolute inset-2 rounded-full border border-indigo-500/30"
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Points orbitaux */}
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [
                Math.cos((index * Math.PI) / 4) * 44,
                Math.cos((index * Math.PI) / 4 + Math.PI) * 44,
                Math.cos((index * Math.PI) / 4) * 44
              ],
              y: [
                Math.sin((index * Math.PI) / 4) * 44,
                Math.sin((index * Math.PI) / 4 + Math.PI) * 44,
                Math.sin((index * Math.PI) / 4) * 44
              ],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Logo central avec animation de pulsation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Logo principal */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
              <Building className="w-10 h-10 text-white" />
            </div>

            {/* Points internes */}
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={`inner-${index}`}
                className="absolute w-1 h-1 rounded-full bg-white/80"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  x: Math.cos((index * Math.PI) / 2) * 8,
                  y: Math.sin((index * Math.PI) / 2) * 8,
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Éclats de lumière */}
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={`spark-${index}`}
            className="absolute w-1 h-8 bg-gradient-to-b from-blue-400/0 via-blue-400 to-blue-400/0"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${index * 90}deg)`,
              transformOrigin: "center bottom"
            }}
            animate={{
              scaleY: [0.5, 1.2, 0.5],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Texte avec animation */}
      {showText && (
        <motion.div
          className={cn("mt-8 flex flex-col items-center gap-2", text)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-1">
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Organizely
            </span>
            <DotsAnimation />
          </div>
          <p className="text-muted-foreground text-sm">Chargement en cours</p>
        </motion.div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

const DotsAnimation = () => (
  <div className="flex gap-0.5">
    {[0, 1, 2].map((dot) => (
      <motion.span
        key={dot}
        animate={{
          opacity: [0.3, 1, 0.3],
          y: [0, -2, 0]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: dot * 0.2,
          ease: "easeInOut"
        }}
        className="text-blue-400"
      >
        .
      </motion.span>
    ))}
  </div>
);

// Version simple pour les cas légers
export const SimpleOrganizelyLoader = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-500/30 border-t-blue-500"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
        <Building className="w-1/2 h-1/2 text-white" />
      </div>
    </div>
  );
};