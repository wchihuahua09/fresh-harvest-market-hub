
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategorySection from "@/components/home/CategorySection";
import FarmerSpotlight from "@/components/home/FarmerSpotlight";
import AboutSection from "@/components/home/AboutSection";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <AboutSection />
      <FarmerSpotlight />
    </div>
  );
};

export default Index;
