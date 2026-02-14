import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Sparkles, Search } from "lucide-react";
import { FAQItem } from "./FAQItem";

export const FAQContent = memo(({ 
  activeCategory, 
  categories, 
  filteredFaqs, 
  expandedItems, 
  setExpandedItems,
  searchQuery,
  setSearchQuery
}) => (
  <div className="lg:col-span-3">
    <CategoryHeader activeCategory={activeCategory} categories={categories} filteredFaqs={filteredFaqs} />
    
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory + searchQuery}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {filteredFaqs.length > 0 ? (
          <Accordion
            type="multiple"
            value={expandedItems}
            onValueChange={setExpandedItems}
            className="space-y-3 sm:space-y-4"
          >
            {filteredFaqs.map((faq, index) => (
              <FAQItem 
                key={`${activeCategory}-${index}`}
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
));

FAQContent.displayName = "FAQContent";

const CategoryHeader = memo(({ activeCategory, categories, filteredFaqs }) => (
  <motion.div
    key={activeCategory}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3"
  >
    <div>
      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
        {categories.find(c => c.id === activeCategory)?.label}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground">
        {filteredFaqs.length} question{filteredFaqs.length > 1 ? 's' : ''} dans cette catégorie
      </p>
    </div>
    <Badge variant="outline" className="hidden sm:flex w-fit text-xs">
      <Sparkles className="w-3 h-3 mr-1.5" />
      Mise à jour récente
    </Badge>
  </motion.div>
));

CategoryHeader.displayName = "CategoryHeader";

const NoResults = memo(({ searchQuery, setSearchQuery }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="text-center py-12"
  >
    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-blue-500/10 to-indigo-500/10 mb-4">
      <Search className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
    </div>
    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
      Aucun résultat trouvé
    </h4>
    <p className="text-sm sm:text-base text-muted-foreground mb-6 px-4">
      Aucune question ne correspond à "<span className="font-medium">{searchQuery}</span>"
    </p>
    <Button
      variant="outline"
      onClick={() => setSearchQuery("")}
      className="text-sm"
    >
      Réinitialiser la recherche
    </Button>
  </motion.div>
));

NoResults.displayName = "NoResults";