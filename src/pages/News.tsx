
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  Search, 
  Bell, 
  MessageSquare, 
  ChevronRight,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// 模拟数据
const mockNews = [
  {
    id: 1,
    title: "今年水果丰收，价格将有所下降",
    content: "据农业部门预测，今年由于气候条件良好，水果产量将比去年增加15%，这将导致水果价格整体下降约10%。消费者可以期待更实惠的水果价格。",
    type: "news",
    date: "2024-04-01",
    author: "农业观察员",
    views: 1240,
    comments: 18,
    tags: ["水果", "价格", "市场"],
    image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "有机蔬菜认证标准更新公告",
    content: "农业部发布了最新的有机蔬菜认证标准，新标准更加严格，要求种植过程中完全不使用化学农药和肥料，且需要进行土壤质量检测。此标准将于下月开始实施。",
    type: "announcement",
    date: "2024-04-05",
    author: "农业部认证处",
    views: 856,
    comments: 12,
    tags: ["有机", "认证", "标准"],
    image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "新型农业技术展览会即将开幕",
    content: "第十五届全国农业技术展览会将于下月在北京农业展览中心举行，展会将展示最新的农业科技成果，包括智能灌溉系统、无人机植保技术等。欢迎农业从业者参观学习。",
    type: "announcement",
    date: "2024-04-08",
    author: "农业展览中心",
    views: 732,
    comments: 5,
    tags: ["展览会", "农业技术", "科技"],
    image: "https://images.unsplash.com/photo-1599494959044-c872e5734ce2?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "当季蔬菜营养价值分析报告",
    content: "最新研究发现，当季生长的蔬菜通常具有更高的营养价值。以春季为例，春季青菜比温室冬季种植的青菜维生素C含量高出近30%。专家建议消费者尽量选择应季蔬果。",
    type: "news",
    date: "2024-04-10",
    author: "营养学研究所",
    views: 1025,
    comments: 22,
    tags: ["营养", "季节", "蔬菜"],
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "农产品配送服务升级通知",
    content: "为提高用户体验，我们的农产品配送服务将从下周起全面升级。新系统将提供更精确的配送时间预估，且新增冷链配送选项，保证生鲜产品的最佳品质。",
    type: "announcement",
    date: "2024-04-12",
    author: "物流部",
    views: 567,
    comments: 8,
    tags: ["配送", "服务", "升级"],
    image: "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "农民专业合作社成效显著",
    content: "近年来，农民专业合作社发展迅速，据统计，参与合作社的农户收入平均提高了25%。合作社通过统一采购、技术共享和品牌营销等方式，有效提高了农产品的市场竞争力。",
    type: "news",
    date: "2024-04-15",
    author: "农村发展研究中心",
    views: 896,
    comments: 15,
    tags: ["合作社", "收入", "发展"],
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop"
  }
];

// 模拟评论数据
const mockComments = [
  {
    id: 1,
    newsId: 1,
    user: {
      name: "张明",
      avatar: "/placeholder.svg"
    },
    content: "这是个好消息，希望苹果和葡萄的价格能降一些。",
    date: "2024-04-02 14:30"
  },
  {
    id: 2,
    newsId: 1,
    user: {
      name: "李华",
      avatar: "/placeholder.svg"
    },
    content: "希望质量也能保证，不只是追求产量。",
    date: "2024-04-02 15:45"
  },
  {
    id: 3,
    newsId: 2,
    user: {
      name: "王芳",
      avatar: "/placeholder.svg"
    },
    content: "新标准更严格了，这对消费者是好事，但希望不要导致价格大幅上涨。",
    date: "2024-04-06 09:20"
  }
];

const NewsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredNews, setFilteredNews] = useState(mockNews);
  
  useEffect(() => {
    let filtered = mockNews;
    
    // 按类型过滤
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.type === activeTab);
    }
    
    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredNews(filtered);
  }, [searchTerm, activeTab]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-farm-brown mb-8">资讯与公告</h1>
      
      <div className="mb-6">
        <div className="relative max-w-md mx-auto md:mx-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="搜索资讯和公告..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="news">资讯</TabsTrigger>
          <TabsTrigger value="announcement">公告</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={item.type === "announcement" ? "bg-farm-brown" : "bg-farm-green"}>
                        {item.type === "announcement" ? "公告" : "资讯"}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye size={14} className="mr-1" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2 line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-600 text-sm line-clamp-3">{item.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={14} className="mr-1" />
                      <span>{item.comments}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">未找到相关资讯或公告</h3>
              <p className="text-gray-600">请尝试其他搜索词</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="news" className="mt-0">
          {/* 内容与 all 标签页相同，但过滤只显示资讯 */}
        </TabsContent>
        
        <TabsContent value="announcement" className="mt-0">
          {/* 内容与 all 标签页相同，但过滤只显示公告 */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(mockComments.filter(c => c.newsId === Number(id)));
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const newsItem = mockNews.find(item => item.id === Number(id));
  
  if (!newsItem) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">内容未找到</h2>
        <p className="mt-4">您查找的资讯或公告不存在或已被删除。</p>
        <Button asChild className="mt-6 bg-farm-green hover:bg-farm-green-dark text-white">
          <Link to="/news">返回资讯列表</Link>
        </Button>
      </div>
    );
  }
  
  const { useAuth } = require("@/contexts/AuthContext");
  const { isAuthenticated, user } = useAuth();
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !isAuthenticated) return;
    
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      const newComment = {
        id: comments.length + 1,
        newsId: Number(id),
        user: {
          name: user?.username || "游客",
          avatar: user?.avatar || "/placeholder.svg"
        },
        content: comment,
        date: new Date().toLocaleString()
      };
      
      setComments([...comments, newComment]);
      setComment("");
      setIsSubmitting(false);
    }, 500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:text-farm-green">首页</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/news" className="hover:text-farm-green">资讯与公告</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-700">
          {newsItem.type === "announcement" ? "公告" : "资讯"}
        </span>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Badge className={newsItem.type === "announcement" ? "bg-farm-brown" : "bg-farm-green"}>
            {newsItem.type === "announcement" ? "公告" : "资讯"}
          </Badge>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{newsItem.title}</h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
          <span className="mr-4">{newsItem.author}</span>
          <div className="flex items-center mr-4">
            <Calendar size={14} className="mr-1" />
            <span>{newsItem.date}</span>
          </div>
          <div className="flex items-center mr-4">
            <Eye size={14} className="mr-1" />
            <span>{newsItem.views} 浏览</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={14} className="mr-1" />
            <span>{comments.length} 评论</span>
          </div>
        </div>
        
        <div className="mb-8">
          <img 
            src={newsItem.image} 
            alt={newsItem.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {newsItem.content}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {newsItem.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-farm-cream-light">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        {/* 评论区 */}
        <div>
          <h3 className="text-xl font-bold mb-6">评论 ({comments.length})</h3>
          
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
                  <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    placeholder="添加评论..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-2"
                  />
                  <Button 
                    type="submit" 
                    className="bg-farm-green hover:bg-farm-green-dark"
                    disabled={!comment.trim() || isSubmitting}
                  >
                    {isSubmitting ? "提交中..." : "发表评论"}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-farm-cream-light p-4 rounded-lg mb-8">
              <p className="text-center">
                请 <Link to="/login" className="text-farm-green hover:underline">登录</Link> 后发表评论
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{comment.user.name}</h4>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">暂无评论，来发表第一条评论吧！</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { NewsList, NewsDetail };
