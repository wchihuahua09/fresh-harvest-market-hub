
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, User, ShieldCheck, Store } from "lucide-react";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // 如果用户已登录，重定向到首页
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (role: UserRole) => {
    if (!username || !password) {
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await login(username, password, role);
      
      if (success) {
        // 基于角色重定向到不同页面
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "shop") {
          navigate("/shop");
        } else {
          navigate("/");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 角色选项卡配置
  const roles = [
    { id: "user", label: "普通用户", icon: <User className="h-5 w-5 mr-2" />, color: "bg-farm-green" },
    { id: "admin", label: "管理员", icon: <ShieldCheck className="h-5 w-5 mr-2" />, color: "bg-farm-brown" },
    { id: "shop", label: "商店", icon: <Store className="h-5 w-5 mr-2" />, color: "bg-farm-cream-dark" },
  ];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-farm-cream-light p-4">
      <Card className="w-full max-w-md shadow-lg border-farm-cream-dark">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-farm-brown">登录</CardTitle>
          <CardDescription>
            请选择您的角色并输入凭据进行登录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              {roles.map(role => (
                <TabsTrigger 
                  key={role.id} 
                  value={role.id}
                  className="flex items-center justify-center"
                >
                  {role.icon}
                  {role.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {roles.map(role => (
              <TabsContent key={role.id} value={role.id}>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(role.id as UserRole);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor={`${role.id}-username`}>用户名</Label>
                    <Input
                      id={`${role.id}-username`}
                      placeholder={`${role.label}用户名`}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${role.id}-password`}>密码</Label>
                    <Input
                      id={`${role.id}-password`}
                      type="password"
                      placeholder="请输入密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className={`w-full ${role.color} hover:opacity-90`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        登录中...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" /> 登录
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground w-full">
            <p>测试账户:</p>
            <p>用户名: user / admin / shop</p>
            <p>密码: password</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
