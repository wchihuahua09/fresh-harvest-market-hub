
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Store, Package, BarChart, Users, LogOut } from "lucide-react";

const Shop = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-farm-cream p-6 rounded-lg">
            <Package className="h-8 w-8 text-farm-green mb-4" />
            <h2 className="text-xl font-bold mb-2">产品管理</h2>
            <p className="text-gray-600 mb-4">管理您的产品、价格和库存</p>
            <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
          </div>
          
          <div className="bg-farm-cream p-6 rounded-lg">
            <BarChart className="h-8 w-8 text-farm-green mb-4" />
            <h2 className="text-xl font-bold mb-2">销售统计</h2>
            <p className="text-gray-600 mb-4">查看销售数据和报表</p>
            <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
          </div>
          
          <div className="bg-farm-cream p-6 rounded-lg">
            <Users className="h-8 w-8 text-farm-green mb-4" />
            <h2 className="text-xl font-bold mb-2">客户管理</h2>
            <p className="text-gray-600 mb-4">管理客户信息和订单</p>
            <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">最近订单</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-4 last:border-0">
              <p className="font-medium">订单 #1000{i}</p>
              <p className="text-sm text-gray-500">30分钟前</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
