
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Lock,
  ShoppingBag,
  Users,
  BarChart,
  Star,
  Map,
  FileText
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductManagement from "@/components/shop/ProductManagement";
import CustomerManagement from "@/components/shop/CustomerManagement";
import SalesStatistics from "@/components/shop/SalesStatistics";
import ReviewManagement from "@/components/shop/ReviewManagement";
import ProductOriginManagement from "@/components/shop/ProductOriginManagement";
import ChangePassword from "@/components/admin/ChangePassword";
import OrderDetails from "@/components/shop/OrderDetails";

const ShopDashboard = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  // 如果用户没有商家权限，重定向到登录页
  if (!hasRole("shop")) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-farm-brown">商家管理中心</h1>
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
        
        <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="products" className="flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span>产品管理</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>订单管理</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              <span>客户管理</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center justify-center">
              <BarChart className="h-4 w-4 mr-2" />
              <span>销售统计</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center justify-center">
              <Star className="h-4 w-4 mr-2" />
              <span>评价管理</span>
            </TabsTrigger>
            <TabsTrigger value="origins" className="flex items-center justify-center">
              <Map className="h-4 w-4 mr-2" />
              <span>产地管理</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center justify-center">
              <Lock className="h-4 w-4 mr-2" />
              <span>修改密码</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-6">
            <ProductManagement />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <OrderDetails />
          </TabsContent>
          
          <TabsContent value="customers" className="mt-6">
            <CustomerManagement />
          </TabsContent>
          
          <TabsContent value="sales" className="mt-6">
            <SalesStatistics />
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <ReviewManagement />
          </TabsContent>
          
          <TabsContent value="origins" className="mt-6">
            <ProductOriginManagement />
          </TabsContent>
          
          <TabsContent value="password" className="mt-6">
            <ChangePassword />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ShopDashboard;
