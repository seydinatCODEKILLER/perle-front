// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "../constants/pricing";

export const FAQSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-20"
  >
    <Card className="border-border bg-card">
      <CardHeader className="text-center">
        <CardTitle>Questions fréquentes sur la tarification</CardTitle>
        <CardDescription>
          Tout ce que vous devez savoir avant de choisir votre plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const FAQItem = ({ question, answer }) => (
  <div className="space-y-2">
    <h4 className="font-semibold text-foreground flex items-center gap-2">
      <HelpCircle className="w-4 h-4 text-blue-400" />
      {question}
    </h4>
    <p className="text-muted-foreground">{answer}</p>
  </div>
);