import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search } from "lucide-react";

export const FAQHeader = memo(({ searchQuery, setSearchQuery }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="text-center mb-12 sm:mb-16"
  >
    <Badge 
      variant="outline" 
      className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20"
    >
      <HelpCircle className="w-3 h-3 mr-1.5 sm:mr-2 text-blue-400" />
      <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
        Questions fréquentes
      </span>
    </Badge>
    
    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
      <span className="block text-foreground">Trouvez des réponses</span>
      <span className="block bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
        à vos questions
      </span>
    </h2>
    
    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
      Tout ce que vous devez savoir sur Organizely. Si vous ne trouvez pas votre réponse, 
      notre équipe de support est là pour vous aider.
    </p>

    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  </motion.div>
));

FAQHeader.displayName = "FAQHeader";

const SearchBar = memo(({ searchQuery, setSearchQuery }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
  >
    <div className="relative">
      <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Rechercher une question..."
        className="pl-10 sm:pl-12 pr-20 sm:pr-24 py-5 sm:py-6 text-sm sm:text-base lg:text-lg rounded-2xl border-border bg-card"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs sm:text-sm h-7 sm:h-8"
          onClick={() => setSearchQuery("")}
        >
          Effacer
        </Button>
      )}
    </div>
  </motion.div>
));

SearchBar.displayName = "SearchBar";