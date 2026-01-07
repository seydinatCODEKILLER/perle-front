import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Search,
  Filter,
  Sparkles,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Shield,
  CreditCard,
  Users,
  FileText,
  Settings,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqCategories = [
  { id: "general", label: "Général", icon: HelpCircle, color: "text-blue-400", count: 5 },
  { id: "account", label: "Compte", icon: Users, color: "text-green-400", count: 4 },
  { id: "billing", label: "Facturation", icon: CreditCard, color: "text-purple-400", count: 4 },
  { id: "features", label: "Fonctionnalités", icon: Settings, color: "text-orange-400", count: 6 },
  { id: "security", label: "Sécurité", icon: Shield, color: "text-red-400", count: 3 },
  { id: "support", label: "Support", icon: MessageCircle, color: "text-cyan-400", count: 3 }
];

const faqs = {
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

const popularQuestions = [
  { question: "Combien coûte Organizely ?", category: "billing" },
  { question: "Puis-je essayer gratuitement ?", category: "billing" },
  { question: "Comment importer mes membres ?", category: "account" },
  { question: "Y a-t-il une application mobile ?", category: "general" },
  { question: "Comment sécuriser mes données ?", category: "security" }
];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState([]);

  const filteredFaqs = faqs[activeCategory].filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // eslint-disable-next-line no-unused-vars
  const handleAccordionChange = (value) => {
    setExpandedItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20"
          >
            <HelpCircle className="w-3 h-3 mr-2 text-blue-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Questions fréquentes
            </span>
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="block text-foreground">Trouvez des réponses</span>
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              à vos questions
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Tout ce que vous devez savoir sur Organizely. Si vous ne trouvez pas votre réponse, 
            notre équipe de support est là pour vous aider.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une question..."
                className="pl-12 pr-4 py-6 text-lg rounded-2xl border-border bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  Effacer
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="border-border bg-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-400" />
                  Catégories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {faqCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          "flex items-center justify-between w-full p-3 rounded-lg transition-all duration-300",
                          activeCategory === category.id
                            ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20"
                            : "hover:bg-accent"
                        )}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("p-2 rounded-lg", activeCategory === category.id ? "bg-blue-500/10" : "bg-accent")}>
                            <Icon className={cn("w-4 h-4", category.color)} />
                          </div>
                          <span className={cn(
                            "font-medium",
                            activeCategory === category.id ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {category.label}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Popular Questions */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Questions populaires
                  </h4>
                  <div className="space-y-3">
                    {popularQuestions.map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setActiveCategory(item.category);
                          setSearchQuery(item.question.split(' ')[0]);
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground text-left w-full transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        • {item.question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className="border-border bg-gradient-to-br from-card to-background mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Support rapide</h4>
                    <p className="text-sm text-muted-foreground">Besoin d'aide ?</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler le support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Envoyer un email
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Chat en direct
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - FAQ List */}
          <div className="lg:col-span-3">
            {/* Category Header */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {faqCategories.find(c => c.id === activeCategory)?.label}
                </h3>
                <p className="text-muted-foreground">
                  {filteredFaqs.length} questions dans cette catégorie
                </p>
              </div>
              <Badge variant="outline" className="hidden sm:flex">
                <Sparkles className="w-3 h-3 mr-2" />
                Mise à jour récente
              </Badge>
            </motion.div>

            {/* FAQ Accordion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Accordion
                  type="multiple"
                  value={expandedItems}
                  onValueChange={setExpandedItems}
                  className="space-y-4"
                >
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <AccordionItem
                          value={`item-${index}`}
                          className="border-border rounded-lg overflow-hidden bg-card data-[state=open]:bg-gradient-to-br data-[state=open]:from-blue-500/5 data-[state=open]:to-indigo-500/5"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-start gap-4 text-left">
                              <div className="p-2 rounded-lg bg-blue-500/10 flex-shrink-0">
                                <HelpCircle className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-1">{faq.question}</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {faq.tags.map((tag, tagIndex) => (
                                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 pt-2">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="pl-12"
                            >
                              <p className="text-muted-foreground leading-relaxed mb-4">{faq.answer}</p>
                              <div className="flex items-center gap-2 text-sm text-blue-400">
                                <CheckCircle className="w-4 h-4" />
                                <span>Cette réponse vous a-t-elle été utile ?</span>
                              </div>
                            </motion.div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 mb-4">
                        <Search className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        Aucun résultat trouvé
                      </h4>
                      <p className="text-muted-foreground mb-6">
                        Aucune question ne correspond à votre recherche "{searchQuery}"
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery("")}
                      >
                        Réinitialiser la recherche
                      </Button>
                    </motion.div>
                  )}
                </Accordion>
              </motion.div>
            </AnimatePresence>

            {/* Still Have Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Card className="border-border bg-gradient-to-br from-card to-background overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
                <CardContent className="relative z-10 p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        Vous ne trouvez pas votre réponse ?
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Notre équipe de support est disponible 7j/7 pour répondre 
                        à toutes vos questions et vous accompagner dans l'utilisation 
                        de la plateforme.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Badge variant="outline" className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          +221 33 123 45 67
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          support@organizely.com
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          Chat en direct
                        </Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 mb-4">
                        <MessageCircle className="w-10 h-10 text-blue-400" />
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                        Contacter le support
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Badge 
            variant="outline"
            className="mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20"
          >
            <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Prêt à commencer ?
            </span>
          </Badge>
          
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Envie d'essayer Organizely ?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Rejoignez des centaines d'organisations qui ont simplifié leur gestion 
            avec notre plateforme. Essai gratuit de 30 jours, sans carte bancaire.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg">
              Commencer l'essai gratuit
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Voir la démo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;