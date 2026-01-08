import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
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

  const filteredFaqs = FAQ_DATA[activeCategory].filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAccordionChange = (value) => {
    setExpandedItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <FAQHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="grid lg:grid-cols-4 gap-8">
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