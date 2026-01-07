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

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" }
  ];

  const certifications = [
    { icon: Shield, label: "Sécurité bancaire", description: "Chiffrement 256-bit" },
    { icon: CheckCircle, label: "Certifié RGPD", description: "Conforme Europe" },
    { icon: Users, label: "500+ organisations", description: "Nous font confiance" },
    { icon: CreditCard, label: "Paiements sécurisés", description: "Stripe & Paypal" }
  ];

  return (
    <footer className="bg-gradient-to-b from-background via-background to-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Newsletter & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="bg-gradient-to-br from-card to-background border border-border rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge 
                  variant="outline"
                  className="mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20"
                >
                  <Sparkles className="w-3 h-3 mr-2 text-blue-400" />
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                    Restez informé
                  </span>
                </Badge>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Prêt à simplifier votre gestion ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Inscrivez-vous à notre newsletter pour recevoir des conseils, 
                  des nouveautés et des offres spéciales.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Votre email"
                      className="pl-12 pr-4 py-6 rounded-xl border-border bg-background"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 px-8 rounded-xl">
                    S'inscrire
                    <ArrowUp className="ml-2 h-5 w-5 rotate-45" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  En vous inscrivant, vous acceptez notre politique de confidentialité.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={cert.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center text-center p-4 rounded-xl bg-accent/50 border border-border hover:border-blue-500/30 transition-colors"
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 mb-3">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{cert.label}</h4>
                      <p className="text-xs text-muted-foreground">{cert.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Organizely
                </span>
              </div>
              
              <p className="text-muted-foreground mb-6">
                La plateforme SaaS tout-en-un pour gérer vos dahiras, 
                associations et tontines avec simplicité et efficacité.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium text-foreground">contact@organizely.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Téléphone</div>
                    <div className="font-medium text-foreground">+221 33 123 45 67</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent">
                    <MapPin className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Adresse</div>
                    <div className="font-medium text-foreground">Dakar, Sénégal</div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Suivez-nous</h4>
                <div className="flex gap-3">
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
                        <Icon className="w-5 h-5 text-muted-foreground hover:text-blue-400 transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries(navigation).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold text-foreground mb-4 capitalize">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 inline-block"
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
          
          <Separator className="mb-8" />
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Organizely. Tous droits réservés.
              </p>
              <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-start gap-1 mt-2">
                Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> au Sénégal
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <select className="bg-transparent text-sm text-muted-foreground focus:outline-none cursor-pointer">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="wo">Wolof</option>
                </select>
              </div>
              
              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                <ArrowUp className="w-4 h-4" />
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
          className="border-t border-border bg-muted/30 py-6"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">Sécurisé par :</div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium">
                    Stripe
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium">
                    SSL
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium">
                    RGPD
                  </div>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">Moyens de paiement :</div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded bg-background border border-border text-xs">
                    Visa
                  </div>
                  <div className="px-2 py-1 rounded bg-background border border-border text-xs">
                    Mastercard
                  </div>
                  <div className="px-2 py-1 rounded bg-background border border-border text-xs">
                    Orange Money
                  </div>
                  <div className="px-2 py-1 rounded bg-background border border-border text-xs">
                    Wave
                  </div>
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