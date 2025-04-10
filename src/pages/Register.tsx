
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth, UserRole, ShopDetails } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Mail, Lock, User, Store, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// 用户注册表单验证
const userFormSchema = z.object({
  username: z.string().min(3, "用户名至少需要3个字符").max(20, "用户名最多20个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少需要6个字符"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "两次输入的密码不匹配",
  path: ["confirmPassword"],
});

// 商店注册表单验证
const shopFormSchema = z.object({
  username: z.string().min(3, "用户名至少需要3个字符").max(20, "用户名最多20个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少需要6个字符"),
  confirmPassword: z.string(),
  shopName: z.string().min(2, "商店名称至少需要2个字符").max(50, "商店名称最多50个字符"),
  location: z.string().min(5, "地址至少需要5个字符"),
  description: z.string().optional(),
  contactPhone: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "两次输入的密码不匹配",
  path: ["confirmPassword"],
});

type UserFormValues = z.infer<typeof userFormSchema>;
type ShopFormValues = z.infer<typeof shopFormSchema>;

const Register = () => {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<UserRole>("user");
  
  // 用户表单
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  // 商店表单
  const shopForm = useForm<ShopFormValues>({
    resolver: zodResolver(shopFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      shopName: "",
      location: "",
      description: "",
      contactPhone: "",
    },
  });
  
  // 如果用户已登录，重定向到首页
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // 处理普通用户注册
  const onUserSubmit = async (values: UserFormValues) => {
    setIsLoading(true);
    try {
      const success = await register(values.username, values.password, values.email);
      if (success) {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 处理商店注册
  const onShopSubmit = async (values: ShopFormValues) => {
    setIsLoading(true);
    try {
      const shopDetails: ShopDetails = {
        name: values.shopName,
        location: values.location,
        description: values.description,
        contactPhone: values.contactPhone,
        contactEmail: values.email,
      };
      
      const success = await register(
        values.username, 
        values.password, 
        values.email, 
        "shop", 
        shopDetails
      );
      
      if (success) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-farm-cream-light p-4">
      <Card className="w-full max-w-md shadow-lg border-farm-cream-dark">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-farm-brown">注册账号</CardTitle>
          <CardDescription>
            创建一个新账号以享受更多服务
          </CardDescription>
        </CardHeader>
        
        <Tabs 
          defaultValue="user" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as UserRole)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4 mx-4">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>普通用户</span>
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span>商店注册</span>
            </TabsTrigger>
          </TabsList>
          
          {/* 普通用户注册表单 */}
          <TabsContent value="user">
            <CardContent>
              <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                  <FormField
                    control={userForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户名</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="请输入用户名" 
                              {...field} 
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="请输入邮箱地址" 
                              type="email"
                              {...field}
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="请输入密码" 
                              type="password"
                              {...field}
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>确认密码</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="请再次输入密码" 
                              type="password"
                              {...field}
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-farm-green hover:bg-farm-green-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        注册中...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" /> 注册账号
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>
          
          {/* 商店注册表单 */}
          <TabsContent value="shop">
            <CardContent>
              <Form {...shopForm}>
                <form onSubmit={shopForm.handleSubmit(onShopSubmit)} className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">账号信息</h3>
                    
                    <FormField
                      control={shopForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>用户名</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="请输入用户名" 
                                {...field} 
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={shopForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>邮箱</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="请输入邮箱地址" 
                                type="email"
                                {...field}
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={shopForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>密码</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="请输入密码" 
                                type="password"
                                {...field}
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={shopForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>确认密码</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="请再次输入密码" 
                                type="password"
                                {...field}
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-700">商店信息</h3>
                    
                    <FormField
                      control={shopForm.control}
                      name="shopName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>商店名称</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Store className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="请输入商店名称" 
                                {...field} 
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={shopForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>商店地址</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="请输入商店地址" 
                                {...field} 
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={shopForm.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>联系电话</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="请输入联系电话" 
                                {...field} 
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={shopForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>商店描述</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="请描述您的商店特色和经营范围..." 
                              {...field} 
                              className="min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-farm-green hover:bg-farm-green-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        提交中...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Store className="mr-2 h-4 w-4" /> 申请入驻
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center">
            已有账号？
            <Link to="/login" className="text-farm-green hover:underline ml-1">
              登录
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
