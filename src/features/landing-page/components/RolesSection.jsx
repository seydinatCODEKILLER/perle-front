import { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  CreditCard,
  User,
  Layers,
  TrendingUp,
  Bell,
  FileText,
  Settings,
  Eye,
  Lock,
  BarChart3,
  Download,
  Upload,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Déplacer les données hors du composant
const roles = [
  {
    id: "super-admin",
    title: "Super Admin",
    subtitle: "Plateforme",
    description: "Gestion globale de toutes les structures, facturation et administration système.",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    borderColor: "border-purple-500",
    permissions: [
      "Gestion multi-structures",
      "Facturation et abonnements",
      "Administration système",
      "Support technique"
    ],
    features: [
      { icon: Layers, label: "Toutes structures", color: "text-purple-400" },
      { icon: Settings, label: "Configuration", color: "text-pink-400" },
      { icon: Eye, label: "Vue globale", color: "text-indigo-400" }
    ],
    level: "top",
    stats: { structures: "Illimitées", users: "10K+", support: "Prioritaire" }
  },
  {
    id: "admin-structure",
    title: "Admin Structure",
    subtitle: "Gestion complète",
    description: "Administration complète d'une structure : membres, finances et organisation.",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-500",
    permissions: [
      "Gestion des membres",
      "Configuration structure",
      "Permissions d'accès",
      "Rapports détaillés"
    ],
    features: [
      { icon: Users, label: "Gestion membres", color: "text-blue-400" },
      { icon: BarChart3, label: "Analytics", color: "text-cyan-400" },
      { icon: Lock, label: "Sécurité", color: "text-sky-400" }
    ],
    level: "middle",
    stats: { members: "500+", reports: "Illimités", access: "Complet" }
  },
  {
    id: "responsable-financier",
    title: "Responsable Financier",
    subtitle: "Finances & Comptabilité",
    description: "Gestion des cotisations, dettes, transactions et rapports financiers.",
    icon: CreditCard,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    borderColor: "border-green-500",
    permissions: [
      "Cotisations et paiements",
      "Gestion des dettes",
      "Transactions financières",
      "Rapports comptables"
    ],
    features: [
      { icon: TrendingUp, label: "Transactions", color: "text-green-400" },
      { icon: FileText, label: "Rapports", color: "text-emerald-400" },
      { icon: Download, label: "Exports", color: "text-lime-400" }
    ],
    level: "middle",
    stats: { transactions: "10K+/mois", exports: "PDF/Excel", alerts: "Automatiques" }
  },
  {
    id: "membre",
    title: "Membre",
    subtitle: "Utilisateur final",
    description: "Accès au profil personnel, historique et notifications importantes.",
    icon: User,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    borderColor: "border-orange-500",
    permissions: [
      "Profil personnel",
      "Historique des cotisations",
      "Notifications",
      "Documents partagés"
    ],
    features: [
      { icon: Bell, label: "Notifications", color: "text-orange-400" },
      { icon: Eye, label: "Mon historique", color: "text-red-400" },
      { icon: Upload, label: "Documents", color: "text-amber-400" }
    ],
    level: "bottom",
    stats: { notifications: "Personnalisées", history: "Complet", documents: "Partagés" }
  }
];

// Composant pour le contenu de l'interface mockup
const RoleMockupContent = ({ role }) => {
  if (role.level === "top") {
    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: 'Structures', value: '247' },
            { label: 'Utilisateurs', value: '1.2K' },
            { label: 'Revenus', value: '€42K' }
          ].map((item) => (
            <Card key={item.label} className="border-border bg-secondary/50">
              <CardContent className="p-2 sm:p-3">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-0.5 sm:mb-1">
                  {item.value}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-purple-500/20 bg-linear-to-r from-purple-500/5 to-pink-500/5">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-xs sm:text-sm">Activité globale</CardTitle>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              {['Nouvelle structure créée', 'Facturation mensuelle', 'Mise à jour système'].map((item) => (
                <div key={item} className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-muted-foreground truncate mr-2">{item}</span>
                  <span className="text-green-400 shrink-0">✓</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  if (role.level === "middle" && role.title.includes("Admin")) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {[
            { label: 'Membres actifs', value: '247' },
            { label: 'Cotisations ce mois', value: '€8,420' }
          ].map((item) => (
            <Card key={item.label} className="border-border bg-secondary/50">
              <CardContent className="p-2 sm:p-3">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-0.5 sm:mb-1">
                  {item.value}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-blue-500/20 bg-linear-to-r from-blue-500/5 to-cyan-500/5">
          <CardContent className="p-2 sm:p-3">
            <CardTitle className="text-xs sm:text-sm mb-2">Actions rapides</CardTitle>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {['Ajouter membre', 'Générer rapport', 'Configurer', 'Exporter'].map((action) => (
                <Button 
                  key={action} 
                  variant="outline" 
                  size="sm" 
                  className="text-[10px] sm:text-xs h-7 sm:h-8 px-2"
                >
                  {action}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  if (role.level === "middle" && role.title.includes("Financier")) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {[
            { label: 'Solde', value: '€12,450' },
            { label: 'Transactions', value: '142' }
          ].map((item) => (
            <Card key={item.label} className="border-border bg-secondary/50">
              <CardContent className="p-2 sm:p-3">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-0.5 sm:mb-1">
                  {item.value}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-green-500/20 bg-linear-to-r from-green-500/5 to-emerald-500/5">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-xs sm:text-sm">Transactions récentes</CardTitle>
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              {[
                { label: 'Cotisation M. Diop', amount: '+€50', positive: true },
                { label: 'Remboursement dette', amount: '-€120', positive: false },
                { label: 'Frais événement', amount: '-€350', positive: false }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-muted-foreground truncate mr-2">{item.label}</span>
                  <span className={item.positive ? "text-green-400 shrink-0" : "text-red-400 shrink-0"}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  // Membre (level === "bottom")
  return (
    <>
      <Card className="border-border bg-secondary/50">
        <CardContent className="p-2 sm:p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm sm:text-base font-bold text-foreground">Mon profil</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Membre actif</div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-r from-orange-500 to-red-500 shrink-0" />
          </div>
          <div className="space-y-1">
            {['Statut: À jour', 'Prochaine cotisation: 05/02', 'Dette: €0'].map((item) => (
              <div key={item} className="text-[10px] sm:text-xs text-muted-foreground">{item}</div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-orange-500/20 bg-linear-to-r from-orange-500/5 to-red-500/5">
        <CardContent className="p-2 sm:p-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-xs sm:text-sm">Mes notifications</CardTitle>
            <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {['Nouvel événement', 'Rappel cotisation', 'Document partagé'].map((item) => (
              <div key={item} className="flex items-center justify-between text-[10px] sm:text-xs gap-2">
                <span className="text-muted-foreground truncate">{item}</span>
                <Badge variant="outline" className="text-blue-400 border-blue-500/20 text-[9px] sm:text-[10px] px-1.5 py-0 shrink-0">
                  Nouveau
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

// Composant pour les badges de footer
const RoleFooterBadges = ({ level, title }) => {
  const badges = useMemo(() => {
    if (level === "top") {
      return ['Administration', 'Plateforme', 'Global'];
    }
    if (level === "middle" && title.includes("Admin")) {
      return ['Structure', 'Gestion', 'Administration'];
    }
    if (level === "middle" && title.includes("Financier")) {
      return ['Finances', 'Comptabilité', 'Rapports'];
    }
    return ['Membre', 'Utilisateur', 'Personnel'];
  }, [level, title]);

  return (
    <>
      {badges.map((badge) => (
        <Badge key={badge} variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5">
          {badge}
        </Badge>
      ))}
    </>
  );
};

const RolesSection = () => {
  const [activeRole, setActiveRole] = useState("super-admin");
  const currentRole = useMemo(
    () => roles.find(role => role.id === activeRole) || roles[0],
    [activeRole]
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20"
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-purple-400" />
            <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              Pour chaque acteur de votre organisation
            </span>
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            <span className="block text-foreground">Adapté à</span>
            <span className="block bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              tous les rôles
            </span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Notre plateforme s'adapte parfaitement à chaque profil utilisateur, 
            offrant des fonctionnalités spécifiques et une expérience optimisée pour chaque rôle.
          </p>
        </motion.div>

        {/* Role Selection Tabs */}
        <Tabs defaultValue="super-admin" value={activeRole} onValueChange={setActiveRole} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12 bg-muted/50 p-1 gap-1 sm:gap-2 h-auto">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <TabsTrigger 
                  key={role.id} 
                  value={role.id} 
                  className={cn(
                    "flex flex-col gap-1 sm:gap-2 h-auto py-2 sm:py-3 lg:py-4 px-2 sm:px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200",
                    "hover:bg-background/50",
                    activeRole === role.id && `border-b-2 ${role.borderColor}`
                  )}
                >
                  <div className={cn(
                    "p-1.5 sm:p-2 lg:p-3 rounded-lg transition-all duration-200",
                    activeRole === role.id 
                      ? `${role.bgColor} scale-110` 
                      : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4 sm:w-5 sm:h-5",
                      activeRole === role.id 
                        ? role.textColor
                        : "text-muted-foreground"
                    )} />
                  </div>
                  <span className="font-semibold text-xs sm:text-sm lg:text-base leading-tight">
                    {role.title}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">
                    {role.subtitle}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Role Content */}
          <TabsContent value={currentRole.id} className="mt-6 sm:mt-8 lg:mt-12">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column - Role Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Role Header Card */}
                <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <div className={cn("p-2 sm:p-3 lg:p-4 rounded-xl transition-all duration-300", currentRole.bgColor)}>
                        <currentRole.icon className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8",
                          currentRole.textColor
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                            {currentRole.title}
                          </CardTitle>
                          <Badge 
                            variant="secondary" 
                            className="w-fit bg-linear-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 transition-colors text-xs"
                          >
                            {currentRole.subtitle}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs sm:text-sm lg:text-base">
                          {currentRole.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Permissions Card */}
                <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      Permissions principales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {currentRole.permissions.map((permission, index) => (
                        <motion.div
                          key={permission}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                        >
                          <div className="p-0.5 sm:p-1 rounded-full bg-green-500/10 shrink-0">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                          </div>
                          <span className="text-foreground text-xs sm:text-sm">{permission}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Features Card */}
                <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg lg:text-xl">Fonctionnalités clés</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {currentRole.features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <Badge 
                            key={feature.label}
                            variant="outline"
                            className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full hover:scale-105 transition-transform"
                          >
                            <Icon className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 ${feature.color}`} />
                            <span className="text-[10px] sm:text-xs">{feature.label}</span>
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg lg:text-xl">Capacités du rôle</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {Object.entries(currentRole.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-2 sm:p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                          <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            {value}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 capitalize leading-tight">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Role Interface Mockup */}
              <div className="space-y-4 sm:space-y-6">
                <Card className={cn(
                  "border-border bg-card relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300",
                  `border-l-4 ${currentRole.borderColor}`
                )}>
                  <div className={`absolute inset-0 bg-linear-to-br ${currentRole.color}/5 opacity-50`} />
                  
                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-20"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <Badge className="bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-lg px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs">
                      {currentRole.level === "top" ? "Administration" : 
                       currentRole.level === "middle" ? "Gestion" : "Utilisation"}
                    </Badge>
                  </motion.div>
                  
                  <CardHeader className="relative z-10 p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={cn("p-1.5 sm:p-2 rounded-lg", currentRole.bgColor)}>
                          <currentRole.icon className={cn(
                            "w-4 h-4 sm:w-5 sm:h-5",
                            currentRole.textColor
                          )} />
                        </div>
                        <div>
                          <CardTitle className="text-sm sm:text-base lg:text-lg xl:text-xl">
                            Interface {currentRole.title}
                          </CardTitle>
                          <CardDescription className="text-[10px] sm:text-xs">
                            Tableau de bord personnalisé
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="w-fit bg-linear-to-r from-green-500/10 to-emerald-500/10 text-green-400 border-green-500/20 text-[10px] sm:text-xs px-2 py-0.5">
                        Actif
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-3 sm:space-y-4 p-3 sm:p-4 lg:p-6 pt-0">
                    <RoleMockupContent role={currentRole} />
                  </CardContent>
                  
                  <CardFooter className="relative z-10 flex flex-wrap gap-1 sm:gap-1.5 p-3 sm:p-4 lg:p-6 pt-0">
                    <RoleFooterBadges level={currentRole.level} title={currentRole.title} />
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <Badge 
            variant="outline"
            className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20"
          >
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Choisissez votre rôle
            </span>
          </Badge>
          
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Prêt à optimiser votre organisation ?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
            Découvrez comment chaque membre de votre équipe peut bénéficier d'une interface adaptée à ses besoins.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
              Essayer gratuitement
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="outline" className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
              Voir les tarifs par rôle
              <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RolesSection;