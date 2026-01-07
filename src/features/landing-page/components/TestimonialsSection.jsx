import { useState, useEffect, useRef } from "react";
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

const testimonials = [
  {
    id: 1,
    name: "Mamadou Diop",
    role: "Président Association Al-Ihsan",
    avatar: "MD",
    imageColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
    content: "Organizely a révolutionné la gestion de notre association. En 3 mois, nous avons réduit le temps de gestion administrative de 70% et amélioré la transparence financière.",
    rating: 5,
    stats: { members: 250, cotisations: "€15K", durée: "8 mois" },
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

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 20;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [progress]);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setProgress(0);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-5 h-5 transition-all duration-300",
          i < rating 
            ? "fill-yellow-400 text-yellow-400 scale-100" 
            : "fill-muted/20 text-muted-foreground/30 scale-90"
        )}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Badge 
              variant="outline" 
              className="mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3 h-3 mr-2 text-yellow-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                Ils nous font confiance
              </span>
            </Badge>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="block text-foreground">Ce que disent</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                nos utilisateurs
              </span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez comment des centaines d'organisations ont transformé leur gestion 
            grâce à notre plateforme.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="relative"
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="p-4 sm:p-6 text-center relative">
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      className="inline-flex items-center justify-center mb-3 sm:mb-4"
                    >
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                    </motion.div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative mb-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"
            />
          </div>

          {/* Testimonial Cards Container */}
          <div className="relative" ref={containerRef}>
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {/* Left Column - Active Testimonial */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ 
                      opacity: 0,
                      x: direction > 0 ? 50 : -50,
                      scale: 0.95
                    }}
                    animate={{ 
                      opacity: 1,
                      x: 0,
                      scale: 1
                    }}
                    exit={{ 
                      opacity: 0,
                      x: direction > 0 ? -50 : 50,
                      scale: 0.95
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Card className="border-border bg-card backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-300 h-full group">
                      {/* Animated Background */}
                      <div className={`absolute inset-0 ${testimonials[activeIndex].imageColor}/5 opacity-30`} />
                      
                      {/* Animated Border Effect */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className={`absolute inset-0 ${testimonials[activeIndex].imageColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      </div>

                      {/* Quote Icon */}
                      <motion.div
                        animate={{ rotate: [0, 5, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-6 right-6 opacity-5"
                      >
                        <Quote className="w-32 h-32" />
                      </motion.div>

                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <Avatar className="w-16 h-16 border-4 border-background shadow-lg">
                                <AvatarFallback className={`text-white ${testimonials[activeIndex].imageColor} text-lg font-semibold`}>
                                  {testimonials[activeIndex].avatar}
                                </AvatarFallback>
                              </Avatar>
                            </motion.div>
                            <div>
                              <CardTitle className="text-xl sm:text-2xl">{testimonials[activeIndex].name}</CardTitle>
                              <CardDescription className="text-sm sm:text-base">{testimonials[activeIndex].role}</CardDescription>
                              <motion.div 
                                className="flex items-center gap-1 mt-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                {renderStars(testimonials[activeIndex].rating)}
                              </motion.div>
                            </div>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Badge variant="outline" className="hidden sm:flex backdrop-blur-sm">
                              <Sparkles className="w-3 h-3 mr-2" />
                              Témoignage vedette
                            </Badge>
                          </motion.div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="relative z-10"
                        >
                          <p className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed italic mb-6 sm:mb-8">
                            "{testimonials[activeIndex].content}"
                          </p>
                          
                          {/* Stats */}
                          <motion.div 
                            className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {Object.entries(testimonials[activeIndex].stats).map(([key, value], index) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-3 sm:p-4 rounded-lg bg-accent/50 backdrop-blur-sm hover:bg-accent/80 transition-all duration-300"
                              >
                                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                  {value}
                                </div>
                                <div className="text-xs text-muted-foreground uppercase mt-1">
                                  {key}
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>

                          {/* Tags */}
                          <motion.div 
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            {testimonials[activeIndex].tags.map((tag, index) => (
                              <motion.div
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                              >
                                <Badge 
                                  variant="secondary" 
                                  className="rounded-full px-3 py-1 backdrop-blur-sm hover:scale-105 transition-transform"
                                >
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      </CardContent>

                      <CardFooter>
                        <div className="flex items-center justify-between w-full">
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setAutoplay(!autoplay)}
                              className="rounded-full"
                            >
                              {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <span className="text-sm text-muted-foreground hidden sm:inline">
                              {autoplay ? "Lecture automatique" : "En pause"}
                            </span>
                          </motion.div>
                          <Progress value={progress} className="w-24 sm:w-32" />
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column - Testimonial List */}
              <div className="space-y-4 sm:space-y-6">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      x: 4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card 
                      className={cn(
                        "border-border bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300",
                        activeIndex === testimonial.id - 1 
                          ? "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 shadow-md" 
                          : "hover:border-yellow-500/30 hover:bg-card/80 hover:shadow-sm"
                      )}
                      onClick={() => {
                        const newDirection = testimonial.id - 1 > activeIndex ? 1 : -1;
                        setDirection(newDirection);
                        setActiveIndex(testimonial.id - 1);
                        setProgress(0);
                      }}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className={`text-white ${testimonial.imageColor} text-sm font-medium`}>
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-foreground text-sm sm:text-base truncate">
                                {testimonial.name}
                              </h4>
                              <div className="flex items-center gap-0.5">
                                {renderStars(testimonial.rating)}
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
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
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <div className="flex items-center gap-1 sm:gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      const newDirection = index > activeIndex ? 1 : -1;
                      setDirection(newDirection);
                      setActiveIndex(index);
                      setProgress(0);
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      activeIndex === index 
                        ? "w-6 sm:w-8 bg-gradient-to-r from-yellow-500 to-orange-500" 
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Grid Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Plus de témoignages
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.slice(3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="border-border bg-card/50 backdrop-blur-sm h-full hover:border-yellow-500/30 hover:bg-card/80 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-4 sm:p-6 relative">
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Quote Icon */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity"
                    >
                      <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
                    </motion.div>
                    
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                        <AvatarFallback className={`text-white ${testimonial.imageColor} font-medium`}>
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex mb-3 relative z-10">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base line-clamp-4 relative z-10">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2 relative z-10">
                      {testimonial.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + tagIndex * 0.1 }}
                        >
                          <Badge 
                            variant="outline" 
                            className="text-xs px-2 py-0.5 rounded-full hover:scale-105 transition-transform"
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tr from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
              />
            </div>
            
            <CardContent className="relative z-10 py-12 sm:py-16 px-4 sm:px-6">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 backdrop-blur-sm mb-6"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                  Rejoignez la communauté
                </span>
              </motion.div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Prêt à transformer votre organisation ?
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Des centaines d'organisations nous font déjà confiance. 
                Rejoignez-les et découvrez comment simplifier votre gestion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span className="flex items-center">
                    Essayer gratuitement
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2"
                    >
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.span>
                  </span>
                </Button>
                <Button variant="outline" className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all">
                  <span className="flex items-center">
                    Voir plus de témoignages
                    <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
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