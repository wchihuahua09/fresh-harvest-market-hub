
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const Favorites = () => {
  const { favorites, toggleFavorite, addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      unit: item.unit,
      farmerId: item.farmerId,
      farmerName: item.farmerName,
    });

    toast({
      title: "已添加到购物车",
      description: `${item.name} 已添加到您的购物车`,
    });
  };

  const handleRemoveFavorite = (item: any) => {
    toggleFavorite(item);
    toast({
      title: "已移除收藏",
      description: `${item.name} 已从收藏夹中移除`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link to="/products" className="flex items-center text-farm-green hover:underline mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          继续购物
        </Link>
        <h1 className="text-2xl font-bold text-farm-brown">我的收藏</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex rounded-full bg-farm-cream p-6 mb-4">
            <Heart className="h-12 w-12 text-farm-green" />
          </div>
          <h2 className="text-xl font-semibold mb-2">您的收藏夹是空的</h2>
          <p className="text-gray-500 mb-6">您可以在浏览商品时添加喜欢的商品到收藏夹</p>
          <Button asChild className="bg-farm-green hover:bg-farm-green-dark">
            <Link to="/products">浏览商品</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="farm-card group relative">
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() => handleRemoveFavorite(item)}
                  className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
                >
                  <Heart size={16} className="fill-red-500 text-red-500" />
                </button>
              </div>
              
              {item.isOrganic && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-farm-green text-white border-none">Organic</Badge>
                </div>
              )}
              
              <Link to={`/product/${item.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.farmerName} • {item.farmerLocation}
                      </p>
                    </div>
                    <div className="text-farm-green font-bold text-lg">
                      ${item.price.toFixed(2)}
                      <span className="text-xs text-gray-500">/{item.unit}</span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-farm-green hover:bg-farm-green-dark text-white"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  加入购物车
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
