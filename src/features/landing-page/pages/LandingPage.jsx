import React from "react";
import { HeaderHero } from "../components/HeaderHero";
import FeaturesSection from "../components/FeaturesSection";
import RolesSection from "../components/RolesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderHero />

      {/* Section 2: Fonctionnalités */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Section 3: Roles */}
      <section id="pricing">
        <RolesSection />
      </section>

      {/* Section 4: Témoignages */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Section 5: FAQ */}
      <section id="faq">
        <FAQSection />
      </section>

      {/* Section 6: Pricing */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* Section 7: Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
