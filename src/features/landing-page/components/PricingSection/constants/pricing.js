import {
  Zap,
  Users,
  CreditCard,
  Shield,
  BarChart3,
  FileText,
  Bell,
  Globe,
  Download,
  Upload,
  Star,
  TrendingUp,
  Crown,
  X,
  Check
} from "lucide-react";

export const BILLING_PERIODS = [
  { id: "monthly", label: "Mensuel", discount: null },
  { id: "yearly", label: "Annuel", discount: "Économisez 20%" }
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    description: "Parfait pour les petites associations et tontines",
    price: { monthly: 19, yearly: 15 },
    period: "par mois",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    icon: Zap,
    popular: false,
    features: {
      included: [
        { label: "Jusqu'à 50 membres", icon: Users },
        { label: "1 structure", icon: Globe },
        { label: "Gestion des cotisations", icon: CreditCard },
        { label: "Tableau de bord basique", icon: BarChart3 },
        { label: "Rapports mensuels", icon: FileText },
        { label: "Notifications email", icon: Bell }
      ],
      excluded: [
        { label: "Multi-structures", icon: X },
        { label: "Support prioritaire", icon: X },
        { label: "Export PDF personnalisé", icon: X },
        { label: "Formation en ligne", icon: X }
      ]
    },
    cta: "Commencer gratuitement",
    limit: "Limité à 50 membres"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Pour les organisations en croissance",
    price: { monthly: 49, yearly: 39 },
    period: "par mois",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    icon: TrendingUp,
    popular: true,
    features: {
      included: [
        { label: "Jusqu'à 200 membres", icon: Users },
        { label: "5 structures", icon: Globe },
        { label: "Gestion avancée des finances", icon: CreditCard },
        { label: "Tableau de bord complet", icon: BarChart3 },
        { label: "Rapports personnalisés", icon: FileText },
        { label: "Notifications SMS", icon: Bell },
        { label: "Import/Export CSV", icon: Upload },
        { label: "Support prioritaire", icon: Shield }
      ],
      excluded: [
        { label: "Formation personnalisée", icon: X },
        { label: "API complète", icon: X }
      ]
    },
    cta: "Essayer gratuitement",
    limit: "Popular"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Pour les grandes organisations et fédérations",
    price: { monthly: 99, yearly: 79 },
    period: "par mois",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    icon: Crown,
    popular: false,
    features: {
      included: [
        { label: "Membres illimités", icon: Users },
        { label: "Structures illimitées", icon: Globe },
        { label: "Gestion financière complète", icon: CreditCard },
        { label: "Tableau de bord avancé", icon: BarChart3 },
        { label: "Rapports automatisés", icon: FileText },
        { label: "Notifications push", icon: Bell },
        { label: "Import/Export avancé", icon: Download },
        { label: "Support 24/7", icon: Shield },
        { label: "Formation personnalisée", icon: Star },
        { label: "API complète", icon: Zap }
      ],
      excluded: []
    },
    cta: "Contacter les ventes",
    limit: "Sur mesure"
  }
];

export const FEATURES_COMPARISON = [
  {
    category: "Membres & Structure",
    features: [
      { name: "Nombre de membres", starter: "50", pro: "200", enterprise: "Illimité" },
      { name: "Nombre de structures", starter: "1", pro: "5", enterprise: "Illimité" },
      { name: "Import CSV/Excel", starter: true, pro: true, enterprise: true },
      { name: "Gestion des rôles", starter: "Basique", pro: "Avancée", enterprise: "Complète" }
    ]
  },
  {
    category: "Finances",
    features: [
      { name: "Gestion des cotisations", starter: true, pro: true, enterprise: true },
      { name: "Suivi des dettes", starter: true, pro: true, enterprise: true },
      { name: "Rapports financiers", starter: "Mensuel", pro: "Personnalisés", enterprise: "Automatisés" },
      { name: "Export PDF", starter: true, pro: "Avancé", enterprise: "Personnalisé" },
      { name: "Export Excel", starter: false, pro: true, enterprise: true }
    ]
  },
  {
    category: "Communication",
    features: [
      { name: "Notifications email", starter: true, pro: true, enterprise: true },
      { name: "Notifications SMS", starter: false, pro: true, enterprise: true },
      { name: "Notifications push", starter: false, pro: false, enterprise: true },
      { name: "Alertes personnalisées", starter: false, pro: true, enterprise: true }
    ]
  },
  {
    category: "Support & Sécurité",
    features: [
      { name: "Support technique", starter: "Email", pro: "Prioritaire", enterprise: "24/7" },
      { name: "Temps de réponse", starter: "24h", pro: "4h", enterprise: "1h" },
      { name: "Chiffrement SSL", starter: true, pro: true, enterprise: true },
      { name: "Sauvegarde automatique", starter: "Quotidienne", pro: "Quotidienne", enterprise: "En temps réel" },
      { name: "Formation", starter: "Documentation", pro: "En ligne", enterprise: "Personnalisée" }
    ]
  }
];

export const FAQ_ITEMS = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez passer d'un plan à un autre à tout moment. La facturation sera ajustée au prorata."
  },
  {
    question: "Que se passe-t-il après l'essai gratuit ?",
    answer: "Après 30 jours, votre compte passera automatiquement sur le plan gratuit avec fonctionnalités limitées, sauf si vous choisissez un plan payant."
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer: "Non, tous nos prix sont transparents. Les taxes applicables sont incluses dans le prix affiché."
  },
  {
    question: "Puis-je annuler à tout moment ?",
    answer: "Oui, vous pouvez annuler votre abonnement à tout moment. L'accès sera maintenu jusqu'à la fin de la période payée."
  }
];