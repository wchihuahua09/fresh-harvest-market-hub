
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// 定义用户角色类型
export type UserRole = "user" | "admin" | "shop";

// 定义用户类型
export interface User {
  id: string;
  username: string;
  role: UserRole;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

// 定义认证上下文的状态和方法
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 模拟用户数据
const MOCK_USERS = [
  { id: "1", username: "user", password: "password", role: "user" as UserRole, avatar: "/placeholder.svg", email: "user@example.com", phone: "13800138000", address: "北京市海淀区" },
  { id: "2", username: "admin", password: "password", role: "admin" as UserRole, avatar: "/placeholder.svg", email: "admin@example.com", phone: "13900139000", address: "上海市浦东新区" },
  { id: "3", username: "shop", password: "password", role: "shop" as UserRole, avatar: "/placeholder.svg", email: "shop@example.com", phone: "13700137000", address: "广州市天河区" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(MOCK_USERS);

  // 检查本地存储的用户会话
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 在模拟用户中查找匹配的用户
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      // 检查角色是否匹配
      if (role && foundUser.role !== role) {
        toast({
          title: "登录失败",
          description: "您没有权限以该角色登录",
          variant: "destructive",
        });
        return false;
      }
      
      // 创建不包含密码的用户对象
      const { password: _, ...safeUser } = foundUser;
      
      // 保存到状态和本地存储
      setUser(safeUser as User);
      localStorage.setItem("user", JSON.stringify(safeUser));
      
      toast({
        title: "登录成功",
        description: `欢迎回来，${safeUser.username}!`,
      });
      return true;
    } else {
      toast({
        title: "登录失败",
        description: "用户名或密码错误",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (username: string, password: string, email: string): Promise<boolean> => {
    // 检查用户名是否已存在
    if (users.some(u => u.username === username)) {
      toast({
        title: "注册失败",
        description: "用户名已存在",
        variant: "destructive",
      });
      return false;
    }
    
    // 检查邮箱是否已存在
    if (users.some(u => u.email === email)) {
      toast({
        title: "注册失败",
        description: "邮箱已被使用",
        variant: "destructive",
      });
      return false;
    }
    
    // 创建新用户 - 修复：添加缺少的 phone 和 address 字段
    const newUser = {
      id: (users.length + 1).toString(),
      username,
      password,
      email,
      role: "user" as UserRole,
      avatar: "/placeholder.svg",
      phone: "", // 添加空的电话字段
      address: "", // 添加空的地址字段
    };
    
    // 更新用户列表
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    // 自动登录
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser as User);
    localStorage.setItem("user", JSON.stringify(safeUser));
    
    toast({
      title: "注册成功",
      description: `欢迎，${username}!`,
    });
    return true;
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!user) {
      toast({
        title: "更新失败",
        description: "您需要先登录",
        variant: "destructive",
      });
      return false;
    }
    
    // 更新用户数据
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    // 同时更新模拟用户列表中的用户数据
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...profileData, password: u.password } : u
    );
    setUsers(updatedUsers);
    
    toast({
      title: "更新成功",
      description: "个人资料已更新",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "已登出",
      description: "您已成功登出系统",
    });
  };

  // 检查用户是否具有指定角色
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
        register,
        updateProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 创建钩子以便于使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
