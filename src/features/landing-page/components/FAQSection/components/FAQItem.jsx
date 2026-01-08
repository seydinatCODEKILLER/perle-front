// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle } from "lucide-react";

export const FAQItem = ({ faq, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <AccordionItem
      value={`item-${index}`}
      className="border-border rounded-lg overflow-hidden bg-card data-[state=open]:bg-gradient-to-br data-[state=open]:from-blue-500/5 data-[state=open]:to-indigo-500/5"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between">
        <div className="flex items-start gap-4 text-left flex-1">
          <div className="p-2 rounded-lg bg-blue-500/10 flex-shrink-0">
            <HelpCircle className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1">
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
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-4 pt-2">
        <FAQAnswer answer={faq.answer} />
      </AccordionContent>
    </AccordionItem>
  </motion.div>
);

const FAQAnswer = ({ answer }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="pl-12"
  >
    <p className="text-muted-foreground leading-relaxed mb-4">{answer}</p>
    <div className="flex items-center gap-2 text-sm text-blue-400">
      <CheckCircle className="w-4 h-4" />
      <span>Cette réponse vous a-t-elle été utile ?</span>
    </div>
  </motion.div>
);