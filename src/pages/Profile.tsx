
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Edit2, Save } from "lucide-react";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "/placeholder.svg"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // 如果用户未登录，重定向到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await updateProfile({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
        avatar: formData.avatar
      });
      
      if (success) {
        setIsEditing(false);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
                    <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-bold">{user?.username}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <p className="mt-2 text-sm px-4 py-1 bg-farm-cream rounded-full">
                    {user?.role === "admin" ? "管理员" : user?.role === "shop" ? "商家" : "用户"}
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">{user?.email || "未设置邮箱"}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">{user?.phone || "未设置电话"}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">{user?.address || "未设置地址"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>个人资料</CardTitle>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 size={16} className="mr-2" /> 编辑资料
                    </Button>
                  ) : null}
                </div>
                <CardDescription>
                  查看和更新您的个人信息
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">用户名</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">电话</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">地址</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">个人简介</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              username: user?.username || "",
                              email: user?.email || "",
                              phone: user?.phone || "",
                              address: user?.address || "",
                              bio: user?.bio || "",
                              avatar: user?.avatar || "/placeholder.svg"
                            });
                          }}
                        >
                          取消
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-farm-green hover:bg-farm-green-dark"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              保存中...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Save size={16} className="mr-2" /> 保存更改
                            </span>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
