
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Store, Package, BarChart3, Users, FileText, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductManagement from "@/components/shop/ProductManagement";
import SalesStatistics from "@/components/shop/SalesStatistics";
import CustomerManagement from "@/components/shop/CustomerManagement";
import OrderDetails from "@/components/shop/OrderDetails";

const Shop = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // 如果用户没有商店权限，重定向到登录页
  if (!hasRole("shop")) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Store className="h-10 w-10 text-farm-green mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-farm-brown">商店管理系统</h1>
              <p className="text-gray-600">欢迎回来，{user?.username}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            登出
          </Button>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center justify-center">
              <Store className="h-4 w-4 mr-2" />
              <span>概览</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center justify-center">
              <Package className="h-4 w-4 mr-2" />
              <span>产品管理</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center justify-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span>销售统计</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              <span>客户管理</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>订单详情</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-farm-cream p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("products")}>
                <Package className="h-8 w-8 text-farm-green mb-4" />
                <h2 className="text-xl font-bold mb-2">产品管理</h2>
                <p className="text-gray-600 mb-4">管理您的产品、价格和库存</p>
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
              </div>
              
              <div className="bg-farm-cream p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("sales")}>
                <BarChart3 className="h-8 w-8 text-farm-green mb-4" />
                <h2 className="text-xl font-bold mb-2">销售统计</h2>
                <p className="text-gray-600 mb-4">查看销售数据和报表</p>
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
              </div>
              
              <div className="bg-farm-cream p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("customers")}>
                <Users className="h-8 w-8 text-farm-green mb-4" />
                <h2 className="text-xl font-bold mb-2">客户管理</h2>
                <p className="text-gray-600 mb-4">管理客户信息和订单</p>
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
              </div>
              
              <div className="bg-farm-cream p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("orders")}>
                <FileText className="h-8 w-8 text-farm-green mb-4" />
                <h2 className="text-xl font-bold mb-2">订单详情</h2>
                <p className="text-gray-600 mb-4">查看和管理订单信息</p>
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">最近订单</h2>
              <div className="space-y-4">
                {[
                  { order: "#10023", customer: "李明", amount: "¥328.50", status: "已完成", time: "今天 14:30" },
                  { order: "#10022", customer: "王芳", amount: "¥156.80", status: "处理中", time: "今天 11:20" },
                  { order: "#10021", customer: "张伟", amount: "¥432.00", status: "已完成", time: "昨天 16:45" }
                ].map((order, i) => (
                  <div key={i} className="border-b pb-4 last:border-0 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{order.order} - {order.customer}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{order.amount}</p>
                      <p className="text-sm text-gray-500">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <ProductManagement />
          </TabsContent>
          
          <TabsContent value="sales" className="mt-6">
            <SalesStatistics />
          </TabsContent>
          
          <TabsContent value="customers" className="mt-6">
            <CustomerManagement />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <OrderDetails />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Shop;
