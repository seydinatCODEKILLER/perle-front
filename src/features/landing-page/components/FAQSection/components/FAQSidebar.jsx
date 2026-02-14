/* eslint-disable no-unused-vars */
import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Zap, Phone, Mail, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export const FAQSidebar = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  popularQuestions, 
  setSearchQuery 
}) => (
  <div className="lg:col-span-1">
    <CategoriesCard 
      categories={categories}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      popularQuestions={popularQuestions}
      setSearchQuery={setSearchQuery}
    />
    
    <QuickSupportCard />
  </div>
);

const CategoriesCard = memo(({ categories, activeCategory, setActiveCategory, popularQuestions, setSearchQuery }) => (
  <Card className="border-border bg-card sticky top-24">
    <CardHeader className="p-4 sm:p-6">
      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
        <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
        Catégories
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 sm:p-6 pt-0">
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <CategoryButton 
              key={category.id}
              category={category}
              Icon={Icon}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          );
        })}
      </div>

      <PopularQuestions 
        popularQuestions={popularQuestions}
        setActiveCategory={setActiveCategory}
        setSearchQuery={setSearchQuery}
      />
    </CardContent>
  </Card>
));

CategoriesCard.displayName = "CategoriesCard";

const CategoryButton = memo(({ category, Icon, activeCategory, setActiveCategory }) => {
  const handleClick = useCallback(() => {
    setActiveCategory(category.id);
  }, [category.id, setActiveCategory]);

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between w-full p-2 sm:p-3 rounded-lg transition-all duration-300",
        activeCategory === category.id
          ? "bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20"
          : "hover:bg-accent"
      )}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={cn(
          "p-1.5 sm:p-2 rounded-lg", 
          activeCategory === category.id ? "bg-blue-500/10" : "bg-accent"
        )}>
          <Icon className={cn("w-3 h-3 sm:w-4 sm:h-4", category.color)} />
        </div>
        <span className={cn(
          "font-medium text-xs sm:text-sm",
          activeCategory === category.id ? "text-foreground" : "text-muted-foreground"
        )}>
          {category.label}
        </span>
      </div>
      <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
        {category.count}
      </Badge>
    </motion.button>
  );
});

CategoryButton.displayName = "CategoryButton";

const PopularQuestions = memo(({ popularQuestions, setActiveCategory, setSearchQuery }) => (
  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
    <h4 className="font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
      Questions populaires
    </h4>
    <div className="space-y-2 sm:space-y-3">
      {popularQuestions.map((item, index) => (
        <PopularQuestionButton
          key={index}
          item={item}
          setActiveCategory={setActiveCategory}
          setSearchQuery={setSearchQuery}
        />
      ))}
    </div>
  </div>
));

PopularQuestions.displayName = "PopularQuestions";

const PopularQuestionButton = memo(({ item, setActiveCategory, setSearchQuery }) => {
  const handleClick = useCallback(() => {
    setActiveCategory(item.category);
    setSearchQuery(item.question.split(' ')[0]);
  }, [item, setActiveCategory, setSearchQuery]);

  return (
    <motion.button
      onClick={handleClick}
      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground text-left w-full transition-colors"
      whileHover={{ x: 2 }}
    >
      • {item.question}
    </motion.button>
  );
});

PopularQuestionButton.displayName = "PopularQuestionButton";

const QuickSupportCard = memo(() => (
  <Card className="border-border bg-linear-to-br from-card to-background mt-4 sm:mt-6">
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm sm:text-base">Support rapide</h4>
          <p className="text-xs sm:text-sm text-muted-foreground">Besoin d'aide ?</p>
        </div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        <SupportButton icon={Phone} label="Appeler" />
        <SupportButton icon={Mail} label="Email" />
        <SupportButton icon={Globe} label="Chat" />
      </div>
    </CardContent>
  </Card>
));

QuickSupportCard.displayName = "QuickSupportCard";

const SupportButton = memo(({ icon: Icon, label }) => (
  <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-8 sm:h-10">
    <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
    {label}
  </Button>
));

SupportButton.displayName = "SupportButton";