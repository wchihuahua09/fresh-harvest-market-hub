
import { useState, useEffect } from "react";
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
  Award,
  Star,
  StarHalf,
  MessageSquare,
  ThumbsUp,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/products/ProductCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 模拟产品评价数据
const mockReviews = [
  {
    id: 1,
    productId: 1,
    user: {
      name: "张明",
      avatar: "/placeholder.svg"
    },
    rating: 5,
    comment: "非常新鲜的胡萝卜，甜度刚好，孩子很喜欢。包装也很好，没有损伤。会继续购买！",
    date: "2024-03-15",
    likes: 8,
    verified: true
  },
  {
    id: 2,
    productId: 1,
    user: {
      name: "王芳",
      avatar: "/placeholder.svg"
    },
    rating: 4,
    comment: "胡萝卜品质不错，但我觉得有一些不够大。总体来说还是很满意的，味道很好。",
    date: "2024-03-10",
    likes: 3,
    verified: true
  },
  {
    id: 3,
    productId: 1,
    user: {
      name: "李华",
      avatar: "/placeholder.svg"
    },
    rating: 5,
    comment: "物流很快，包装也很好。胡萝卜很新鲜，没有怪味，洗干净直接生吃也很甜。",
    date: "2024-02-28",
    likes: 12,
    verified: true
  }
];

// 样本产品数据 - 实际应用中会从API获取
const productData = {
  id: 1,
  name: "有机胡萝卜",
  image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop",
  price: 2.99,
  unit: "捆",
  description: "甜脆可口的有机胡萝卜，不含农药。非常适合生吃、烹饪或榨汁。富含β-胡萝卜素和多种营养物质。",
  isOrganic: true,
  category: "蔬菜",
  inStock: true,
  farmer: {
    id: 1,
    name: "绿谷农场",
    location: "河滨区",
    image: "https://images.unsplash.com/photo-1592087046781-466fede8b6f9?w=400&auto=format&fit=crop",
  },
  nutritionFacts: {
    servingSize: "1个中等大小胡萝卜 (61克)",
    calories: 25,
    fat: "0.1克",
    carbs: "6克",
    protein: "0.6克",
    fiber: "1.7克",
  },
  rating: {
    average: 4.7,
    count: 42
  },
  relatedProducts: [
    {
      id: 8,
      name: "新鲜西兰花",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800&auto=format&fit=crop",
      price: 2.79,
      unit: "头",
      isOrganic: false,
      farmer: {
        name: "绿野农场",
        location: "河滨区",
      },
    },
    {
      id: 11,
      name: "新鲜番茄",
      image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?w=800&auto=format&fit=crop",
      price: 3.99,
      unit: "斤",
      isOrganic: true,
      farmer: {
        name: "阳光田园",
        location: "谷景区",
      },
    },
    {
      id: 4,
      name: "新鲜罗勒",
      image: "https://images.unsplash.com/photo-1600326145552-327c4df2c246?w=800&auto=format&fit=crop",
      price: 2.49,
      unit: "束",
      isOrganic: true,
      farmer: {
        name: "香草园",
        location: "草原镇",
      },
    },
  ]
};

// 星级评分组件
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="text-yellow-400 fill-yellow-400" size={18} />
      ))}
      {hasHalfStar && <StarHalf className="text-yellow-400 fill-yellow-400" size={18} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-gray-300" size={18} />
      ))}
    </div>
  );
};

// 评分选择组件
const RatingSelector = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className="focus:outline-none"
        >
          <Star 
            className={`${
              value >= rating 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300"
            } hover:text-yellow-400`} 
            size={24} 
          />
        </button>
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(mockReviews);
  const [activeTab, setActiveTab] = useState("details");
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 实际应用中，您会根据ID获取产品数据
  // 现在，我们使用样本数据
  const product = productData;
  const favorited = isFavorite(product.id);
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      unit: product.unit,
      farmerId: product.farmer.id,
      farmerName: product.farmer.name,
    }, quantity);
    
    toast({
      title: "已添加到购物车",
      description: `${quantity} x ${product.name}`,
    });
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      unit: product.unit,
      farmerId: product.farmer.id,
      farmerName: product.farmer.name,
      farmerLocation: product.farmer.location,
      isOrganic: product.isOrganic
    });
    
    toast({
      title: favorited ? "已从收藏中移除" : "已添加到收藏",
      description: `${product.name} ${favorited ? "已从您的收藏列表中移除" : "已添加到您的收藏列表"}`,
    });
  };
  
  const handleLikeReview = (reviewId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "需要登录",
        description: "请登录后点赞评价",
        variant: "destructive",
      });
      return;
    }
    
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, likes: review.likes + 1 } 
        : review
    ));
  };
  
  const handleReviewChange = (field: string, value: string | number) => {
    setNewReview({ ...newReview, [field]: value });
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "需要登录",
        description: "请登录后发表评价",
        variant: "destructive",
      });
      return;
    }
    
    if (!newReview.comment.trim()) {
      toast({
        title: "评价内容不能为空",
        description: "请输入您的评价内容",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      const newReviewObj = {
        id: reviews.length + 1,
        productId: Number(id),
        user: {
          name: user?.username || "匿名用户",
          avatar: user?.avatar || "/placeholder.svg"
        },
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        verified: true
      };
      
      setReviews([newReviewObj, ...reviews]);
      setNewReview({
        rating: 5,
        comment: ""
      });
      
      toast({
        title: "评价已提交",
        description: "感谢您的评价！",
      });
      
      setIsSubmitting(false);
    }, 500);
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">产品未找到</h2>
        <p className="mt-4">您查找的产品不存在或已被移除。</p>
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
        <Link to="/products" className="hover:text-farm-green">产品</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to={`/category/${product.category}`} className="hover:text-farm-green capitalize">
          {product.category}
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-700">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 产品图片 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        {/* 产品详情 */}
        <div>
          <div className="mb-6">
            {product.isOrganic && (
              <Badge className="bg-farm-green text-white border-none mb-2">有机</Badge>
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
            
            <div className="flex items-center mb-2">
              <StarRating rating={product.rating.average} />
              <span className="ml-2 text-farm-brown font-medium">{product.rating.average}</span>
              <span className="ml-2 text-gray-500">({product.rating.count} 评价)</span>
            </div>
            
            <div className="text-2xl font-bold text-farm-green mb-4">
              ¥{product.price.toFixed(2)}<span className="text-sm text-gray-500 font-normal">/{product.unit}</span>
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
              onClick={handleAddToCart}
              className="bg-farm-green hover:bg-farm-green-dark text-white flex-1"
            >
              <ShoppingCart size={18} className="mr-2" />
              加入购物车
            </Button>
            <Button 
              variant="outline" 
              className={`p-2 ${favorited ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-500'}`}
              onClick={handleToggleFavorite}
            >
              <Heart size={18} className={favorited ? 'fill-red-500 text-red-500' : ''} />
            </Button>
          </div>
          
          <div className="bg-farm-cream-light rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3 mb-2">
              <Truck size={18} className="text-farm-green mt-0.5" />
              <span className="text-gray-700">订单满¥35免运费</span>
            </div>
            <div className="flex items-start space-x-3 mb-2">
              <LeafyGreen size={18} className="text-farm-green mt-0.5" />
              <span className="text-gray-700">{product.isOrganic ? '有机认证' : '可持续种植'}</span>
            </div>
            <div className="flex items-start space-x-3">
              <Award size={18} className="text-farm-green mt-0.5" />
              <span className="text-gray-700">100%满意保证</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 产品详情和评价标签页 */}
      <div className="mt-12">
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="details">产品详情</TabsTrigger>
            <TabsTrigger value="nutrition">营养成分</TabsTrigger>
            <TabsTrigger value="reviews">评价 ({reviews.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-0">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">产品特点</h3>
              <ul className="space-y-2">
                <li>来自{product.farmer.name}的精心种植</li>
                <li>{product.isOrganic ? '有机认证，不含任何化学农药和肥料' : '可持续种植，减少农药使用'}</li>
                <li>新鲜采摘，保证最佳口感和营养价值</li>
                <li>适合烹饪、制作沙拉或直接食用</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 mb-2">储存方式</h3>
              <p className="text-gray-700">
                建议存放在冰箱中，可保存7-10天。如果您希望延长保存时间，可以将其浸泡在水中储存。
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-0">
            <h3 className="font-medium text-lg mb-4">营养成分表</h3>
            <div className="bg-white rounded-lg border border-gray-200 divide-y max-w-md">
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">份量</span>
                <span className="font-medium">{product.nutritionFacts.servingSize}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">热量</span>
                <span className="font-medium">{product.nutritionFacts.calories}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">脂肪</span>
                <span className="font-medium">{product.nutritionFacts.fat}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">碳水化合物</span>
                <span className="font-medium">{product.nutritionFacts.carbs}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">蛋白质</span>
                <span className="font-medium">{product.nutritionFacts.protein}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-gray-600">膳食纤维</span>
                <span className="font-medium">{product.nutritionFacts.fiber}</span>
              </div>
            </div>
            
            <h3 className="font-medium text-lg mt-6 mb-4">健康益处</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block bg-farm-green rounded-full w-2 h-2 mt-2 mr-2"></span>
                富含维生素A，有助于保护视力
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-farm-green rounded-full w-2 h-2 mt-2 mr-2"></span>
                含有抗氧化物质，有助于增强免疫系统
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-farm-green rounded-full w-2 h-2 mt-2 mr-2"></span>
                膳食纤维有助于促进消化系统健康
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-farm-green rounded-full w-2 h-2 mt-2 mr-2"></span>
                低卡路里，适合健康饮食
              </li>
            </ul>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">顾客评价</h3>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <StarRating rating={product.rating.average} />
                  <span className="ml-2 font-medium">{product.rating.average} / 5</span>
                </div>
                <span className="text-gray-500">基于 {product.rating.count} 条评价</span>
              </div>
              
              {isAuthenticated ? (
                <div className="bg-farm-cream-light p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-4">发表您的评价</h4>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">评分</label>
                      <RatingSelector 
                        value={newReview.rating} 
                        onChange={(value) => handleReviewChange('rating', value)} 
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">评价内容</label>
                      <Textarea
                        placeholder="分享您对这个产品的看法..."
                        value={newReview.comment}
                        onChange={(e) => handleReviewChange('comment', e.target.value)}
                        className="min-h-24"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-farm-green hover:bg-farm-green-dark"
                      disabled={isSubmitting || !newReview.comment.trim()}
                    >
                      {isSubmitting ? "提交中..." : "提交评价"}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="bg-farm-cream-light p-4 rounded-lg mb-6 text-center">
                  <p>
                    请 <Link to="/login" className="text-farm-green hover:underline">登录</Link> 后发表评价
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <Avatar className="mr-3">
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{review.user.name}</h4>
                            {review.verified && (
                              <Badge variant="outline" className="ml-2 text-xs">已验证购买</Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <StarRating rating={review.rating} />
                            <span className="ml-2 text-sm text-gray-500">{review.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                    <div className="mt-3 flex items-center">
                      <button 
                        onClick={() => handleLikeReview(review.id)}
                        className="flex items-center text-sm text-gray-500 hover:text-farm-green"
                      >
                        <ThumbsUp size={14} className="mr-1" />
                        <span>有用 ({review.likes})</span>
                      </button>
                    </div>
                  </div>
                ))}
                
                {reviews.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">暂无评价</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* 相关产品部分 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-farm-brown mb-6">您可能也喜欢</h2>
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
