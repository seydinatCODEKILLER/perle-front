import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Award,
  Users,
  TrendingUp,
  Heart,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Déplacer les données hors du composant
const testimonials = [
  {
    id: 1,
    name: "Mamadou Diop",
    role: "Président Association Al-Ihsan",
    avatar: "MD",
    imageColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
    content: "Organizely a révolutionné la gestion de notre association. En 3 mois, nous avons réduit le temps de gestion administrative de 70% et amélioré la transparence financière.",
    rating: 5,
    stats: { membres: 250, cotisations: "€15K", durée: "8 mois" },
    tags: ["Transparence", "Efficacité", "Sécurité"]
  },
  {
    id: 2,
    name: "Aminata Ndiaye",
    role: "Trésorière Dahira Serigne Fallou",
    avatar: "AN",
    imageColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    content: "La gestion des cotisations et des dettes est devenue un jeu d'enfant. Les rapports automatiques nous font gagner des heures chaque semaine. Une plateforme indispensable !",
    rating: 5,
    stats: { transactions: "500+", économie: "20h/sem", satisfaction: "100%" },
    tags: ["Finances", "Rapports", "Gain de temps"]
  },
  {
    id: 3,
    name: "Ibrahima Sow",
    role: "Coordinateur Tontine Baye Fall",
    avatar: "IS",
    imageColor: "bg-gradient-to-br from-green-500 to-emerald-500",
    content: "La fonction multi-structures nous permet de gérer nos 5 tontines depuis un seul compte. L'interface est intuitive et le support réactif. Je recommande à 100%.",
    rating: 5,
    stats: { structures: 5, membres: 120, activité: "100%" },
    tags: ["Multi-structures", "Intuitif", "Support"]
  },
  {
    id: 4,
    name: "Fatou Diallo",
    role: "Secrétaire Association des Femmes",
    avatar: "FD",
    imageColor: "bg-gradient-to-br from-orange-500 to-red-500",
    content: "Gérer 300 membres n'a jamais été aussi simple. L'import CSV, les notifications automatiques et les rapports nous ont fait gagner énormément de temps et d'énergie.",
    rating: 4,
    stats: { membres: 300, notifications: "1K+", productivité: "+65%" },
    tags: ["Membres", "Notifications", "Productivité"]
  },
  {
    id: 5,
    name: "Abdoulaye Ba",
    role: "Responsable Financier GIE",
    avatar: "AB",
    imageColor: "bg-gradient-to-br from-indigo-500 to-blue-500",
    content: "La sécurité des données et le chiffrement bancaire nous ont convaincus. Nos membres ont totalement confiance dans la plateforme pour gérer leurs contributions.",
    rating: 5,
    stats: { sécurité: "100%", confiance: "95%", croissance: "+40%" },
    tags: ["Sécurité", "Confiance", "Croissance"]
  },
  {
    id: 6,
    name: "Khadija Mbaye",
    role: "Admin Plateforme Multi-associations",
    avatar: "KM",
    imageColor: "bg-gradient-to-br from-cyan-500 to-blue-500",
    content: "Je gère 12 associations différentes avec Organizely. La possibilité de basculer entre structures et les permissions granulaires sont des fonctionnalités exceptionnelles.",
    rating: 5,
    stats: { associations: 12, basculement: "instantané", permissions: "granulaires" },
    tags: ["Admin", "Permissions", "Flexibilité"]
  }
];

const stats = [
  { icon: Users, value: "500+", label: "Organisations", color: "text-blue-400" },
  { icon: TrendingUp, value: "95%", label: "Satisfaction", color: "text-green-400" },
  { icon: Award, value: "4.9/5", label: "Note moyenne", color: "text-yellow-400" },
  { icon: Heart, value: "98%", label: "Renouvellement", color: "text-pink-400" }
];

// Composant pour les étoiles (optimisé avec useMemo)
const StarRating = ({ rating, size = "default" }) => {
  const stars = useMemo(() => {
    const sizeClasses = {
      small: "w-3 h-3",
      default: "w-4 h-4 sm:w-5 sm:h-5",
      large: "w-5 h-5"
    };
    
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          sizeClasses[size],
          "transition-all duration-300",
          i < rating 
            ? "fill-yellow-400 text-yellow-400 scale-100" 
            : "fill-muted/20 text-muted-foreground/30 scale-90"
        )}
      />
    ));
  }, [rating, size]);

  return <div className="flex items-center gap-0.5 sm:gap-1">{stars}</div>;
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex]
  );

  // Autoplay effect
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  // Progress effect
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setTimeout(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 20;
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [progress, autoplay]);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setProgress(0);
  }, []);

  const goToTestimonial = useCallback((index) => {
    const newDirection = index > activeIndex ? 1 : -1;
    setDirection(newDirection);
    setActiveIndex(index);
    setProgress(0);
  }, [activeIndex]);

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-1.5 sm:mr-2 text-yellow-400" />
            <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
              Ils nous font confiance
            </span>
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            <span className="block text-foreground">Ce que disent</span>
            <span className="block bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              nos utilisateurs
            </span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Découvrez comment des centaines d'organisations ont transformé leur gestion 
            grâce à notre plateforme.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                  <div className="p-3 sm:p-4 lg:p-6 text-center">
                    <div className="inline-flex items-center justify-center mb-2 sm:mb-3">
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${stat.color}`} />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Testimonial */}
        <div className="relative mb-16 sm:mb-20">
          {/* Testimonial Cards Container */}
          <div className="relative" ref={containerRef}>
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {/* Left Column - Active Testimonial */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Card className="border-border bg-card backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-300 h-full group relative overflow-hidden">
                      {/* Background */}
                      <div className={`absolute inset-0 ${activeTestimonial.imageColor}/5 opacity-30`} />
                      
                      {/* Quote Icon */}
                      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-5">
                        <Quote className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />
                      </div>

                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <Avatar className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-4 border-background shadow-lg shrink-0">
                              <AvatarFallback className={`text-white ${activeTestimonial.imageColor} text-base sm:text-lg font-semibold`}>
                                {activeTestimonial.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base sm:text-lg lg:text-xl xl:text-2xl truncate">
                                {activeTestimonial.name}
                              </CardTitle>
                              <CardDescription className="text-xs sm:text-sm lg:text-base line-clamp-1">
                                {activeTestimonial.role}
                              </CardDescription>
                              <div className="mt-2">
                                <StarRating rating={activeTestimonial.rating} />
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="hidden sm:flex backdrop-blur-sm w-fit text-xs">
                            <Sparkles className="w-3 h-3 mr-1.5" />
                            Vedette
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="relative z-10">
                          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed italic mb-4 sm:mb-6 lg:mb-8">
                            "{activeTestimonial.content}"
                          </p>
                          
                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                            {Object.entries(activeTestimonial.stats).map(([key, value]) => (
                              <div
                                key={key}
                                className="text-center p-2 sm:p-3 lg:p-4 rounded-lg bg-accent/50 backdrop-blur-sm hover:bg-accent/80 transition-all duration-300"
                              >
                                <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                  {value}
                                </div>
                                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase mt-0.5 sm:mt-1 line-clamp-1">
                                  {key}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {activeTestimonial.tags.map((tag) => (
                              <Badge 
                                key={tag}
                                variant="secondary" 
                                className="rounded-full px-2 sm:px-3 py-0.5 sm:py-1 backdrop-blur-sm hover:scale-105 transition-transform text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-4 sm:p-6 pt-0">
                        <div className="flex items-center justify-between w-full gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setAutoplay(!autoplay)}
                              className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
                            >
                              {autoplay ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
                            </Button>
                            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
                              {autoplay ? "Lecture auto" : "Pause"}
                            </span>
                          </div>
                          <Progress value={progress} className="w-20 sm:w-24 lg:w-32" />
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column - Testimonial List */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <Card 
                      className={cn(
                        "border-border bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300",
                        activeIndex === testimonial.id - 1 
                          ? "border-yellow-500/50 bg-linear-to-br from-yellow-500/10 to-orange-500/10 shadow-md" 
                          : "hover:border-yellow-500/30 hover:bg-card/80 hover:shadow-sm"
                      )}
                      onClick={() => goToTestimonial(testimonial.id - 1)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                            <AvatarFallback className={`text-white ${testimonial.imageColor} text-xs sm:text-sm font-medium`}>
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-semibold text-foreground text-xs sm:text-sm truncate flex-1">
                                {testimonial.name}
                              </h4>
                              <div className="shrink-0">
                                <StarRating rating={testimonial.rating} size="small" />
                              </div>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
                              "{testimonial.content}"
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <div className="flex items-center gap-1 sm:gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={cn(
                      "h-1.5 sm:h-2 rounded-full transition-all duration-300",
                      activeIndex === index 
                        ? "w-6 sm:w-8 bg-linear-to-r from-yellow-500 to-orange-500" 
                        : "w-1.5 sm:w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Grid Testimonials */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 text-foreground">
            Plus de témoignages
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {testimonials.slice(3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="border-border bg-card/50 backdrop-blur-sm h-full hover:border-yellow-500/30 hover:bg-card/80 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-4 sm:p-6 relative">
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-linear-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Quote Icon */}
                    <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Quote className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 relative z-10">
                      <Avatar className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shrink-0">
                        <AvatarFallback className={`text-white ${testimonial.imageColor} font-medium text-xs sm:text-sm`}>
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-xs sm:text-sm lg:text-base truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-2 sm:mb-3 relative z-10">
                      <StarRating rating={testimonial.rating} />
                    </div>
                    
                    <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-4 relative z-10">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2 relative z-10">
                      {testimonial.tags.map((tag) => (
                        <Badge 
                          key={tag}
                          variant="outline" 
                          className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full hover:scale-105 transition-transform"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Card className="border-border/50 bg-linear-to-br from-card/80 to-background/80 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
            <CardContent className="relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 backdrop-blur-sm mb-4 sm:mb-6">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                  Rejoignez la communauté
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Prêt à transformer votre organisation ?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                Des centaines d'organisations nous font déjà confiance. 
                Rejoignez-les et découvrez comment simplifier votre gestion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Button className="bg-linear-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  Essayer gratuitement
                  <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button variant="outline" className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all w-full sm:w-auto">
                  Voir plus de témoignages
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;