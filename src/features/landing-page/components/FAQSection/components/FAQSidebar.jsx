/* eslint-disable no-unused-vars */
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

const CategoriesCard = ({ categories, activeCategory, setActiveCategory, popularQuestions, setSearchQuery }) => (
  <Card className="border-border bg-card sticky top-24">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-blue-400" />
        Catégories
      </CardTitle>
    </CardHeader>
    <CardContent>
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
);

const CategoryButton = ({ category, Icon, activeCategory, setActiveCategory }) => (
  <motion.button
    onClick={() => setActiveCategory(category.id)}
    className={cn(
      "flex items-center justify-between w-full p-3 rounded-lg transition-all duration-300",
      activeCategory === category.id
        ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20"
        : "hover:bg-accent"
    )}
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg", activeCategory === category.id ? "bg-blue-500/10" : "bg-accent")}>
        <Icon className={cn("w-4 h-4", category.color)} />
      </div>
      <span className={cn(
        "font-medium",
        activeCategory === category.id ? "text-foreground" : "text-muted-foreground"
      )}>
        {category.label}
      </span>
    </div>
    <Badge variant="secondary" className="text-xs">
      {category.count}
    </Badge>
  </motion.button>
);

const PopularQuestions = ({ popularQuestions, setActiveCategory, setSearchQuery }) => (
  <div className="mt-8 pt-8 border-t border-border">
    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
      <Zap className="w-4 h-4 text-yellow-400" />
      Questions populaires
    </h4>
    <div className="space-y-3">
      {popularQuestions.map((item, index) => (
        <motion.button
          key={index}
          onClick={() => {
            setActiveCategory(item.category);
            setSearchQuery(item.question.split(' ')[0]);
          }}
          className="text-sm text-muted-foreground hover:text-foreground text-left w-full transition-colors"
          whileHover={{ x: 2 }}
        >
          • {item.question}
        </motion.button>
      ))}
    </div>
  </div>
);

const QuickSupportCard = () => (
  <Card className="border-border bg-gradient-to-br from-card to-background mt-6">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Phone className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Support rapide</h4>
          <p className="text-sm text-muted-foreground">Besoin d'aide ?</p>
        </div>
      </div>
      <div className="space-y-3">
        <SupportButton icon={Phone} label="Appeler le support" />
        <SupportButton icon={Mail} label="Envoyer un email" />
        <SupportButton icon={Globe} label="Chat en direct" />
      </div>
    </CardContent>
  </Card>
);

const SupportButton = ({ icon: Icon, label }) => (
  <Button variant="outline" className="w-full justify-start">
    <Icon className="w-4 h-4 mr-2" />
    {label}
  </Button>
);