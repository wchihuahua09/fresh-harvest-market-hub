
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Store, 
  Settings, 
  LogOut, 
  Lock, 
  FileText
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import StoreManagement from "@/components/admin/StoreManagement";
import SystemSettings from "@/components/admin/SystemSettings";
import NewsManagement from "@/components/admin/NewsManagement";
import ChangePassword from "@/components/admin/ChangePassword";

const Admin = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

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
        
        <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users" className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              <span>用户管理</span>
            </TabsTrigger>
            <TabsTrigger value="stores" className="flex items-center justify-center">
              <Store className="h-4 w-4 mr-2" />
              <span>商店管理</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>资讯管理</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center justify-center">
              <Lock className="h-4 w-4 mr-2" />
              <span>修改密码</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center">
              <Settings className="h-4 w-4 mr-2" />
              <span>系统设置</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="stores" className="mt-6">
            <StoreManagement />
          </TabsContent>
          
          <TabsContent value="news" className="mt-6">
            <NewsManagement />
          </TabsContent>
          
          <TabsContent value="password" className="mt-6">
            <ChangePassword />
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
