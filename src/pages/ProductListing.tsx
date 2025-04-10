
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
    name: "有机胡萝卜",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop",
    price: 9.9,
    unit: "束",
    isOrganic: true,
    category: "vegetables",
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
    category: "fruits",
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
    isOrganic: false,
    category: "dairy",
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
    category: "herbs",
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
    isOrganic: false,
    category: "dairy",
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
    category: "other",
    farmer: {
      name: "蜜蜂之家",
      location: "花海镇",
    },
  },
  {
    id: 7,
    name: "有机苹果",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&auto=format&fit=crop",
    price: 12.8,
    unit: "斤",
    isOrganic: true,
    category: "fruits",
    farmer: {
      name: "果园谷",
      location: "苹果镇",
    },
  },
  {
    id: 8,
    name: "新鲜西兰花",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800&auto=format&fit=crop",
    price: 8.9,
    unit: "棵",
    isOrganic: false,
    category: "vegetables",
    farmer: {
      name: "绿野农场",
      location: "河滨区",
    },
  },
  {
    id: 9,
    name: "手工奶酪",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&auto=format&fit=crop",
    price: 38.0,
    unit: "块",
    isOrganic: false,
    category: "dairy",
    farmer: {
      name: "奶酪工坊",
      location: "奶源地",
    },
  },
  {
    id: 10,
    name: "有机藜麦",
    image: "https://images.unsplash.com/photo-1542550371427-311e1b0427cc?w=800&auto=format&fit=crop",
    price: 25.9,
    unit: "斤",
    isOrganic: true,
    category: "grains",
    farmer: {
      name: "传承农场",
      location: "山区",
    },
  },
  {
    id: 11,
    name: "新鲜番茄",
    image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?w=800&auto=format&fit=crop",
    price: 9.9,
    unit: "斤",
    isOrganic: true,
    category: "vegetables",
    farmer: {
      name: "阳光农场",
      location: "谷景区",
    },
  },
  {
    id: 12,
    name: "野生蓝莓",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&auto=format&fit=crop",
    price: 32.8,
    unit: "盒",
    isOrganic: true,
    category: "fruits",
    farmer: {
      name: "莓山农场",
      location: "山景区",
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
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL || "");
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = [
    { id: "vegetables", name: "蔬菜" },
    { id: "fruits", name: "水果" },
    { id: "dairy", name: "乳制品" },
    { id: "grains", name: "谷物" },
    { id: "herbs", name: "草药" },
    { id: "other", name: "其他" },
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
    setPriceRange([0, 50]);
    setOrganicOnly(false);
    setSelectedCategory("");
    navigate('/products');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-farm-brown mb-8">
        {selectedCategory 
          ? `${categories.find(c => c.id === selectedCategory)?.name || '产品'}`
          : "所有产品"}
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
              筛选
            </div>
            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
        
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">搜索</h3>
              <Input
                type="text"
                placeholder="搜索产品..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">分类</h3>
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
              <h3 className="font-medium text-lg mb-3">价格范围</h3>
              <Slider
                defaultValue={[0, 50]}
                max={50}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm">
                <span>¥{priceRange[0].toFixed(2)}</span>
                <span>¥{priceRange[1].toFixed(2)}</span>
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
                  仅有机
                </Label>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={clearFilters}
            >
              清除筛选
            </Button>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">未找到产品</h3>
              <p className="text-gray-600">请调整您的筛选条件</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
