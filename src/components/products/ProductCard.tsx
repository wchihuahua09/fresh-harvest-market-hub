
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  isFeatured?: boolean;
  isOrganic?: boolean;
  farmer: {
    name: string;
    location: string;
  };
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  unit,
  isFeatured = false,
  isOrganic = false,
  farmer,
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added ${name} to cart`);
    // Implement cart functionality here
  };

  return (
    <div className="farm-card group">
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              onClick={toggleFavorite}
              className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
            >
              <Heart
                size={16}
                className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}
              />
            </button>
          </div>
          {isOrganic && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-farm-green text-white border-none">Organic</Badge>
            </div>
          )}
          {isFeatured && (
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-farm-brown text-white border-none">Featured</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500">{farmer.name} • {farmer.location}</p>
            </div>
            <div className="text-farm-green font-bold text-lg">${price.toFixed(2)}<span className="text-xs text-gray-500">/{unit}</span></div>
          </div>
          <div className="mt-4">
            <Button
              onClick={addToCart}
              className="w-full bg-farm-green hover:bg-farm-green-dark text-white"
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
