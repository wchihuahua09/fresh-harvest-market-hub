
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
  Users, 
  Search, 
  ChevronDown,
  FileText,
  Mail,
  Phone
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);

  // 模拟客户数据
  const customers = [
    { 
      id: 1, 
      name: "李明", 
      email: "liming@example.com", 
      phone: "138****1234", 
      location: "北京市朝阳区",
      totalOrders: 12,
      totalSpent: 4580.50,
      lastOrder: "2025-04-05",
      avatar: "/placeholder.svg",
    },
    { 
      id: 2, 
      name: "王芳", 
      email: "wangfang@example.com", 
      phone: "139****5678", 
      location: "上海市浦东新区",
      totalOrders: 8,
      totalSpent: 2850.75,
      lastOrder: "2025-04-08",
      avatar: "/placeholder.svg",
    },
    { 
      id: 3, 
      name: "张伟", 
      email: "zhangwei@example.com", 
      phone: "137****9012", 
      location: "广州市天河区",
      totalOrders: 15,
      totalSpent: 6420.25,
      lastOrder: "2025-04-01",
      avatar: "/placeholder.svg",
    },
    { 
      id: 4, 
      name: "刘芳", 
      email: "liufang@example.com", 
      phone: "135****3456", 
      location: "深圳市南山区",
      totalOrders: 6,
      totalSpent: 1980.60,
      lastOrder: "2025-04-07",
      avatar: "/placeholder.svg",
    },
    { 
      id: 5, 
      name: "陈明", 
      email: "chenming@example.com", 
      phone: "136****7890", 
      location: "成都市武侯区",
      totalOrders: 10,
      totalSpent: 3750.30,
      lastOrder: "2025-04-02",
      avatar: "/placeholder.svg",
    },
  ];

  // 模拟客户的订单数据
  const customerOrders = [
    { id: "10023", date: "2025-04-05", amount: 328.50, status: "已完成" },
    { id: "10019", date: "2025-03-28", amount: 475.20, status: "已完成" },
    { id: "10014", date: "2025-03-15", amount: 198.75, status: "已完成" },
    { id: "10008", date: "2025-02-20", amount: 562.40, status: "已完成" },
  ];

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewCustomerDetail = (customer: any) => {
    setSelectedCustomer(customer);
    setShowCustomerDetail(true);
  };

  // 构建客户名称的首字母作为头像
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-farm-brown">客户管理</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索客户名称、邮箱、电话或地址..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              排序
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>姓名（A-Z）</DropdownMenuItem>
            <DropdownMenuItem>姓名（Z-A）</DropdownMenuItem>
            <DropdownMenuItem>订单数（高-低）</DropdownMenuItem>
            <DropdownMenuItem>消费金额（高-低）</DropdownMenuItem>
            <DropdownMenuItem>最近订单</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">总客户数</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">平均订单数</p>
                <p className="text-2xl font-bold">
                  {(customers.reduce((sum, customer) => sum + customer.totalOrders, 0) / customers.length).toFixed(1)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">平均消费</p>
                <p className="text-2xl font-bold">
                  ¥{(customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.length).toFixed(2)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <ChevronDown className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">本月新客户</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-2 rounded-full bg-orange-100">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>客户</TableHead>
              <TableHead>联系方式</TableHead>
              <TableHead>地址</TableHead>
              <TableHead>订单数</TableHead>
              <TableHead>消费总额</TableHead>
              <TableHead>最近订单</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">客户 #{customer.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>¥{customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => viewCustomerDetail(customer)}>
                    查看详情
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* 客户详情对话框 */}
      <Dialog open={showCustomerDetail} onOpenChange={setShowCustomerDetail}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>客户详情</DialogTitle>
            <DialogDescription>
              查看客户的详细信息和订单历史。
            </DialogDescription>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="py-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                    <AvatarFallback className="text-2xl">{getInitials(selectedCustomer.name)}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                    <p className="text-gray-500">客户 #{selectedCustomer.id}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">联系方式</p>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">地址</p>
                      <p className="mt-1">{selectedCustomer.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">订单统计</p>
                      <p className="mt-1">总订单: <span className="font-medium">{selectedCustomer.totalOrders}</span></p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">消费情况</p>
                      <p className="mt-1">总消费: <span className="font-medium">¥{selectedCustomer.totalSpent.toFixed(2)}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Tabs defaultValue="orders">
                  <TabsList>
                    <TabsTrigger value="orders">订单历史</TabsTrigger>
                    <TabsTrigger value="notes">客户备注</TabsTrigger>
                  </TabsList>
                  <TabsContent value="orders" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>订单历史</CardTitle>
                        <CardDescription>客户的历史订单记录</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>订单号</TableHead>
                              <TableHead>日期</TableHead>
                              <TableHead>金额</TableHead>
                              <TableHead>状态</TableHead>
                              <TableHead>操作</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {customerOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell>#{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>¥{order.amount.toFixed(2)}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                  <Button size="sm" variant="ghost">
                                    查看订单
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="notes" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>客户备注</CardTitle>
                        <CardDescription>关于客户的重要备注</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">暂无客户备注</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;
