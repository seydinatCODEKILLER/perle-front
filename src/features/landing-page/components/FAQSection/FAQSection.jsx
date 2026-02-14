import { useState, useMemo, useCallback } from "react";
import { FAQHeader } from "./components/FAQHeader";
import { FAQSidebar } from "./components/FAQSidebar";
import { FAQContent } from "./components/FAQContent";
import { FAQSupport } from "./components/FAQSupport";
import { FAQCTA } from "./components/FAQCTA";
import { FAQ_CATEGORIES, FAQ_DATA, POPULAR_QUESTIONS } from "./constants/faq";

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState([]);

  // Mémoriser les FAQs filtrées
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return FAQ_DATA[activeCategory].filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [activeCategory, searchQuery]);

  // Optimiser la gestion de l'accordéon
  const handleAccordionChange = useCallback((values) => {
    setExpandedItems(values);
  }, []);

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <FAQHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          <FAQSidebar 
            categories={FAQ_CATEGORIES}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            popularQuestions={POPULAR_QUESTIONS}
            setSearchQuery={setSearchQuery}
          />
          
          <FAQContent 
            activeCategory={activeCategory}
            categories={FAQ_CATEGORIES}
            filteredFaqs={filteredFaqs}
            expandedItems={expandedItems}
            setExpandedItems={handleAccordionChange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <FAQSupport />
        <FAQCTA />
      </div>
    </section>
  );
};

export { FAQSection };