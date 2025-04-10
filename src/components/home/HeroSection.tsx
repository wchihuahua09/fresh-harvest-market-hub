
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const HeroSection = () => {
  return <section className="relative bg-farm-green text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=1600&auto=format&fit=crop" alt="农贸市场" className="w-full h-full object-cover opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            新鲜农产品直达您的餐桌
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            支持本地农户，享用最新鲜的应季农产品。从农场到餐桌 - 体验真正新鲜的美食。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-farm-green hover:bg-gray-100">
              <Link to="/products">
                立即购买 <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/about">
                了解更多
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
