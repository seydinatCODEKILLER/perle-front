import { NavigationHeader } from "./components/Navigation/NavigationHeader";
import { HeroContent } from "./components/Hero/HeroContent";
import { HeroBackground } from "./components/Background/HeroBackground";
import { DashboardPreview } from "./components/Dashboard/DashboardPreview";
import { ScrollIndicator } from "./components/Hero/ScrollIndicator";

export const HeaderHero = () => {
  return (
    <>
      <NavigationHeader />
      
      <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
        <HeroBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <HeroContent />
          <DashboardPreview />
          <ScrollIndicator />
        </div>
      </section>
    </>
  );
};