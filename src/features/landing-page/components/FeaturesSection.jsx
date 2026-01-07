import { useState } from "react";
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

const features = [
  {
    title: "Gestion Multi-Structures",
    description: "Gérez plusieurs dahiras, associations ou tontines depuis un seul compte. Chaque structure bénéficie d'un espace sécurisé et indépendant.",
    icon: Building,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    details: [
      "Espaces séparés par structure",
      "Permissions d'accès personnalisables",
      "Données isolées et sécurisées",
      "Basculement rapide entre structures"
    ],
    image: (
      <div className="relative h-48 rounded-xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/20 p-4">
        <div className="flex gap-2 mb-3">
          <div className="w-2/3 h-6 bg-blue-500/30 rounded" />
          <div className="w-1/3 h-6 bg-cyan-500/30 rounded" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30" />
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Gestion des Membres",
    description: "Centralisez toutes les informations de vos membres avec photos, contacts et historiques complets.",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    details: [
      "Import CSV/Excel rapide",
      "Photos et profils complets",
      "Contacts multiples par membre",
      "Historique des interactions"
    ],
    image: (
      <div className="relative h-48 rounded-xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/20 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
          <div className="flex-1">
            <div className="w-3/4 h-3 bg-green-500/40 rounded" />
            <div className="w-1/2 h-2 mt-1 bg-green-500/20 rounded" />
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="w-2/3 h-2 bg-green-500/30 rounded" />
              <div className="w-1/4 h-2 bg-emerald-500/30 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Cotisations & Dettes",
    description: "Planifiez les cotisations, suivez les paiements et gérez les dettes avec des rappels automatiques.",
    icon: CreditCard,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    details: [
      "Plans de cotisation flexibles",
      "Suivi des paiements en temps réel",
      "Rappels automatiques par SMS/Email",
      "Historique complet des transactions"
    ],
    image: (
      <div className="relative h-48 rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/3 h-4 bg-purple-500/40 rounded" />
          <div className="w-1/4 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/30" />
                <div className="w-20 h-2 bg-purple-500/30 rounded" />
              </div>
              <div className="w-12 h-3 bg-pink-500/30 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Transactions & Rapports",
    description: "Suivez toutes vos transactions financières et générez des rapports détaillés en un clic.",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    details: [
      "Journal des transactions complet",
      "Export PDF et Excel",
      "Rapports personnalisables",
      "Analyses par période"
    ],
    image: (
      <div className="relative h-48 rounded-xl bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-400" />
            <div className="w-16 h-2 bg-orange-500/40 rounded" />
          </div>
          <Download className="w-4 h-4 text-orange-400" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded" />
          ))}
        </div>
        <div className="absolute bottom-4 right-4 flex gap-1">
          <div className="w-6 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-sm" />
          <div className="w-6 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-sm" />
        </div>
      </div>
    )
  },
  {
    title: "Tableau de Bord Intelligent",
    description: "Visualisez vos chiffres clés et recevez des alertes pour une gestion proactive de votre organisation.",
    icon: BarChart,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-500/10",
    details: [
      "KPI personnalisables",
      "Alertes en temps réel",
      "Tendances et prévisions",
      "Widgets modulables"
    ],
    image: (
      <div className="relative h-48 rounded-xl bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-indigo-500/20 p-4">
        <div className="flex justify-between mb-3">
          <div className="w-1/4 h-4 bg-indigo-500/40 rounded" />
          <Bell className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex items-end gap-1 h-20">
          {[40, 60, 80, 65, 90, 75, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ height: `${h}%` }}
            >
              <div className="h-full bg-gradient-to-t from-indigo-500 to-blue-500 rounded-t" />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Sécurité Maximale",
    description: "Vos données sont protégées avec le chiffrement de niveau bancaire et des sauvegardes automatiques.",
    icon: Shield,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    details: [
      "Chiffrement 256-bit",
      "Sauvegardes automatiques",
      "Conformité RGPD",
      "Contrôle d'accès granulaire"
    ],
    image: (
      <div className="relative h-48 rounded-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 p-4">
        <div className="flex flex-col items-center justify-center h-full">
          <Lock className="w-12 h-12 text-cyan-400 mb-3" />
          <div className="w-3/4 h-2 bg-cyan-500/40 rounded mb-1" />
          <div className="w-1/2 h-2 bg-cyan-500/20 rounded" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-1 h-1 bg-cyan-400 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }
];

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-4">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Tout ce dont vous avez besoin
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="block text-foreground">Fonctionnalités</span>
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              conçues pour vous
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une suite complète d'outils pour gérer efficacement votre organisation, 
            des membres aux finances, en passant par la sécurité et les rapports.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="hidden lg:block mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={feature.title}
                  onClick={() => setSelectedFeature(index)}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300",
                    selectedFeature === index
                      ? "border-blue-500/50 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 shadow-lg"
                      : "border-border hover:border-blue-500/30 hover:bg-accent/50"
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={cn(
                    "p-3 rounded-lg transition-colors",
                    selectedFeature === index 
                      ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20" 
                      : "bg-accent"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      selectedFeature === index 
                        ? "text-blue-400" 
                        : "text-muted-foreground"
                    )} />
                  </div>
                  <span className={cn(
                    "font-medium",
                    selectedFeature === index 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  )}>
                    {feature.title}
                  </span>
                </motion.button>
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
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">
                {features[selectedFeature].title}
              </h3>
              <div className="flex justify-center gap-2 mt-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFeature(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      selectedFeature === index 
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 w-6" 
                        : "bg-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setSelectedFeature((prev) => (prev < features.length - 1 ? prev + 1 : 0))}
              className="p-2 rounded-lg hover:bg-accent"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Feature Details */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {features[selectedFeature].image}
            
            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-3 -right-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium shadow-lg"
            >
              {features[selectedFeature].title.split(" ")[0]}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-3 -left-3 px-4 py-2 rounded-full bg-background border border-border shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-foreground">Live Data</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            key={`content-${selectedFeature}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={cn(
                "p-3 rounded-xl",
                features[selectedFeature].bgColor
              )}>
                {(() => {
                  const IconComponent = features[selectedFeature].icon;
                  return (
                    <IconComponent className={cn(
                      "w-8 h-8",
                      features[selectedFeature].color.replace("from-", "text-").split(" ")[0]
                    )} />
                  );
                })()}
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {features[selectedFeature].title}
                </h3>
                <div className={`w-16 h-1 bg-gradient-to-r ${features[selectedFeature].color} rounded-full`} />
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {features[selectedFeature].description}
            </p>

            {/* Feature Details List */}
            <div className="space-y-4 mb-10">
              {features[selectedFeature].details.map((detail, index) => (
                <motion.div
                  key={detail}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <div className={`p-1 rounded-full ${features[selectedFeature].bgColor} mt-1`}>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-foreground">{detail}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Upload, label: "Import CSV", color: "text-green-500" },
                { icon: Filter, label: "Filtres avancés", color: "text-purple-500" },
                { icon: Eye, label: "Vue personnalisée", color: "text-orange-500" },
                { icon: Bell, label: "Notifications", color: "text-red-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50 border border-border">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg">
                Essayer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg">
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
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-10 text-foreground">
            Découvrez toutes nos fonctionnalités
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-6 rounded-2xl border border-border bg-card hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className={`p-3 rounded-xl ${feature.bgColor} w-fit mb-4`}>
                      <Icon className={cn(
                        "w-6 h-6",
                        feature.color.replace("from-", "text-").split(" ")[0]
                      )} />
                    </div>
                    
                    <h4 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h4>
                    
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full`} />
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
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