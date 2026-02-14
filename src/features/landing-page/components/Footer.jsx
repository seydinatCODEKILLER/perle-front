// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Heart,
  ArrowUp,
  Sparkles,
  CheckCircle,
  Shield,
  Users,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Déplacer les données hors du composant
const navigation = {
  produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "API", href: "#" },
    { label: "Applications", href: "#" },
    { label: "Nouveautés", href: "#" }
  ],
  ressources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "Guides", href: "#" },
    { label: "Webinaires", href: "#" },
    { label: "Statut", href: "#" }
  ],
  entreprise: [
    { label: "À propos", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Presse", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partenaires", href: "#" }
  ],
  juridique: [
    { label: "CGU", href: "#" },
    { label: "Confidentialité", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Mentions légales", href: "#" },
    { label: "RGPD", href: "#" }
  ]
};

const socials = [
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-500" },
  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-sky-400" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-500" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-600" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:text-red-500" }
];

const certifications = [
  { icon: Shield, label: "Sécurité bancaire", description: "Chiffrement 256-bit" },
  { icon: CheckCircle, label: "Certifié RGPD", description: "Conforme Europe" },
  { icon: Users, label: "500+ organisations", description: "Nous font confiance" },
  { icon: CreditCard, label: "Paiements sécurisés", description: "Stripe & Paypal" }
];

const contactInfo = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "contact@organizely.com", 
    color: "text-blue-400" 
  },
  { 
    icon: Phone, 
    label: "Téléphone", 
    value: "+221 33 123 45 67", 
    color: "text-green-400" 
  },
  { 
    icon: MapPin, 
    label: "Adresse", 
    value: "Dakar, Sénégal", 
    color: "text-orange-400" 
  }
];

const securityBadges = ["Stripe", "SSL", "RGPD"];
const paymentMethods = ["Visa", "Mastercard", "Orange Money", "Wave"];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-background via-background to-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Newsletter & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          <div className="bg-linear-to-br from-card to-background border border-border rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <Badge 
                  variant="outline"
                  className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20"
                >
                  <Sparkles className="w-3 h-3 mr-1.5 sm:mr-2 text-blue-400" />
                  <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                    Restez informé
                  </span>
                </Badge>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                  Prêt à simplifier votre gestion ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  Inscrivez-vous à notre newsletter pour recevoir des conseils, 
                  des nouveautés et des offres spéciales.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Votre email"
                      className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-5 sm:py-6 rounded-xl border-border bg-background text-sm sm:text-base"
                    />
                  </div>
                  <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 sm:py-6 px-6 sm:px-8 rounded-xl text-sm sm:text-base">
                    S'inscrire
                    <ArrowUp className="ml-2 h-4 w-4 sm:h-5 sm:w-5 rotate-45" />
                  </Button>
                </div>
                
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4">
                  En vous inscrivant, vous acceptez notre politique de confidentialité.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {certifications.map((cert, index) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={cert.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-accent/50 border border-border hover:border-blue-500/30 transition-colors"
                    >
                      <div className="p-2 sm:p-3 rounded-lg bg-linear-to-br from-blue-500/10 to-indigo-500/10 mb-2 sm:mb-3">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-foreground text-xs sm:text-sm mb-0.5 sm:mb-1">
                        {cert.label}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        {cert.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid lg:grid-cols-5 gap-8 mb-8 sm:mb-12">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl">
                  <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Organizely
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                La plateforme SaaS tout-en-un pour gérer vos dahiras, 
                associations et tontines avec simplicité et efficacité.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {contactInfo.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <div key={contact.label} className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-accent shrink-0">
                        <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${contact.color}`} />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {contact.label}
                        </div>
                        <div className="font-medium text-foreground text-xs sm:text-sm lg:text-base">
                          {contact.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                  Suivez-nous
                </h4>
                <div className="flex gap-2 sm:gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground ${social.color} transition-colors`} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {Object.entries(navigation).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold text-foreground mb-3 sm:mb-4 capitalize text-sm sm:text-base">
                    {category}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 inline-block"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="mb-6 sm:mb-8" />
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-xs sm:text-sm">
                © {currentYear} Organizely. Tous droits réservés.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm flex items-center justify-center md:justify-start gap-1 mt-1 sm:mt-2">
                Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> au Sénégal
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                <select className="bg-transparent text-xs sm:text-sm text-muted-foreground focus:outline-none cursor-pointer hover:text-foreground transition-colors">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="wo">Wolof</option>
                </select>
              </div>
              
              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Retour en haut"
              >
                <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
                Retour en haut
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="border-t border-border bg-muted/30 py-4 sm:py-6"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  Sécurisé par :
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {securityBadges.map((badge) => (
                    <div 
                      key={badge}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-background border border-border text-[10px] sm:text-xs font-medium"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  Moyens de paiement :
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-background border border-border text-[10px] sm:text-xs whitespace-nowrap"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;