import { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Building,
  Users,
  CreditCard,
  FileText,
  BarChart,
  Shield,
  Download,
  Upload,
  Bell,
  Lock,
  Filter,
  Eye,
  Database,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Déplacer les données en dehors du composant pour éviter les re-créations
const features = [
  {
    title: "Gestion Multi-Structures",
    description: "Gérez plusieurs dahiras, associations ou tontines depuis un seul compte. Chaque structure bénéficie d'un espace sécurisé et indépendant.",
    icon: Building,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    details: [
      "Espaces séparés par structure",
      "Permissions d'accès personnalisables",
      "Données isolées et sécurisées",
      "Basculement rapide entre structures"
    ]
  },
  {
    title: "Gestion des Membres",
    description: "Centralisez toutes les informations de vos membres avec photos, contacts et historiques complets.",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    details: [
      "Import CSV/Excel rapide",
      "Photos et profils complets",
      "Contacts multiples par membre",
      "Historique des interactions"
    ]
  },
  {
    title: "Cotisations & Dettes",
    description: "Planifiez les cotisations, suivez les paiements et gérez les dettes avec des rappels automatiques.",
    icon: CreditCard,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    details: [
      "Plans de cotisation flexibles",
      "Suivi des paiements en temps réel",
      "Rappels automatiques par SMS/Email",
      "Historique complet des transactions"
    ]
  },
  {
    title: "Transactions & Rapports",
    description: "Suivez toutes vos transactions financières et générez des rapports détaillés en un clic.",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    details: [
      "Journal des transactions complet",
      "Export PDF et Excel",
      "Rapports personnalisables",
      "Analyses par période"
    ]
  },
  {
    title: "Tableau de Bord Intelligent",
    description: "Visualisez vos chiffres clés et recevez des alertes pour une gestion proactive de votre organisation.",
    icon: BarChart,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    details: [
      "KPI personnalisables",
      "Alertes en temps réel",
      "Tendances et prévisions",
      "Widgets modulables"
    ]
  },
  {
    title: "Sécurité Maximale",
    description: "Vos données sont protégées avec le chiffrement de niveau bancaire et des sauvegardes automatiques.",
    icon: Shield,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-500",
    details: [
      "Chiffrement 256-bit",
      "Sauvegardes automatiques",
      "Conformité RGPD",
      "Contrôle d'accès granulaire"
    ]
  }
];

const additionalFeatures = [
  { icon: Upload, label: "Import CSV", color: "text-green-500" },
  { icon: Filter, label: "Filtres avancés", color: "text-purple-500" },
  { icon: Eye, label: "Vue personnalisée", color: "text-orange-500" },
  { icon: Bell, label: "Notifications", color: "text-red-500" },
];

// Composant pour les illustrations (optimisé avec memo)
const FeatureIllustration = ({ featureIndex }) => {
  const illustrations = useMemo(() => ({
    0: ( // Multi-Structures
      <div className="relative h-40 sm:h-48 rounded-xl bg-linear-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/20 p-3 sm:p-4">
        <div className="flex gap-2 mb-2 sm:mb-3">
          <div className="w-2/3 h-4 sm:h-6 bg-blue-500/30 rounded" />
          <div className="w-1/3 h-4 sm:h-6 bg-cyan-500/30 rounded" />
        </div>
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30" />
          ))}
        </div>
      </div>
    ),
    1: ( // Membres
      <div className="relative h-40 sm:h-48 rounded-xl bg-linear-to-br from-green-900/30 to-emerald-900/30 border border-green-500/20 p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500" />
          <div className="flex-1">
            <div className="w-3/4 h-2 sm:h-3 bg-green-500/40 rounded" />
            <div className="w-1/2 h-1.5 sm:h-2 mt-1 bg-green-500/20 rounded" />
          </div>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="w-2/3 h-1.5 sm:h-2 bg-green-500/30 rounded" />
              <div className="w-1/4 h-1.5 sm:h-2 bg-emerald-500/30 rounded" />
            </div>
          ))}
        </div>
      </div>
    ),
    2: ( // Cotisations
      <div className="relative h-40 sm:h-48 rounded-xl bg-linear-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 p-3 sm:p-4">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="w-1/3 h-3 sm:h-4 bg-purple-500/40 rounded" />
          <div className="w-1/4 h-4 sm:h-6 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg" />
        </div>
        <div className="space-y-2 sm:space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-purple-500/30" />
                <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-purple-500/30 rounded" />
              </div>
              <div className="w-10 sm:w-12 h-2 sm:h-3 bg-pink-500/30 rounded" />
            </div>
          ))}
        </div>
      </div>
    ),
    3: ( // Transactions
      <div className="relative h-40 sm:h-48 rounded-xl bg-linear-to-br from-orange-900/30 to-red-900/30 border border-orange-500/20 p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
            <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-orange-500/40 rounded" />
          </div>
          <Download className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-1.5 sm:h-2 bg-linear-to-r from-orange-500/20 to-red-500/20 rounded" />
          ))}
        </div>
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1">
          <div className="w-4 h-6 sm:w-6 sm:h-8 bg-linear-to-b from-orange-500 to-red-500 rounded-sm" />
          <div className="w-4 h-5 sm:w-6 sm:h-6 bg-linear-to-b from-orange-500 to-red-500 rounded-sm" />
        </div>
      </div>
    ),
    4: ( // Dashboard
      <div className="relative h-40 sm:h-48 rounded-xl bg-linear-to-br from-indigo-900/30 to-blue-900/30 border border-indigo-500/20 p-3 sm:p-4">
        <div className="flex justify-between mb-2 sm:mb-3">
          <div className="w-1/4 h-3 sm:h-4 bg-indigo-500/40 rounded" />
          <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
        </div>
        <div className="flex items-end gap-0.5 sm:gap-1 h-16 sm:h-20">
          {[40, 60, 80, 65, 90, 75, 85].map((h, i) => (
            <div key={i} className="flex-1" style={{ height: `${h}%` }}>
              <div className="h-full bg-linear-to-t from-indigo-500 to-blue-500 rounded-t" />
            </div>
          ))}
        </div>
      </div>
    ),
    5: ( // Sécurité
      <div className="relative h-40 sm:h-48 rounded-xl bg-linear-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 p-3 sm:p-4">
        <div className="flex flex-col items-center justify-center h-full">
          <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mb-2 sm:mb-3" />
          <div className="w-3/4 h-1.5 sm:h-2 bg-cyan-500/40 rounded mb-1" />
          <div className="w-1/2 h-1.5 sm:h-2 bg-cyan-500/20 rounded" />
          <div className="absolute bottom-3 sm:bottom-4 left-4 right-4 flex justify-center gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-1 h-1 bg-cyan-400 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }), []);

  return illustrations[featureIndex] || null;
};

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const currentFeature = features[selectedFeature];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-3 sm:mb-4">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Tout ce dont vous avez besoin
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            <span className="block text-foreground">Fonctionnalités</span>
            <span className="block bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              conçues pour vous
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Une suite complète d'outils pour gérer efficacement votre organisation, 
            des membres aux finances, en passant par la sécurité et les rapports.
          </p>
        </motion.div>

        {/* Desktop Tabs Navigation */}
        <div className="hidden lg:block mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.title}
                  onClick={() => setSelectedFeature(index)}
                  className={cn(
                    "flex items-center gap-3 px-4 xl:px-6 py-3 xl:py-4 rounded-xl border transition-all duration-300",
                    selectedFeature === index
                      ? "border-blue-500/50 bg-linear-to-r from-blue-500/5 to-indigo-500/5 shadow-lg"
                      : "border-border hover:border-blue-500/30 hover:bg-accent/50"
                  )}
                >
                  <div className={cn(
                    "p-2 xl:p-3 rounded-lg transition-colors",
                    selectedFeature === index 
                      ? "bg-linear-to-r from-blue-500/20 to-indigo-500/20" 
                      : "bg-accent"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4 xl:w-5 xl:h-5",
                      selectedFeature === index 
                        ? "text-blue-400" 
                        : "text-muted-foreground"
                    )} />
                  </div>
                  <span className={cn(
                    "font-medium text-sm xl:text-base",
                    selectedFeature === index 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  )}>
                    {feature.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedFeature((prev) => (prev > 0 ? prev - 1 : features.length - 1))}
              className="p-2 rounded-lg hover:bg-accent"
              aria-label="Fonctionnalité précédente"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="text-center flex-1 px-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">
                {currentFeature.title}
              </h3>
              <div className="flex justify-center gap-1.5 sm:gap-2 mt-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFeature(index)}
                    className={cn(
                      "h-1.5 sm:h-2 rounded-full transition-all",
                      selectedFeature === index 
                        ? "bg-linear-to-r from-blue-500 to-indigo-500 w-4 sm:w-6" 
                        : "bg-muted-foreground/30 w-1.5 sm:w-2"
                    )}
                    aria-label={`Aller à ${features[index].title}`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setSelectedFeature((prev) => (prev < features.length - 1 ? prev + 1 : 0))}
              className="p-2 rounded-lg hover:bg-accent"
              aria-label="Fonctionnalité suivante"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Feature Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative order-2 lg:order-1"
          >
            <FeatureIllustration featureIndex={selectedFeature} />
            
            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 text-white text-xs sm:text-sm font-medium shadow-lg"
            >
              {currentFeature.title.split(" ")[0]}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-background border border-border shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Database className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm font-medium text-foreground">Live Data</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            key={`content-${selectedFeature}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-start gap-3 mb-6">
              <div className={cn("p-2 sm:p-3 rounded-xl", currentFeature.bgColor)}>
                <currentFeature.icon className={cn("w-6 h-6 sm:w-8 sm:h-8", currentFeature.textColor)} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {currentFeature.title}
                </h3>
                <div className={`w-12 sm:w-16 h-0.5 sm:h-1 bg-linear-to-r ${currentFeature.color} rounded-full`} />
              </div>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              {currentFeature.description}
            </p>

            {/* Feature Details List */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
              {currentFeature.details.map((detail, index) => (
                <motion.div
                  key={detail}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <div className={`p-0.5 sm:p-1 rounded-full ${currentFeature.bgColor} mt-0.5 sm:mt-1 shrink-0`}>
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground">{detail}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional Features Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
              {additionalFeatures.map((item) => (
                <div key={item.label} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-accent/50 border border-border">
                  <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color} shrink-0`} />
                  <span className="text-xs sm:text-sm font-medium text-foreground truncate">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
                Essayer gratuitement
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="outline" className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
                Voir la démo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* All Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-10 text-foreground px-4">
            Découvrez toutes nos fonctionnalités
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative p-4 sm:p-6 rounded-2xl border border-border bg-card hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className={`p-2 sm:p-3 rounded-xl ${feature.bgColor} w-fit mb-3 sm:mb-4`}>
                      <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6", feature.textColor)} />
                    </div>
                    
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                      {feature.title}
                    </h4>
                    
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`w-10 sm:w-12 h-0.5 sm:h-1 bg-linear-to-r ${feature.color} rounded-full`} />
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;