
import { useParams, Link } from "react-router-dom";
import { ChevronRight, MapPin, Phone, Mail, Clock, Star, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/products/ProductCard";

// 模拟商店数据
const mockShopData = {
  1: {
    id: 1,
    name: "绿谷农场",
    description: "专注于有机蔬菜和水果的种植，采用可持续农业实践。我们的农场位于郊区清新的环境中，确保每一种产品都新鲜且富含营养。",
    image: "https://images.unsplash.com/photo-1592087046781-466fede8b6f9?w=800&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1535892449425-2f21e532e195?w=1200&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592087046781-466fede8b6f9?w=400&auto=format&fit=crop",
    location: "河滨区东部",
    address: "河滨区东路123号",
    phone: "123-4567-8910",
    email: "contact@greenmountainfarm.com",
    businessHours: "周一至周五: 8:00 - 18:00，周六至周日: 9:00 - 16:00",
    rating: 4.7,
    reviewCount: 128,
    isVerified: true,
    establishedYear: 2005,
    certifications: ["有机认证", "绿色食品", "可持续农业"],
    products: [
      {
        id: 1,
        name: "有机胡萝卜",
        image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop",
        price: 2.99,
        unit: "捆",
        isOrganic: true,
        farmer: {
          id: 1,
          name: "绿谷农场",
          location: "河滨区",
        },
      },
      {
        id: 8,
        name: "新鲜西兰花",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800&auto=format&fit=crop",
        price: 2.79,
        unit: "头",
        isOrganic: false,
        farmer: {
          id: 1,
          name: "绿谷农场",
          location: "河滨区",
        },
      },
      {
        id: 12,
        name: "有机土豆",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop",
        price: 3.49,
        unit: "袋",
        isOrganic: true,
        farmer: {
          id: 1,
          name: "绿谷农场",
          location: "河滨区",
        },
      },
    ]
  },
  2: {
    id: 2,
    name: "阳光田园",
    description: "我们是一家家庭经营的农场，专注于优质水果种植。每一个水果都是精心挑选和照料的成果，确保最佳的味道和营养价值。",
    image: "https://images.unsplash.com/photo-1485637701894-09ad422f6de6?w=800&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1485637701894-09ad422f6de6?w=400&auto=format&fit=crop",
    location: "谷景区",
    address: "谷景区西路456号",
    phone: "123-7890-1234",
    email: "info@sunnygardens.com",
    businessHours: "周一至周日: 7:00 - 19:00",
    rating: 4.5,
    reviewCount: 96,
    isVerified: true,
    establishedYear: 2010,
    certifications: ["水果专业户", "品质保证"],
    products: [
      {
        id: 11,
        name: "新鲜番茄",
        image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?w=800&auto=format&fit=crop",
        price: 3.99,
        unit: "斤",
        isOrganic: true,
        farmer: {
          id: 2,
          name: "阳光田园",
          location: "谷景区",
        },
      },
      {
        id: 15,
        name: "有机草莓",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop",
        price: 5.99,
        unit: "盒",
        isOrganic: true,
        farmer: {
          id: 2,
          name: "阳光田园",
          location: "谷景区",
        },
      },
    ]
  },
  3: {
    id: 3,
    name: "香草园",
    description: "专注于香草和调味植物的种植。我们的香草全年供应，为您的烹饪增添新鲜的风味。所有产品均在控制环境中栽培，确保最佳质量。",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop",
    location: "草原镇",
    address: "草原镇北路789号",
    phone: "123-2345-6789",
    email: "hello@herbgarden.com",
    businessHours: "周一至周五: 9:00 - 17:00",
    rating: 4.8,
    reviewCount: 75,
    isVerified: true,
    establishedYear: 2015,
    certifications: ["有机认证", "特色种植"],
    products: [
      {
        id: 4,
        name: "新鲜罗勒",
        image: "https://images.unsplash.com/photo-1600326145552-327c4df2c246?w=800&auto=format&fit=crop",
        price: 2.49,
        unit: "束",
        isOrganic: true,
        farmer: {
          id: 3,
          name: "香草园",
          location: "草原镇",
        },
      },
      {
        id: 16,
        name: "新鲜迷迭香",
        image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=800&auto=format&fit=crop",
        price: 2.29,
        unit: "束",
        isOrganic: true,
        farmer: {
          id: 3,
          name: "香草园",
          location: "草原镇",
        },
      },
    ]
  }
};

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const shopId = Number(id);
  const shop = mockShopData[shopId as keyof typeof mockShopData];
  
  if (!shop) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">商店未找到</h2>
        <p className="mt-4">您查找的商店不存在或已被移除。</p>
        <Button asChild className="mt-6 bg-farm-green hover:bg-farm-green-dark text-white">
          <Link to="/products">返回产品列表</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:text-farm-green">首页</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/products" className="hover:text-farm-green">商店</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-700">{shop.name}</span>
      </div>
      
      {/* 商店封面 */}
      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
        <img 
          src={shop.coverImage} 
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{shop.name}</h1>
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>{shop.location}</span>
            {shop.isVerified && (
              <Badge className="ml-3 bg-farm-green border-none">已认证</Badge>
            )}
          </div>
        </div>
        <div className="absolute bottom-6 right-6 flex items-center bg-white bg-opacity-90 px-3 py-1 rounded-full">
          <Star className="text-yellow-400 fill-yellow-400 mr-1" size={16} />
          <span className="font-medium">{shop.rating}</span>
          <span className="text-gray-500 text-sm ml-1">({shop.reviewCount})</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 商店信息侧栏 */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={shop.logo} 
                  alt={shop.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-farm-green"
                />
                <div>
                  <h2 className="text-xl font-bold">{shop.name}</h2>
                  <p className="text-gray-500">创立于 {shop.establishedYear} 年</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={18} className="text-farm-green mt-1 mr-2 flex-shrink-0" />
                  <span>{shop.address}</span>
                </div>
                <div className="flex items-start">
                  <Phone size={18} className="text-farm-green mt-1 mr-2 flex-shrink-0" />
                  <span>{shop.phone}</span>
                </div>
                <div className="flex items-start">
                  <Mail size={18} className="text-farm-green mt-1 mr-2 flex-shrink-0" />
                  <span>{shop.email}</span>
                </div>
                <div className="flex items-start">
                  <Clock size={18} className="text-farm-green mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium mb-1">营业时间</div>
                    <div className="text-sm">{shop.businessHours}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">认证</h3>
                <div className="flex flex-wrap gap-2">
                  {shop.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="bg-farm-cream-light">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Button asChild className="w-full bg-farm-green hover:bg-farm-green-dark text-white">
                  <Link to={`/products?farmer=${shop.id}`}>
                    查看全部产品
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 商店主内容 */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="about">关于我们</TabsTrigger>
              <TabsTrigger value="products">推荐产品</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-0">
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-xl font-bold mb-4">关于{shop.name}</h2>
                <p className="text-gray-700 mb-6">{shop.description}</p>
                
                <h3 className="text-lg font-medium mb-3">我们的承诺</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block bg-farm-green rounded-full w-2 h-2 mt-2 mr-2"></span>
                    提供最新鲜、最优质的农产品
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-farm-green rounded-full w-2 h-2 mt-2 mr-2"></span>
                    采用可持续的种植方式，尊重自然环境
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-farm-green rounded-full w-2 h-2 mt-2 mr-2"></span>
                    确保所有产品都符合最高的质量和安全标准
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-farm-green rounded-full w-2 h-2 mt-2 mr-2"></span>
                    支持当地经济，创造就业机会
                  </li>
                </ul>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop" 
                    alt="农场景色" 
                    className="rounded-lg h-48 w-full object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1535089894977-83d4c8854f62?w=600&auto=format&fit=crop" 
                    alt="农场景色" 
                    className="rounded-lg h-48 w-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="products" className="mt-0">
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-xl font-bold mb-6">精选产品</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shop.products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button asChild variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
                    <Link to={`/products?farmer=${shop.id}`}>
                      查看全部产品
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
