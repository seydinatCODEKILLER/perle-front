// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, CheckCircle, Search } from "lucide-react";
import { FAQItem } from "./FAQItem";

export const FAQContent = ({ 
  activeCategory, 
  categories, 
  filteredFaqs, 
  expandedItems, 
  setExpandedItems,
  searchQuery,
  setSearchQuery
}) => {
  // Corriger la gestion des items étendus
  const handleValueChange = (values) => {
    setExpandedItems(values);
  };

  return (
    <div className="lg:col-span-3">
      <CategoryHeader activeCategory={activeCategory} categories={categories} filteredFaqs={filteredFaqs} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredFaqs.length > 0 ? (
            <Accordion
              type="multiple"
              value={expandedItems}
              onValueChange={handleValueChange}
              className="space-y-4"
            >
              {filteredFaqs.map((faq, index) => (
                <FAQItem 
                  key={index}
                  faq={faq}
                  index={index}
                />
              ))}
            </Accordion>
          ) : (
            <NoResults searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CategoryHeader = ({ activeCategory, categories, filteredFaqs }) => (
  <motion.div
    key={activeCategory}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between mb-8"
  >
    <div>
      <h3 className="text-2xl font-bold text-foreground">
        {categories.find(c => c.id === activeCategory)?.label}
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
);

const NoResults = ({ searchQuery, setSearchQuery }) => (
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
);