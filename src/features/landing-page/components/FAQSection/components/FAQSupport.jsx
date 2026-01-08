// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Globe, ArrowRight } from "lucide-react";

export const FAQSupport = () => (
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
            <ContactBadges />
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
);

const ContactBadges = () => (
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
);