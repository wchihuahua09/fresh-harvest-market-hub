
import { useState, useEffect } from "react";
import ProductCard from "../products/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "有机胡萝卜",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop",
    price: 9.9,
    unit: "束",
    isOrganic: true,
    isFeatured: true,
    farmer: {
      name: "绿谷农场",
      location: "河滨区",
    },
  },
  {
    id: 2,
    name: "新鲜草莓",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop",
    price: 18.8,
    unit: "篮",
    isOrganic: true,
    isFeatured: true,
    farmer: {
      name: "莓山农场",
      location: "山景区",
    },
  },
  {
    id: 3,
    name: "农场鸡蛋",
    image: "https://images.unsplash.com/photo-1489761486274-a2c9a6592b04?w=800&auto=format&fit=crop",
    price: 25.9,
    unit: "打",
    isFeatured: true,
    farmer: {
      name: "欢乐母鸡",
      location: "绿野区",
    },
  },
  {
    id: 4,
    name: "新鲜罗勒",
    image: "https://images.unsplash.com/photo-1600326145552-327c4df2c246?w=800&auto=format&fit=crop",
    price: 7.5,
    unit: "束",
    isOrganic: true,
    isFeatured: true,
    farmer: {
      name: "香草天堂",
      location: "草地镇",
    },
  },
  {
    id: 5,
    name: "草饲牛奶",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop",
    price: 15.9,
    unit: "升",
    isFeatured: true,
    farmer: {
      name: "奶牛牧场",
      location: "奶源地",
    },
  },
  {
    id: 6,
    name: "纯天然蜂蜜",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&auto=format&fit=crop",
    price: 45.8,
    unit: "瓶",
    isOrganic: true,
    isFeatured: true,
    farmer: {
      name: "蜜蜂之家",
      location: "花海镇",
    },
  },
];

const FeaturedProducts = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef) {
      setMaxScroll(containerRef.scrollWidth - containerRef.clientWidth);
    }
  }, [containerRef]);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef) return;
    
    const scrollAmount = 300;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);
    
    containerRef.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-12 bg-farm-cream-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-farm-brown">推荐产品</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => scroll('left')}
              variant="outline"
              size="icon"
              className="rounded-full bg-white border-gray-200"
              disabled={scrollPosition <= 0}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              onClick={() => scroll('right')}
              variant="outline"
              size="icon"
              className="rounded-full bg-white border-gray-200"
              disabled={scrollPosition >= maxScroll}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-none"
            ref={setContainerRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="min-w-[280px] max-w-[280px] h-full">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
