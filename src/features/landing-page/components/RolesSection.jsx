import { useState } from "react";
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

const roles = [
  {
    id: "super-admin",
    title: "Super Admin",
    subtitle: "Plateforme",
    description: "Gestion globale de toutes les structures, facturation et administration système.",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
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

const RolesSection = () => {
  const [activeRole, setActiveRole] = useState("super-admin");
  const currentRole = roles.find(role => role.id === activeRole) || roles[0];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20"
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-purple-400" />
            <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              Pour chaque acteur de votre organisation
            </span>
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            <span className="block text-foreground">Adapté à</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12 bg-muted/50 p-1 gap-1 sm:gap-2">
            {roles.map((role) => {
              const Icon = role.icon;
              const gradientColor = role.color.split(' ')[0].replace('from-', '');
              return (
                <TabsTrigger 
                  key={role.id} 
                  value={role.id} 
                  className={cn(
                    "flex flex-col gap-1 sm:gap-2 h-auto py-3 sm:py-4 px-2 sm:px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200",
                    "hover:bg-background/50",
                    activeRole === role.id && `border-b-2 ${role.borderColor}`
                  )}
                >
                  <div className={cn(
                    "p-2 sm:p-3 rounded-lg transition-all duration-200",
                    activeRole === role.id 
                      ? `${role.bgColor} scale-110` 
                      : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4 sm:w-5 sm:h-5",
                      activeRole === role.id 
                        ? `text-${gradientColor}` 
                        : "text-muted-foreground"
                    )} />
                  </div>
                  <span className="font-semibold text-xs sm:text-sm lg:text-base">{role.title}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{role.subtitle}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Role Content */}
          <TabsContent value={currentRole.id} className="mt-8 sm:mt-12 lg:mt-16">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column - Role Details */}
              <div className="space-y-6 sm:space-y-8">
                {/* Role Header Card */}
                <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className={cn("p-3 sm:p-4 rounded-xl transition-all duration-300", currentRole.bgColor)}>
                        <currentRole.icon className={cn(
                          "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8",
                          currentRole.color.replace("from-", "text-").split(" ")[0]
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <CardTitle className="text-xl sm:text-2xl">{currentRole.title}</CardTitle>
                          <Badge 
                            variant="secondary" 
                            className="w-fit bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 transition-colors"
                          >
                            {currentRole.subtitle}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm sm:text-base lg:text-lg">
                          {currentRole.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Permissions Card */}
                <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      Permissions principales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentRole.permissions.map((permission, index) => (
                        <motion.div
                          key={permission}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                        >
                          <div className="p-1 rounded-full bg-green-500/10">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                          </div>
                          <span className="text-foreground text-sm sm:text-base">{permission}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Features Card */}
                <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Fonctionnalités clés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {currentRole.features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <Badge 
                            key={feature.label}
                            variant="outline"
                            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:scale-105 transition-transform"
                          >
                            <Icon className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 ${feature.color}`} />
                            <span className="text-xs sm:text-sm">{feature.label}</span>
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Capacités du rôle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      {Object.entries(currentRole.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-2 sm:p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            {value}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Role Interface Mockup */}
              <div className="space-y-6 sm:space-y-8">
                <Card className={cn(
                  "border-border bg-card relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300",
                  `border-l-4 ${currentRole.borderColor}`
                )}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentRole.color}/5 opacity-50`} />
                  
                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg px-3 py-1">
                      {currentRole.level === "top" ? "Administration" : 
                       currentRole.level === "middle" ? "Gestion" : "Utilisation"}
                    </Badge>
                  </motion.div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg", currentRole.bgColor)}>
                          <currentRole.icon className={cn(
                            "w-4 h-4 sm:w-5 sm:h-5",
                            currentRole.color.replace("from-", "text-").split(" ")[0]
                          )} />
                        </div>
                        <div>
                          <CardTitle className="text-lg sm:text-xl">Interface {currentRole.title}</CardTitle>
                          <CardDescription className="text-xs sm:text-sm">Tableau de bord personnalisé</CardDescription>
                        </div>
                      </div>
                      <Badge className="w-fit bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-400 border-green-500/20">
                        Actif
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-4 sm:space-y-6">
                    {/* Role-specific Content */}
                    {currentRole.level === "top" && (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                          {['Structures', 'Utilisateurs', 'Revenus'].map((item, i) => (
                            <Card key={item} className="border-border bg-secondary/50">
                              <CardContent className="p-3 sm:p-4">
                                <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                                  {['247', '1.2K', '€42K'][i]}
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground">{item}</div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <Card className="border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <CardTitle className="text-sm">Activité globale</CardTitle>
                              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                              {['Nouvelle structure créée', 'Facturation mensuelle', 'Mise à jour système'].map((item) => (
                                <div key={item} className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="text-muted-foreground">{item}</span>
                                  <span className="text-green-400">✓</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {currentRole.level === "middle" && currentRole.title.includes("Admin") && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {['Membres actifs', 'Cotisations ce mois'].map((item, i) => (
                            <Card key={item} className="border-border bg-secondary/50">
                              <CardContent className="p-3 sm:p-4">
                                <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                                  {['247', '€8,420'][i]}
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground">{item}</div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <Card className="border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
                          <CardContent className="p-3 sm:p-4">
                            <CardTitle className="text-sm mb-2 sm:mb-3">Actions rapides</CardTitle>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                              {['Ajouter membre', 'Générer rapport', 'Configurer', 'Exporter'].map((action) => (
                                <Button 
                                  key={action} 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs sm:text-sm h-8 sm:h-9"
                                >
                                  {action}
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {currentRole.level === "middle" && currentRole.title.includes("Financier") && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {['Solde', 'Transactions'].map((item, i) => (
                            <Card key={item} className="border-border bg-secondary/50">
                              <CardContent className="p-3 sm:p-4">
                                <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                                  {['€12,450', '142'][i]}
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground">{item}</div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <Card className="border-green-500/20 bg-gradient-to-r from-green-500/5 to-emerald-500/5">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <CardTitle className="text-sm">Transactions récentes</CardTitle>
                              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                              {['Cotisation M. Diop', 'Remboursement dette', 'Frais événement'].map((item, i) => (
                                <div key={item} className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="text-muted-foreground">{item}</span>
                                  <span className={i === 0 ? "text-green-400" : "text-red-400"}>
                                    {['+€50', '-€120', '-€350'][i]}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {currentRole.level === "bottom" && (
                      <>
                        <Card className="border-border bg-secondary/50">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <div>
                                <div className="text-base sm:text-lg font-bold text-foreground">Mon profil</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">Membre actif</div>
                              </div>
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                              {['Statut: À jour', 'Prochaine cotisation: 05/02', 'Dette: €0'].map((item) => (
                                <div key={item} className="text-xs sm:text-sm text-muted-foreground">{item}</div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-red-500/5">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <CardTitle className="text-sm">Mes notifications</CardTitle>
                              <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                              {['Nouvel événement', 'Rappel cotisation', 'Document partagé'].map((item) => (
                                <div key={item} className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="text-muted-foreground">{item}</span>
                                  <Badge variant="outline" className="text-blue-400 border-blue-500/20 text-xs">
                                    Nouveau
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </CardContent>
                  
                  <CardFooter className="relative z-10 flex flex-wrap gap-1.5 sm:gap-2">
                    {currentRole.level === "top" && (
                      <>
                        <Badge variant="secondary" className="text-xs">Administration</Badge>
                        <Badge variant="secondary" className="text-xs">Plateforme</Badge>
                        <Badge variant="secondary" className="text-xs">Global</Badge>
                      </>
                    )}
                    {currentRole.level === "middle" && currentRole.title.includes("Admin") && (
                      <>
                        <Badge variant="secondary" className="text-xs">Structure</Badge>
                        <Badge variant="secondary" className="text-xs">Gestion</Badge>
                        <Badge variant="secondary" className="text-xs">Administration</Badge>
                      </>
                    )}
                    {currentRole.level === "middle" && currentRole.title.includes("Financier") && (
                      <>
                        <Badge variant="secondary" className="text-xs">Finances</Badge>
                        <Badge variant="secondary" className="text-xs">Comptabilité</Badge>
                        <Badge variant="secondary" className="text-xs">Rapports</Badge>
                      </>
                    )}
                    {currentRole.level === "bottom" && (
                      <>
                        <Badge variant="secondary" className="text-xs">Membre</Badge>
                        <Badge variant="secondary" className="text-xs">Utilisateur</Badge>
                        <Badge variant="secondary" className="text-xs">Personnel</Badge>
                      </>
                    )}
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
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <Badge 
            variant="outline"
            className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20"
          >
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Choisissez votre rôle
            </span>
          </Badge>
          
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Prêt à optimiser votre organisation ?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
            Découvrez comment chaque membre de votre équipe peut bénéficier d'une interface adaptée à ses besoins.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg">
              Essayer gratuitement
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="outline" className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg">
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