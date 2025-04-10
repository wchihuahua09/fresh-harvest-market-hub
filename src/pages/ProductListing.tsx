
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

// Sample product data
const allProducts = [
  {
    id: 1,
    name: "Organic Carrots",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop",
    price: 2.99,
    unit: "bunch",
    isOrganic: true,
    category: "vegetables",
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
    category: "fruits",
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
    isOrganic: false,
    category: "dairy",
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
    category: "herbs",
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
    isOrganic: false,
    category: "dairy",
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
    category: "other",
    farmer: {
      name: "Bee Happy",
      location: "Flowerdale",
    },
  },
  {
    id: 7,
    name: "Organic Apples",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&auto=format&fit=crop",
    price: 3.49,
    unit: "lb",
    isOrganic: true,
    category: "fruits",
    farmer: {
      name: "Orchard Valley",
      location: "Applewood",
    },
  },
  {
    id: 8,
    name: "Fresh Broccoli",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800&auto=format&fit=crop",
    price: 2.79,
    unit: "head",
    isOrganic: false,
    category: "vegetables",
    farmer: {
      name: "Green Fields",
      location: "Riverside",
    },
  },
  {
    id: 9,
    name: "Artisan Cheese",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&auto=format&fit=crop",
    price: 7.99,
    unit: "8oz",
    isOrganic: false,
    category: "dairy",
    farmer: {
      name: "Cheese Craft",
      location: "Creamfield",
    },
  },
  {
    id: 10,
    name: "Organic Quinoa",
    image: "https://images.unsplash.com/photo-1542550371427-311e1b0427cc?w=800&auto=format&fit=crop",
    price: 6.49,
    unit: "lb",
    isOrganic: true,
    category: "grains",
    farmer: {
      name: "Heritage Acres",
      location: "Mountainside",
    },
  },
  {
    id: 11,
    name: "Fresh Tomatoes",
    image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?w=800&auto=format&fit=crop",
    price: 3.99,
    unit: "lb",
    isOrganic: true,
    category: "vegetables",
    farmer: {
      name: "Sunny Fields",
      location: "Valley View",
    },
  },
  {
    id: 12,
    name: "Wild Blueberries",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&auto=format&fit=crop",
    price: 5.99,
    unit: "pint",
    isOrganic: true,
    category: "fruits",
    farmer: {
      name: "Berry Hills",
      location: "Mountain View",
    },
  },
];

const ProductListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = location.pathname.includes('/category/') 
    ? location.pathname.split('/category/')[1] 
    : '';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL || "");
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = [
    { id: "vegetables", name: "Vegetables" },
    { id: "fruits", name: "Fruits" },
    { id: "dairy", name: "Dairy" },
    { id: "grains", name: "Grains" },
    { id: "herbs", name: "Herbs" },
    { id: "other", name: "Other" },
  ];

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesOrganic = organicOnly ? product.isOrganic : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesOrganic && matchesPrice;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      navigate(`/category/${category}`);
    } else {
      navigate('/products');
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 10]);
    setOrganicOnly(false);
    setSelectedCategory("");
    navigate('/products');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-farm-brown mb-8">
        {selectedCategory 
          ? `${categories.find(c => c.id === selectedCategory)?.name || 'Products'}`
          : "All Products"}
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filters Toggle */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between"
            onClick={() => setShowFilters(!showFilters)}
          >
            <div className="flex items-center">
              <SlidersHorizontal size={18} className="mr-2" />
              Filters
            </div>
            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
        
        {/* Filters Sidebar - Desktop always visible, mobile toggleable */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">Search</h3>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`category-${category.id}`}
                      checked={selectedCategory === category.id}
                      onCheckedChange={() => 
                        handleCategoryChange(selectedCategory === category.id ? "" : category.id)
                      }
                    />
                    <Label 
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-gray-700 cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">Price Range</h3>
              <Slider
                defaultValue={[0, 10]}
                max={10}
                step={0.5}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0].toFixed(2)}</span>
                <span>${priceRange[1].toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <Checkbox 
                  id="organic-only"
                  checked={organicOnly}
                  onCheckedChange={() => setOrganicOnly(!organicOnly)}
                />
                <Label 
                  htmlFor="organic-only"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Organic Only
                </Label>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
