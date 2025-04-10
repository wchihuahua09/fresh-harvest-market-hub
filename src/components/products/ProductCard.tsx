
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  isFeatured?: boolean;
  isOrganic?: boolean;
  farmer: {
    id?: number;
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
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favorited = isFavorite(id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite({
      id,
      name,
      image,
      price,
      unit,
      farmerId: farmer.id || 0,
      farmerName: farmer.name,
      farmerLocation: farmer.location,
      isOrganic
    });
    
    toast({
      title: favorited ? "已从收藏中移除" : "已添加到收藏",
      description: `${name} ${favorited ? "已从收藏中移除" : "已添加到您的收藏列表"}`,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      image,
      price,
      unit,
      farmerId: farmer.id || 0,
      farmerName: farmer.name,
    });
    
    toast({
      title: "已添加到购物车",
      description: `${name} 已添加到您的购物车`,
    });
  };

  return (
    <div className="farm-card group h-full">
      <Link to={`/product/${id}`} className="block h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              onClick={handleToggleFavorite}
              className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
            >
              <Heart
                size={16}
                className={favorited ? "fill-red-500 text-red-500" : "text-gray-500"}
              />
            </button>
          </div>
          {isOrganic && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-farm-green text-white border-none">有机</Badge>
            </div>
          )}
          {isFeatured && (
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-farm-brown text-white border-none">推荐</Badge>
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start flex-grow">
            <div>
              <h3 className="font-medium text-lg text-gray-800">{name}</h3>
              <Link 
                to={farmer.id ? `/shop/${farmer.id}` : "#"} 
                className="text-sm text-gray-500 hover:text-farm-green hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {farmer.name} • {farmer.location}
              </Link>
            </div>
            <div className="text-farm-green font-bold text-lg">¥{price.toFixed(2)}<span className="text-xs text-gray-500">/{unit}</span></div>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-farm-green hover:bg-farm-green-dark text-white"
            >
              <ShoppingCart size={16} className="mr-2" />
              加入购物车
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
