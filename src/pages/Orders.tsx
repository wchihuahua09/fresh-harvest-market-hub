
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Truck,
  Check,
  X,
  Star,
  ChevronRight,
  ArrowLeft,
  Clock,
  CreditCard,
  PackageCheck,
  MessageCircle
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

// 模拟订单数据
const mockOrders = [
  {
    id: "ORD-123456-ABC",
    date: "2025-04-10",
    status: "待付款",
    items: [
      { id: 1, name: "有机胡萝卜", price: 5.99, quantity: 2, image: "/placeholder.svg" },
      { id: 2, name: "新鲜苹果", price: 8.50, quantity: 3, image: "/placeholder.svg" },
    ],
    total: 37.48,
    shippingFee: 12.00,
    shop: {
      id: 1,
      name: "绿色农场",
      avatar: "/placeholder.svg"
    }
  },
  {
    id: "ORD-654321-XYZ",
    date: "2025-04-08",
    status: "已发货",
    items: [
      { id: 3, name: "农家鸡蛋", price: 12.99, quantity: 1, image: "/placeholder.svg" },
      { id: 4, name: "有机菠菜", price: 4.99, quantity: 2, image: "/placeholder.svg" },
    ],
    total: 22.97,
    shippingFee: 8.00,
    tracking: "SF1234567890",
    shop: {
      id: 2,
      name: "天然家园",
      avatar: "/placeholder.svg"
    }
  },
  {
    id: "ORD-789012-DEF",
    date: "2025-04-05",
    status: "待收货",
    items: [
      { id: 5, name: "山羊奶酪", price: 18.75, quantity: 1, image: "/placeholder.svg" },
    ],
    total: 18.75,
    shippingFee: 5.00,
    tracking: "YT9876543210",
    shop: {
      id: 3,
      name: "奶制品专家",
      avatar: "/placeholder.svg"
    }
  },
  {
    id: "ORD-345678-GHI",
    date: "2025-04-01",
    status: "已完成",
    items: [
      { id: 6, name: "新鲜蓝莓", price: 15.99, quantity: 2, image: "/placeholder.svg" },
      { id: 7, name: "有机草莓", price: 13.50, quantity: 1, image: "/placeholder.svg" },
    ],
    total: 45.48,
    shippingFee: 10.00,
    rating: 5,
    review: "水果非常新鲜，包装也很好，物流速度快，非常满意！",
    shop: {
      id: 4,
      name: "水果天地",
      avatar: "/placeholder.svg"
    }
  },
];

// 获取状态对应的样式和图标
const getStatusInfo = (status: string) => {
  switch (status) {
    case "待付款":
      return { color: "bg-yellow-100 text-yellow-800", icon: <CreditCard className="h-4 w-4 mr-1" /> };
    case "处理中":
      return { color: "bg-blue-100 text-blue-800", icon: <Clock className="h-4 w-4 mr-1" /> };
    case "已发货":
      return { color: "bg-purple-100 text-purple-800", icon: <Truck className="h-4 w-4 mr-1" /> };
    case "待收货":
      return { color: "bg-indigo-100 text-indigo-800", icon: <PackageCheck className="h-4 w-4 mr-1" /> };
    case "已完成":
      return { color: "bg-green-100 text-green-800", icon: <Check className="h-4 w-4 mr-1" /> };
    case "已取消":
      return { color: "bg-red-100 text-red-800", icon: <X className="h-4 w-4 mr-1" /> };
    default:
      return { color: "bg-gray-100 text-gray-800", icon: <FileText className="h-4 w-4 mr-1" /> };
  }
};

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [returnReason, setReturnReason] = useState("");

  // 根据选中的标签过滤订单
  const filteredOrders = selectedTab === "all" 
    ? mockOrders 
    : mockOrders.filter(order => {
        if (selectedTab === "unpaid") return order.status === "待付款";
        if (selectedTab === "processing") return order.status === "处理中";
        if (selectedTab === "shipped") return order.status === "已发货" || order.status === "待收货";
        if (selectedTab === "completed") return order.status === "已完成";
        return true;
      });

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handlePayOrder = (orderId: string) => {
    toast({
      title: "已跳转到支付页面",
      description: `订单号: ${orderId}`,
    });
    // 这里可以实现跳转到支付页面的逻辑
  };

  const handleConfirmReceipt = (orderId: string) => {
    // 模拟确认收货
    setShowOrderDetails(false);
    
    setTimeout(() => {
      toast({
        title: "已确认收货",
        description: "请对您购买的商品进行评价",
      });
      setSelectedOrder({...selectedOrder, status: "已完成"});
      setShowOrderDetails(true);
      setShowReviewDialog(true);
    }, 500);
  };

  const handleSubmitReview = () => {
    setShowReviewDialog(false);
    
    // 模拟提交评价
    setTimeout(() => {
      toast({
        title: "评价提交成功",
        description: "感谢您的评价！",
      });
      setSelectedOrder({...selectedOrder, rating, review: reviewText});
    }, 500);
  };

  const handleReturnRequest = () => {
    setShowReturnDialog(false);
    
    // 模拟退货请求
    setTimeout(() => {
      toast({
        title: "退货申请已提交",
        description: "商家将尽快处理您的退货请求",
      });
      setSelectedOrder({...selectedOrder, status: "退货中"});
    }, 500);
  };

  const handleCancelOrder = (orderId: string) => {
    setShowOrderDetails(false);
    
    // 模拟取消订单
    setTimeout(() => {
      toast({
        title: "订单已取消",
        description: `订单号: ${orderId} 已被取消`,
      });
    }, 500);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-farm-green hover:underline mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回首页
        </Link>
        <h1 className="text-2xl font-bold text-farm-brown">我的订单</h1>
        <Button variant="outline" className="ml-auto" asChild>
          <Link to="/customer-service" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            联系客服
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">全部订单</TabsTrigger>
          <TabsTrigger value="unpaid">待付款</TabsTrigger>
          <TabsTrigger value="processing">处理中</TabsTrigger>
          <TabsTrigger value="shipped">待收货</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">没有找到订单</h2>
          <p className="text-gray-500 mb-6">当前分类下没有订单记录</p>
          <Button asChild className="bg-farm-green hover:bg-farm-green-dark">
            <Link to="/products">去购物</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const { color, icon } = getStatusInfo(order.status);
            
            return (
              <Card key={order.id} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={order.shop.avatar} 
                        alt={order.shop.name} 
                        className="h-6 w-6 mr-2 rounded-full" 
                      />
                      <CardTitle className="text-base">{order.shop.name}</CardTitle>
                    </div>
                    <Badge className={color}>
                      <div className="flex items-center">
                        {icon}
                        {order.status}
                      </div>
                    </Badge>
                  </div>
                  <CardDescription>订单号: {order.id} | 下单时间: {order.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-16 w-16 object-cover rounded mr-4" 
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">¥{item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-0">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      共{order.items.reduce((sum, item) => sum + item.quantity, 0)}件商品
                      {" "}小计：<span className="font-medium">¥{order.total.toFixed(2)}</span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {order.status === "待付款" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleCancelOrder(order.id)}>
                          取消订单
                        </Button>
                        <Button size="sm" onClick={() => handlePayOrder(order.id)}>
                          去付款
                        </Button>
                      </>
                    )}
                    {order.status === "已发货" && (
                      <Button size="sm" onClick={() => handleConfirmReceipt(order.id)}>
                        确认收货
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                      查看详情
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* 订单详情对话框 */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
            <DialogDescription>
              订单号: {selectedOrder?.id} | 下单时间: {selectedOrder?.date}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img 
                      src={selectedOrder.shop.avatar} 
                      alt={selectedOrder.shop.name} 
                      className="h-8 w-8 mr-2 rounded-full" 
                    />
                    <div>
                      <p className="font-medium">{selectedOrder.shop.name}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-farm-green">
                        联系卖家
                      </Button>
                    </div>
                  </div>
                  <Badge className={getStatusInfo(selectedOrder.status).color}>
                    <div className="flex items-center">
                      {getStatusInfo(selectedOrder.status).icon}
                      {selectedOrder.status}
                    </div>
                  </Badge>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">订单商品</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-16 w-16 object-cover rounded mr-4" 
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">单价: ¥{item.price.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p>x {item.quantity}</p>
                          <p className="font-medium">¥{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedOrder.tracking && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">物流信息</h3>
                    <p className="text-sm">物流单号: {selectedOrder.tracking}</p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-farm-green">
                      查看物流详情
                    </Button>
                  </div>
                )}
                
                {selectedOrder.rating && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">我的评价</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < selectedOrder.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm">{selectedOrder.review}</p>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">费用明细</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">商品总价:</span>
                      <span>¥{(selectedOrder.total - selectedOrder.shippingFee).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">运费:</span>
                      <span>¥{selectedOrder.shippingFee.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>实付款:</span>
                      <span className="text-lg">¥{selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between sm:justify-between gap-2">
                {selectedOrder.status === "待付款" && (
                  <>
                    <Button variant="outline" onClick={() => handleCancelOrder(selectedOrder.id)}>
                      取消订单
                    </Button>
                    <Button onClick={() => handlePayOrder(selectedOrder.id)}>
                      去付款
                    </Button>
                  </>
                )}
                
                {selectedOrder.status === "已发货" && (
                  <>
                    <Button variant="outline" onClick={() => setShowOrderDetails(false)}>
                      关闭
                    </Button>
                    <Button onClick={() => handleConfirmReceipt(selectedOrder.id)}>
                      确认收货
                    </Button>
                  </>
                )}
                
                {selectedOrder.status === "待收货" && (
                  <>
                    <Button variant="outline" onClick={() => setShowOrderDetails(false)}>
                      关闭
                    </Button>
                    <Button onClick={() => handleConfirmReceipt(selectedOrder.id)}>
                      确认收货
                    </Button>
                  </>
                )}
                
                {selectedOrder.status === "已完成" && !selectedOrder.rating && (
                  <>
                    <Button variant="outline" onClick={() => setShowReturnDialog(true)}>
                      申请退货
                    </Button>
                    <Button onClick={() => setShowReviewDialog(true)}>
                      评价订单
                    </Button>
                  </>
                )}
                
                {(selectedOrder.status === "已完成" && selectedOrder.rating) || ["已取消", "退货中"].includes(selectedOrder.status) ? (
                  <Button variant="outline" className="ml-auto" onClick={() => setShowOrderDetails(false)}>
                    关闭
                  </Button>
                ) : null}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 评价对话框 */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>评价订单</DialogTitle>
            <DialogDescription>
              请对您购买的商品进行评价，您的反馈对我们很重要。
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-6 w-6 cursor-pointer ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>
            <Textarea
              placeholder="请分享您对商品的评价和使用体验..."
              className="min-h-[120px]"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitReview}>
              提交评价
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 退货对话框 */}
      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>申请退货</DialogTitle>
            <DialogDescription>
              请填写退货原因，我们将尽快处理您的退货申请。
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              placeholder="请详细描述退货原因..."
              className="min-h-[120px]"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReturnDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleReturnRequest}>
              提交退货申请
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
