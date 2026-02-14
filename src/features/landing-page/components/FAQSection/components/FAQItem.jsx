import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle } from "lucide-react";

export const FAQItem = memo(({ faq, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.03 }}
  >
    <AccordionItem
      value={`item-${index}`}
      className="border-border rounded-lg overflow-hidden bg-card data-[state=open]:bg-linear-to-br data-[state=open]:from-blue-500/5 data-[state=open]:to-indigo-500/5"
    >
      <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline flex items-center justify-between">
        <div className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-left flex-1 pr-4">
          <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 shrink-0">
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
              {faq.question}
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
              {faq.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 pt-1 sm:pt-2">
        <FAQAnswer answer={faq.answer} />
      </AccordionContent>
    </AccordionItem>
  </motion.div>
));

FAQItem.displayName = "FAQItem";

const FAQAnswer = memo(({ answer }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
    className="pl-8 sm:pl-12"
  >
    <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base">
      {answer}
    </p>
    <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400">
      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      <span>Cette réponse vous a-t-elle été utile ?</span>
    </div>
  </motion.div>
));

FAQAnswer.displayName = "FAQAnswer";