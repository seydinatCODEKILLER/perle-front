import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "../constants/pricing";

export const FAQSection = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="mb-16 sm:mb-20"
  >
    <Card className="border-border bg-card">
      <CardHeader className="text-center p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">Questions fréquentes sur la tarification</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Tout ce que vous devez savoir avant de choisir votre plan
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
));

FAQSection.displayName = "FAQSection";

const FAQItem = memo(({ question, answer }) => (
  <div className="space-y-2">
    <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
      <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
      {question}
    </h4>
    <p className="text-muted-foreground text-xs sm:text-sm">{answer}</p>
  </div>
));

FAQItem.displayName = "FAQItem";