import React from "react";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";
import { HeaderHero } from "../components/HeaderHero/HeaderHero";
import { PricingSection } from "../components/PricingSection/PricingSection";
import { FAQSection } from "../components/FAQSection/FAQSection";
import RolesSection from "../components/RolesSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderHero />

      {/* Section 2: Fonctionnalités */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Section 3: Roles */}
      <section id="roles">
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
