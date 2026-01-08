// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search } from "lucide-react";

export const FAQHeader = ({ searchQuery, setSearchQuery }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <Badge 
      variant="outline" 
      className="mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20"
    >
      <HelpCircle className="w-3 h-3 mr-2 text-blue-400" />
      <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
        Questions fréquentes
      </span>
    </Badge>
    
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
      <span className="block text-foreground">Trouvez des réponses</span>
      <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
        à vos questions
      </span>
    </h2>
    
    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
      Tout ce que vous devez savoir sur Organizely. Si vous ne trouvez pas votre réponse, 
      notre équipe de support est là pour vous aider.
    </p>

    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  </motion.div>
);

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="max-w-2xl mx-auto mb-12"
  >
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Rechercher une question..."
        className="pl-12 pr-4 py-6 text-lg rounded-2xl border-border bg-card"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => setSearchQuery("")}
        >
          Effacer
        </Button>
      )}
    </div>
  </motion.div>
);