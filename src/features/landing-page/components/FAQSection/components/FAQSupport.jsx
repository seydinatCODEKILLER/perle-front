import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Globe, ArrowRight } from "lucide-react";

export const FAQSupport = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="mt-12"
  >
    <Card className="border-border bg-linear-to-br from-card to-background overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
      <CardContent className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Notre équipe de support est disponible 7j/7 pour répondre 
              à toutes vos questions et vous accompagner dans l'utilisation 
              de la plateforme.
            </p>
            <ContactBadges />
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-blue-500/10 to-indigo-500/10 mb-3 sm:mb-4">
              <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
            </div>
            <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-base w-full sm:w-auto">
              Contacter le support
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
));

FAQSupport.displayName = "FAQSupport";

const ContactBadges = memo(() => (
  <div className="flex flex-wrap gap-2 sm:gap-3">
    <Badge variant="outline" className="flex items-center gap-1.5 sm:gap-2 text-xs">
      <Phone className="w-3 h-3" />
      +221 33 123 45 67
    </Badge>
    <Badge variant="outline" className="flex items-center gap-1.5 sm:gap-2 text-xs">
      <Mail className="w-3 h-3" />
      support@organizely.com
    </Badge>
    <Badge variant="outline" className="flex items-center gap-1.5 sm:gap-2 text-xs">
      <Globe className="w-3 h-3" />
      Chat en direct
    </Badge>
  </div>
));

ContactBadges.displayName = "ContactBadges";