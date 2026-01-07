import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronRight,
  Users,
  TrendingUp,
  Shield,
  BarChart3,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Building,
  FileText,
  CreditCard,
  Download,
  Upload,
  Eye,
  Filter,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themes/ThemeToggle";

export const HeaderHero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* Navigation Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300"
        style={{
          backgroundColor: `rgba(var(--background), ${headerOpacity.get()})`,
          backdropFilter: `blur(${headerBlur.get()}px)`,
          transform: `scale(${headerScale.get()})`,
        }}
      >
        <motion.div
          className={`mx-auto max-w-7xl py-4 ${
            isScrolled 
              ? "rounded border border-border/50 bg-background/80 backdrop-blur-lg mt-2 mx-4 sm:mx-6 shadow-xl dark:shadow-2xl" 
              : ""
          }`}
          initial={false}
          animate={{
            paddingLeft: isScrolled ? "1.5rem" : "0",
            paddingRight: isScrolled ? "1.5rem" : "0",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-4xl">
                <Building className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Organizely
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative group"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Connexion
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                Essai gratuit
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-4 pb-4 border-t border-border pt-4"
            >
              <div className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground hover:bg-accent py-2 px-3 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    variant="ghost"
                    className="justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    Connexion
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    Essai gratuit
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.header>

      {/* Hero Section - Design vertical moderne */}
      <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient circles */}
          <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 -right-40 w-80 h-80 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-indigo-900/5 dark:from-blue-900/10 dark:to-indigo-900/10" />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                               linear-gradient(to bottom, #888 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero Content */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Solution tout-en-un pour les organisations
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-foreground">Gérez facilement</span>
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                vos dahiras, associations et tontines
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Une plateforme SaaS multi-structures pour gérer vos membres, 
              cotisations, dettes et rapports financiers en toute simplicité.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg rounded-xl text-white shadow-lg hover:shadow-xl"
                >
                  Créez votre espace gratuit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-accent px-8 py-6 text-lg rounded-xl"
                >
                  Demander une démo
                </Button>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-blue-500 to-indigo-500"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">+500 organisations</div>
                  <div>Nous font confiance</div>
                </div>
              </div>
              
              <div className="hidden sm:block h-8 w-px bg-border" />
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">30 jours d'essai</div>
                  <div>Satisfait ou remboursé</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Image Section */}
          <motion.div
            className="relative mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Main Dashboard Container */}
            <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card to-background p-2 shadow-2xl overflow-hidden">
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-3xl" />
              
              {/* Dashboard Header */}
              <div className="relative z-10 p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl">
                      <BarChart3 className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Tableau de Bord Organisation</h3>
                      <p className="text-sm text-muted-foreground">Interface intuitive pour une gestion simplifiée</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center gap-2">
                    <div className="px-3 py-1 bg-green-500/10 rounded-full">
                      <span className="text-xs text-green-400">En ligne</span>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/10 rounded-full">
                      <span className="text-xs text-blue-400">24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content Grid */}
              <div className="relative z-10 p-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Membres", value: "247", change: "+12", color: "from-blue-500 to-cyan-500" },
                    { label: "Cotisations", value: "€8,420", change: "+8%", color: "from-green-500 to-emerald-500" },
                    { label: "Dettes", value: "€1,230", change: "-15%", color: "from-orange-500 to-red-500" },
                    { label: "Événements", value: "12", change: "+3", color: "from-purple-500 to-pink-500" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-xl bg-gradient-to-br from-secondary/50 to-background border border-border hover:border-blue-500/30 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className={`mt-2 w-full h-1 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                  ))}
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Column - Chart */}
                  <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-blue-900/10 to-indigo-900/10 border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="font-semibold text-foreground">Activité Financière</h4>
                        <p className="text-sm text-muted-foreground">Derniers 6 mois</p>
                      </div>
                      <Filter className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {/* Chart */}
                    <div className="h-48 flex items-end gap-2">
                      {[65, 80, 75, 90, 85, 95].map((height, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 flex flex-col items-center"
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                        >
                          <div className="w-full h-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg" />
                          <div className="text-xs text-muted-foreground mt-2">
                            {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'][i]}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Recent Activity */}
                  <div className="rounded-xl bg-gradient-to-br from-gray-900/20 to-background border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-semibold text-foreground">Activité Récente</h4>
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-4">
                      {[
                        { user: "M. Diop", action: "Cotisation mensuelle", amount: "€50", time: "10 min" },
                        { user: "A. Ndiaye", action: "Remboursement dette", amount: "€120", time: "2h" },
                        { user: "Comité", action: "Frais événement", amount: "€350", time: "5h" },
                        { user: "S. Fall", action: "Adhésion", amount: "€25", time: "1j" },
                      ].map((activity, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div>
                            <div className="text-sm font-medium text-foreground">{activity.user}</div>
                            <div className="text-xs text-muted-foreground">{activity.action}</div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                          </div>
                          <div className="text-sm font-semibold text-green-400">
                            {activity.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Tools */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {[
                    { icon: Upload, label: "Import CSV", color: "text-green-400" },
                    { icon: Download, label: "Export PDF", color: "text-blue-400" },
                    { icon: Bell, label: "Alertes", color: "text-orange-400" },
                    { icon: Shield, label: "Sécurité", color: "text-cyan-400" },
                  ].map((tool) => (
                    <div key={tool.label} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border hover:border-blue-500/30 transition-colors">
                      <tool.icon className={`h-4 w-4 ${tool.color}`} />
                      <span className="text-sm text-muted-foreground">{tool.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 hidden lg:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium shadow-lg">
                Nouveau
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 hidden lg:block"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
            >
              <div className="px-4 py-2 rounded-full bg-background border border-border shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-foreground">Sécurisé</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};