
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  FileText, 
  ChevronDown,
  Check,
  Truck,
  PackageCheck,
  PackageX,
  Clock,
  Calendar,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const getStatusColor = (status: string) => {
  switch (status) {
    case "已完成":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "处理中":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "已发货":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    case "已取消":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "待付款":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "已完成":
      return <Check className="h-4 w-4 mr-1" />;
    case "处理中":
      return <Clock className="h-4 w-4 mr-1" />;
    case "已发货":
      return <Truck className="h-4 w-4 mr-1" />;
    case "已取消":
      return <PackageX className="h-4 w-4 mr-1" />;
    case "待付款":
      return <Calendar className="h-4 w-4 mr-1" />;
    default:
      return <FileText className="h-4 w-4 mr-1" />;
  }
};

const OrderDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // 模拟订单数据
  const orders = [
    { 
      id: "10025", 
      customer: "李明", 
      date: "2025-04-10", 
      amount: 328.50, 
      items: 5, 
      status: "已完成", 
      paymentMethod: "支付宝",
      address: "北京市朝阳区建国路89号",
      phone: "138****1234"
    },
    { 
      id: "10024", 
      customer: "王芳", 
      date: "2025-04-09", 
      amount: 156.80, 
      items: 3, 
      status: "已发货", 
      paymentMethod: "微信支付",
      address: "上海市浦东新区张杨路500号",
      phone: "139****5678"
    },
    { 
      id: "10023", 
      customer: "张伟", 
      date: "2025-04-08", 
      amount: 432.00, 
      items: 7, 
      status: "处理中", 
      paymentMethod: "支付宝",
      address: "广州市天河区天河路385号",
      phone: "137****9012"
    },
    { 
      id: "10022", 
      customer: "刘芳", 
      date: "2025-04-07", 
      amount: 89.90, 
      items: 2, 
      status: "待付款", 
      paymentMethod: "待支付",
      address: "深圳市南山区科技园路1号",
      phone: "135****3456"
    },
    { 
      id: "10021", 
      customer: "陈明", 
      date: "2025-04-06", 
      amount: 245.60, 
      items: 4, 
      status: "已取消", 
      paymentMethod: "未支付",
      address: "成都市武侯区人民南路四段",
      phone: "136****7890"
    },
  ];

  // 模拟订单详情中的产品数据
  const orderItems = [
    { 
      id: 1, 
      name: "有机胡萝卜", 
      price: 5.99, 
      quantity: 2, 
      total: 11.98,
      image: "/placeholder.svg" 
    },
    { 
      id: 2, 
      name: "新鲜苹果", 
      price: 8.50, 
      quantity: 3, 
      total: 25.50,
      image: "/placeholder.svg" 
    },
    { 
      id: 3, 
      name: "农家鸡蛋", 
      price: 12.99, 
      quantity: 1, 
      total: 12.99,
      image: "/placeholder.svg" 
    },
    { 
      id: 4, 
      name: "蓝莓", 
      price: 15.99, 
      quantity: 2, 
      total: 31.98,
      image: "/placeholder.svg" 
    },
    { 
      id: 5, 
      name: "山羊奶酪", 
      price: 18.75, 
      quantity: 1, 
      total: 18.75,
      image: "/placeholder.svg" 
    },
  ];

  const statuses = ["已完成", "处理中", "已发货", "待付款", "已取消"];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.includes(searchQuery) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  // 模拟订单的物流跟踪数据
  const trackingData = [
    { date: "2025-04-10 10:30", event: "订单已送达", location: "北京市朝阳区" },
    { date: "2025-04-09 08:45", event: "派送中", location: "北京市朝阳区快递站" },
    { date: "2025-04-08 20:15", event: "到达派送点", location: "北京市快递中心" },
    { date: "2025-04-08 12:30", event: "运输中", location: "上海转运中心发出" },
    { date: "2025-04-08 08:00", event: "已发货", location: "上海仓库" },
    { date: "2025-04-07 16:45", event: "订单已打包", location: "上海仓库" },
    { date: "2025-04-07 10:20", event: "订单已确认", location: "系统" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-farm-brown">订单详情</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索订单号或客户名..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="所有状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有状态</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>今日订单</DropdownMenuItem>
            <DropdownMenuItem>本周订单</DropdownMenuItem>
            <DropdownMenuItem>本月订单</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>金额（高-低）</DropdownMenuItem>
            <DropdownMenuItem>金额（低-高）</DropdownMenuItem>
            <DropdownMenuItem>最新订单</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="p-2 rounded-full bg-green-100 mb-2">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">已完成</p>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === "已完成").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="p-2 rounded-full bg-blue-100 mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">处理中</p>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === "处理中").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="p-2 rounded-full bg-purple-100 mb-2">
                <Truck className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">已发货</p>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === "已发货").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="p-2 rounded-full bg-yellow-100 mb-2">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">待付款</p>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === "待付款").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="p-2 rounded-full bg-red-100 mb-2">
                <PackageX className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">已取消</p>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === "已取消").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>日期</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>商品数</TableHead>
              <TableHead>支付方式</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>¥{order.amount.toFixed(2)}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => viewOrderDetail(order)}>
                    查看详情
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* 订单详情对话框 */}
      <Dialog open={showOrderDetail} onOpenChange={setShowOrderDetail}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl">订单 #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="py-4">
              <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">订单日期: {selectedOrder.date}</p>
                </div>
                <Badge className={getStatusColor(selectedOrder.status)}>
                  <div className="flex items-center">
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </div>
                </Badge>
              </div>
              
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">订单详情</TabsTrigger>
                  <TabsTrigger value="tracking">物流跟踪</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">客户信息</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{selectedOrder.customer}</p>
                        <p className="text-sm text-gray-500">{selectedOrder.phone}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">配送地址</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedOrder.address}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">支付信息</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">支付方式: {selectedOrder.paymentMethod}</p>
                        <p className="text-sm">总金额: ¥{selectedOrder.amount.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>订单商品</CardTitle>
                      <CardDescription>订单中包含的所有商品</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>商品</TableHead>
                            <TableHead>单价</TableHead>
                            <TableHead>数量</TableHead>
                            <TableHead className="text-right">小计</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                                  <span>{item.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>¥{item.price.toFixed(2)}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell className="text-right">¥{item.total.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-4 border-t pt-4">
                      <div className="text-right">
                        <div className="flex justify-between">
                          <span>小计:</span>
                          <span className="font-medium">¥{(selectedOrder.amount - 12).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>运费:</span>
                          <span className="font-medium">¥12.00</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between text-lg font-bold">
                          <span>总计:</span>
                          <span>¥{selectedOrder.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tracking">
                  <Card>
                    <CardHeader>
                      <CardTitle>物流跟踪</CardTitle>
                      <CardDescription>订单物流和配送信息</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-1.5 w-px bg-gray-200"></div>
                        {trackingData.map((event, index) => (
                          <div key={index} className="flex mb-6 relative">
                            <div className={`h-3 w-3 rounded-full mt-1.5 mr-3 ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <div className="flex-1">
                              <p className="font-medium">{event.event}</p>
                              <p className="text-sm text-gray-500">{event.location}</p>
                              <p className="text-xs text-gray-400">{event.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">打印订单</Button>
                {selectedOrder.status === "处理中" && (
                  <>
                    <Button variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200">
                      <Truck className="h-4 w-4 mr-2" />
                      标记为已发货
                    </Button>
                  </>
                )}
                {selectedOrder.status === "待付款" && (
                  <Button variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                    <PackageX className="h-4 w-4 mr-2" />
                    取消订单
                  </Button>
                )}
                {(selectedOrder.status === "已发货" || selectedOrder.status === "处理中") && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <PackageCheck className="h-4 w-4 mr-2" />
                    标记为已完成
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderDetails;
