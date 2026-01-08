import {
  HelpCircle,
  Users,
  CreditCard,
  Shield,
  Settings,
  MessageCircle,
  Zap,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const FAQ_CATEGORIES = [
  { id: "general", label: "Général", icon: HelpCircle, color: "text-blue-400", count: 5 },
  { id: "account", label: "Compte", icon: Users, color: "text-green-400", count: 4 },
  { id: "billing", label: "Facturation", icon: CreditCard, color: "text-purple-400", count: 4 },
  { id: "features", label: "Fonctionnalités", icon: Settings, color: "text-orange-400", count: 6 },
  { id: "security", label: "Sécurité", icon: Shield, color: "text-red-400", count: 3 },
  { id: "support", label: "Support", icon: MessageCircle, color: "text-cyan-400", count: 3 }
];

export const FAQ_DATA = {
  general: [
    {
      question: "Qu'est-ce qu'Organizely ?",
      answer: "Organizely est une plateforme SaaS complète conçue spécialement pour la gestion des dahiras, associations et tontines. Nous offrons des outils pour gérer les membres, les cotisations, les dettes et les rapports financiers en toute simplicité.",
      tags: ["Plateforme", "Présentation", "Vue d'ensemble"]
    },
    {
      question: "Organizely est-il adapté à mon type d'organisation ?",
      answer: "Absolument ! Organizely a été conçu pour s'adapter à tous types d'organisations : petites et grandes associations, dahiras religieux, tontines, GIE, clubs sportifs, associations culturelles, etc. Notre plateforme est flexible et personnalisable.",
      tags: ["Adaptation", "Types d'organisations", "Flexibilité"]
    },
    {
      question: "Comment commencer avec Organizely ?",
      answer: "Commencez par créer votre compte gratuit. Ensuite, vous pourrez configurer votre première structure, importer vos membres et commencer à utiliser toutes les fonctionnalités. Notre guide de démarrage vous accompagne étape par étape.",
      tags: ["Démarrage", "Configuration", "Guide"]
    },
    {
      question: "Y a-t-il une application mobile ?",
      answer: "Oui ! Organizely est disponible sur iOS et Android. L'application mobile vous permet de gérer votre organisation depuis n'importe où, avec toutes les fonctionnalités essentielles : consultation des membres, suivi des cotisations, notifications, etc.",
      tags: ["Mobile", "Application", "iOS", "Android"]
    },
    {
      question: "Quelle est la différence avec les solutions classiques ?",
      answer: "Contrairement aux solutions génériques (Excel, Google Sheets), Organizely est spécialisé pour les organisations. Nous offrons des fonctionnalités spécifiques comme la gestion multi-structures, les plans de cotisation, les rappels automatiques et la sécurité bancaire.",
      tags: ["Comparaison", "Avantages", "Spécialisé"]
    }
  ],
  account: [
    {
      question: "Comment créer un compte ?",
      answer: "Cliquez sur le bouton 'Essai gratuit' en haut de la page, entrez votre email et suivez les étapes. La création de compte est gratuite et ne nécessite pas de carte bancaire.",
      tags: ["Création", "Inscription", "Gratuit"]
    },
    {
      question: "Puis-je gérer plusieurs structures avec un seul compte ?",
      answer: "Oui, c'est l'une de nos fonctionnalités principales. Vous pouvez gérer autant de structures que vous le souhaitez depuis un seul compte, avec des espaces séparés et sécurisés pour chaque organisation.",
      tags: ["Multi-structures", "Gestion", "Espace"]
    },
    {
      question: "Comment ajouter des administrateurs à ma structure ?",
      answer: "Depuis le tableau de bord, allez dans 'Paramètres' > 'Membres' > 'Permissions'. Vous pouvez ensuite attribuer des rôles (Admin, Responsable financier, etc.) à vos collaborateurs.",
      tags: ["Administrateurs", "Permissions", "Rôles"]
    },
    {
      question: "Puis-je importer mes données existantes ?",
      answer: "Absolument. Nous supportons l'import CSV et Excel pour les membres, les cotisations et les transactions. Notre système guide l'import étape par étape pour garantir la qualité des données.",
      tags: ["Import", "Données", "CSV", "Excel"]
    }
  ],
  billing: [
    {
      question: "Quels sont les tarifs ?",
      answer: "Nous offrons plusieurs formules adaptées à la taille de votre organisation. Toutes incluent l'essai gratuit de 30 jours. Les tarifs débutent à 19€/mois pour les petites structures.",
      tags: ["Tarifs", "Formules", "Prix"]
    },
    {
      question: "Y a-t-il un essai gratuit ?",
      answer: "Oui ! Tous nos plans incluent un essai gratuit de 30 jours, sans carte bancaire requise. Vous pouvez tester toutes les fonctionnalités avant de vous engager.",
      tags: ["Essai gratuit", "30 jours", "Test"]
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), virement bancaire, Orange Money et Wave. Tous les paiements sont sécurisés avec un chiffrement de niveau bancaire.",
      tags: ["Paiement", "Sécurité", "Moyens"]
    },
    {
      question: "Puis-je changer de formule à tout moment ?",
      answer: "Oui, vous pouvez passer d'une formule à une autre à tout moment, sans frais supplémentaires. La facturation est ajustée au prorata pour le mois en cours.",
      tags: ["Changement", "Formule", "Flexibilité"]
    }
  ],
  features: [
    {
      question: "Comment fonctionne la gestion des cotisations ?",
      answer: "Vous pouvez configurer des plans de cotisation (mensuelle, trimestrielle, annuelle), suivre les paiements en temps réel, envoyer des rappels automatiques et générer des reçus. Le système détecte automatiquement les retards.",
      tags: ["Cotisations", "Paiements", "Automatisation"]
    },
    {
      question: "Puis-je générer des rapports personnalisés ?",
      answer: "Oui, notre module de rapports vous permet de créer des rapports sur mesure : état des cotisations, bilan financier, activité des membres, etc. Tous les rapports sont exportables en PDF et Excel.",
      tags: ["Rapports", "Export", "Personnalisation"]
    },
    {
      question: "Comment fonctionnent les notifications ?",
      answer: "Organizely envoie automatiquement des notifications par email et SMS pour les rappels de cotisation, les événements importants, les mises à jour. Vous pouvez personnaliser le contenu et la fréquence.",
      tags: ["Notifications", "Alertes", "Communication"]
    },
    {
      question: "Puis-je gérer les événements de mon organisation ?",
      answer: "Notre module événements vous permet de planifier des réunions, collectes, activités. Vous pouvez gérer les inscriptions, envoyer des invitations et suivre la participation.",
      tags: ["Événements", "Planning", "Participation"]
    },
    {
      question: "Comment sécuriser les données financières ?",
      answer: "Toutes les données financières sont chiffrées avec un protocole bancaire (256-bit SSL). Nous ne stockons jamais les informations de carte bancaire (via Stripe) et sommes conformes RGPD.",
      tags: ["Sécurité", "Chiffrement", "RGPD"]
    },
    {
      question: "Puis-je personnaliser l'interface ?",
      answer: "Oui, vous pouvez personnaliser les couleurs, le logo, les messages automatiques pour que la plateforme reflète l'identité de votre organisation.",
      tags: ["Personnalisation", "Interface", "Branding"]
    }
  ],
  security: [
    {
      question: "Comment protégez-vous nos données ?",
      answer: "Nous utilisons un chiffrement de niveau bancaire (AES-256), des sauvegardes automatiques quotidiennes, une authentification à deux facteurs et un monitoring 24/7 de la sécurité.",
      tags: ["Protection", "Chiffrement", "Sauvegarde"]
    },
    {
      question: "Où sont stockées nos données ?",
      answer: "Toutes les données sont stockées sur des serveurs sécurisés en Europe (France), conformément au RGPD. Nous ne partageons jamais vos données avec des tiers.",
      tags: ["Stockage", "Europe", "RGPD", "Confidentialité"]
    },
    {
      question: "Puis-je contrôler les accès ?",
      answer: "Oui, notre système de permissions granulaires vous permet de définir précisément ce que chaque utilisateur peut voir et faire dans la plateforme.",
      tags: ["Permissions", "Contrôle", "Accès"]
    }
  ],
  support: [
    {
      question: "Comment puis-je contacter le support ?",
      answer: "Plusieurs options : chat en direct sur la plateforme, email à support@organizely.com, téléphone au +221 33 123 45 67. Notre temps de réponse moyen est de 2 heures.",
      tags: ["Contact", "Support", "Réponse"]
    },
    {
      question: "Avez-vous une documentation ?",
      answer: "Oui, nous avons une documentation complète avec des guides pas-à-pas, des tutoriels vidéo et des FAQ détaillées. Accessible depuis votre tableau de bord.",
      tags: ["Documentation", "Guides", "Tutoriels"]
    },
    {
      question: "Proposez-vous des formations ?",
      answer: "Oui, nous proposons des sessions de formation gratuites en ligne chaque semaine, ainsi que des formations personnalisées pour les grandes organisations.",
      tags: ["Formation", "Apprentissage", "Support"]
    }
  ]
};

export const POPULAR_QUESTIONS = [
  { question: "Combien coûte Organizely ?", category: "billing" },
  { question: "Puis-je essayer gratuitement ?", category: "billing" },
  { question: "Comment importer mes membres ?", category: "account" },
  { question: "Y a-t-il une application mobile ?", category: "general" },
  { question: "Comment sécuriser mes données ?", category: "security" }
];

export const SUPPORT_CONTACT = [
  { label: "Appeler le support", icon: Phone },
  { label: "Envoyer un email", icon: Mail },
  { label: "Chat en direct", icon: Globe }
];