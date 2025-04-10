
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, Users, Store, Settings, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import StoreManagement from "@/components/admin/StoreManagement";
import SystemSettings from "@/components/admin/SystemSettings";

const Admin = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // 如果用户没有管理员权限，重定向到登录页
  if (!hasRole("admin")) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Shield className="h-10 w-10 text-farm-brown mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-farm-brown">管理员控制台</h1>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center justify-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>概览</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              <span>用户管理</span>
            </TabsTrigger>
            <TabsTrigger value="stores" className="flex items-center justify-center">
              <Store className="h-4 w-4 mr-2" />
              <span>商店管理</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center">
              <Settings className="h-4 w-4 mr-2" />
              <span>系统设置</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-farm-cream p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("users")}>
                <Users className="h-8 w-8 text-farm-green mb-4" />
                <h2 className="text-xl font-bold mb-2">用户管理</h2>
                <p className="text-gray-600 mb-4">管理系统用户、权限和角色</p>
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
              </div>
              
              <div className="bg-farm-cream p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("stores")}>
                <Store className="h-8 w-8 text-farm-green mb-4" />
                <h2 className="text-xl font-bold mb-2">商店管理</h2>
                <p className="text-gray-600 mb-4">管理商店、产品和库存</p>
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
              </div>
              
              <div className="bg-farm-cream p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("settings")}>
                <Settings className="h-8 w-8 text-farm-green mb-4" />
                <h2 className="text-xl font-bold mb-2">系统设置</h2>
                <p className="text-gray-600 mb-4">配置系统参数和全局设置</p>
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark">访问</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">最近活动</h2>
              <div className="space-y-4">
                {[
                  { action: "系统更新完成", time: "2小时前" },
                  { action: "新用户注册", time: "4小时前" },
                  { action: "新商店申请审核", time: "昨天" }
                ].map((activity, i) => (
                  <div key={i} className="border-b pb-4 last:border-0">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="stores" className="mt-6">
            <StoreManagement />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
