
import { useState, useEffect } from "react";
import ProductCard from "../products/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Organic Carrots",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop",
    price: 2.99,
    unit: "bunch",
    isOrganic: true,
    isFeatured: true,
    farmer: {
      name: "Green Valley Farm",
      location: "Riverside",
    },
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop",
    price: 4.99,
    unit: "basket",
    isOrganic: true,
    isFeatured: true,
    farmer: {
      name: "Berry Hills",
      location: "Mountain View",
    },
  },
  {
    id: 3,
    name: "Farm Eggs",
    image: "https://images.unsplash.com/photo-1489761486274-a2c9a6592b04?w=800&auto=format&fit=crop",
    price: 5.99,
    unit: "dozen",
    isFeatured: true,
    farmer: {
      name: "Happy Hens",
      location: "Greenfield",
    },
  },
  {
    id: 4,
    name: "Fresh Basil",
    image: "https://images.unsplash.com/photo-1600326145552-327c4df2c246?w=800&auto=format&fit=crop",
    price: 2.49,
    unit: "bunch",
    isOrganic: true,
    isFeatured: true,
    farmer: {
      name: "Herb Haven",
      location: "Meadowville",
    },
  },
  {
    id: 5,
    name: "Grass-fed Milk",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop",
    price: 4.29,
    unit: "quart",
    isFeatured: true,
    farmer: {
      name: "Dairy Meadows",
      location: "Creamfield",
    },
  },
  {
    id: 6,
    name: "Honey",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&auto=format&fit=crop",
    price: 8.99,
    unit: "jar",
    isOrganic: true,
    isFeatured: true,
    farmer: {
      name: "Bee Happy",
      location: "Flowerdale",
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
          <h2 className="text-2xl md:text-3xl font-bold text-farm-brown">Featured Products</h2>
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
              <div key={product.id} className="min-w-[280px] max-w-[280px]">
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
