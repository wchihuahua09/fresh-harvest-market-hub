
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Heart, 
  Minus, 
  Plus, 
  ChevronRight,
  Truck,
  LeafyGreen,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/products/ProductCard";

// Sample product data - would come from API in a real app
const productData = {
  id: 1,
  name: "Organic Carrots",
  image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop",
  price: 2.99,
  unit: "bunch",
  description: "Sweet, crunchy organic carrots grown without pesticides. Perfect for snacking, cooking, or juicing. Rich in beta-carotene and nutrients.",
  isOrganic: true,
  category: "vegetables",
  inStock: true,
  farmer: {
    id: 1,
    name: "Green Valley Farm",
    location: "Riverside",
    image: "https://images.unsplash.com/photo-1592087046781-466fede8b6f9?w=400&auto=format&fit=crop",
  },
  nutritionFacts: {
    servingSize: "1 medium carrot (61g)",
    calories: 25,
    fat: "0.1g",
    carbs: "6g",
    protein: "0.6g",
    fiber: "1.7g",
  },
  relatedProducts: [
    {
      id: 8,
      name: "Fresh Broccoli",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800&auto=format&fit=crop",
      price: 2.79,
      unit: "head",
      isOrganic: false,
      farmer: {
        name: "Green Fields",
        location: "Riverside",
      },
    },
    {
      id: 11,
      name: "Fresh Tomatoes",
      image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?w=800&auto=format&fit=crop",
      price: 3.99,
      unit: "lb",
      isOrganic: true,
      farmer: {
        name: "Sunny Fields",
        location: "Valley View",
      },
    },
    {
      id: 4,
      name: "Fresh Basil",
      image: "https://images.unsplash.com/photo-1600326145552-327c4df2c246?w=800&auto=format&fit=crop",
      price: 2.49,
      unit: "bunch",
      isOrganic: true,
      farmer: {
        name: "Herb Haven",
        location: "Meadowville",
      },
    },
  ]
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In a real app, you would fetch the product data based on the ID
  // For now, we'll use the sample data
  const product = productData;
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const addToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
    // Implement cart functionality here
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="mt-4">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-6 bg-farm-green hover:bg-farm-green-dark text-white">
          <Link to="/products">Return to Products</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:text-farm-green">Home</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/products" className="hover:text-farm-green">Products</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to={`/category/${product.category}`} className="hover:text-farm-green capitalize">
          {product.category}
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-700">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <div className="mb-6">
            {product.isOrganic && (
              <Badge className="bg-farm-green text-white border-none mb-2">Organic</Badge>
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <Link 
                to={`/farmer/${product.farmer.id}`}
                className="flex items-center text-farm-green hover:underline"
              >
                <img 
                  src={product.farmer.image} 
                  alt={product.farmer.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span>{product.farmer.name}</span>
              </Link>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-500">{product.farmer.location}</span>
            </div>
            <div className="text-2xl font-bold text-farm-green mb-4">
              ${product.price.toFixed(2)}<span className="text-sm text-gray-500 font-normal">/{product.unit}</span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-md">
              <button 
                onClick={decrementQuantity}
                className="px-3 py-1 border-r border-gray-200"
                disabled={quantity <= 1}
              >
                <Minus size={16} className={quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className="px-3 py-1 border-l border-gray-200"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
            <Button 
              onClick={addToCart}
              className="bg-farm-green hover:bg-farm-green-dark text-white flex-1"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className={`p-2 ${isFavorite ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-500'}`}
              onClick={toggleFavorite}
            >
              <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
            </Button>
          </div>
          
          <div className="bg-farm-cream-light rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3 mb-2">
              <Truck size={18} className="text-farm-green mt-0.5" />
              <span className="text-gray-700">Free delivery on orders over $35</span>
            </div>
            <div className="flex items-start space-x-3 mb-2">
              <LeafyGreen size={18} className="text-farm-green mt-0.5" />
              <span className="text-gray-700">{product.isOrganic ? 'Organic certified' : 'Sustainably grown'}</span>
            </div>
            <div className="flex items-start space-x-3">
              <Award size={18} className="text-farm-green mt-0.5" />
              <span className="text-gray-700">100% satisfaction guaranteed</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Nutrition Facts</h3>
            <div className="bg-white rounded-lg border border-gray-200 divide-y">
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">Serving Size</span>
                <span className="font-medium">{product.nutritionFacts.servingSize}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">Calories</span>
                <span className="font-medium">{product.nutritionFacts.calories}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">Total Fat</span>
                <span className="font-medium">{product.nutritionFacts.fat}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">Total Carbohydrates</span>
                <span className="font-medium">{product.nutritionFacts.carbs}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">Protein</span>
                <span className="font-medium">{product.nutritionFacts.protein}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">Dietary Fiber</span>
                <span className="font-medium">{product.nutritionFacts.fiber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-farm-brown mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} {...relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
