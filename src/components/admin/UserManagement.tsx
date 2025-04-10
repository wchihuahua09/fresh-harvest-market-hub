
import { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { 
  UserPlus, 
  Pencil, 
  Trash2, 
  Search,
  UserRound
} from "lucide-react";

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "user" as UserRole,
    password: "",
    phone: "",
    address: ""
  });

  // 模拟获取用户列表
  useEffect(() => {
    // 这里应该是从服务器获取用户列表
    // 暂时使用本地模拟数据
    const mockUsers = [
      { id: "1", username: "user", role: "user", email: "user@example.com", phone: "13800138000", address: "北京市海淀区" },
      { id: "2", username: "admin", role: "admin", email: "admin@example.com", phone: "13900139000", address: "上海市浦东新区" },
      { id: "3", username: "shop", role: "shop", email: "shop@example.com", phone: "13700137000", address: "广州市天河区" },
      { id: "4", username: "user2", role: "user", email: "user2@example.com", phone: "13600136000", address: "深圳市南山区" },
      { id: "5", username: "shop2", role: "shop", email: "shop2@example.com", phone: "13500135000", address: "成都市武侯区" }
    ];
    setUsers(mockUsers);
  }, []);

  // 过滤用户列表
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理创建用户
  const handleCreateUser = () => {
    // 这里应该是发送请求到服务器创建用户
    // 暂时使用本地数据模拟
    const newId = (parseInt(users[users.length - 1]?.id || "0") + 1).toString();
    const createdUser = {
      ...newUser,
      id: newId,
      avatar: "/placeholder.svg"
    };
    
    setUsers([...users, createdUser]);
    setNewUser({
      username: "",
      email: "",
      role: "user" as UserRole,
      password: "",
      phone: "",
      address: ""
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "创建成功",
      description: `已成功创建用户 ${createdUser.username}`
    });
  };

  // 处理编辑用户
  const handleEditUser = () => {
    // 这里应该是发送请求到服务器更新用户
    // 暂时使用本地数据模拟
    const updatedUsers = users.map(u => 
      u.id === editingUser.id ? editingUser : u
    );
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "更新成功",
      description: `已成功更新用户 ${editingUser.username} 的信息`
    });
  };

  // 处理删除用户
  const handleDeleteUser = () => {
    // 这里应该是发送请求到服务器删除用户
    // 暂时使用本地数据模拟
    const filteredUsers = users.filter(u => u.id !== editingUser.id);
    setUsers(filteredUsers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "删除成功",
      description: `已成功删除用户 ${editingUser.username}`
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">用户管理</CardTitle>
            <CardDescription>管理系统中的所有用户账号</CardDescription>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-farm-green hover:bg-farm-green-dark">
                <UserPlus className="mr-2 h-4 w-4" />
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新用户</DialogTitle>
                <DialogDescription>
                  填写以下信息创建新用户
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right">
                    用户名
                  </label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    邮箱
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="password" className="text-right">
                    密码
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right">
                    角色
                  </label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value) => setNewUser({...newUser, role: value as UserRole})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择角色" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">普通用户</SelectItem>
                      <SelectItem value="shop">商家</SelectItem>
                      <SelectItem value="admin">管理员</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="phone" className="text-right">
                    电话
                  </label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="address" className="text-right">
                    地址
                  </label>
                  <Input
                    id="address"
                    value={newUser.address}
                    onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </Button>
                <Button className="bg-farm-green hover:bg-farm-green-dark" onClick={handleCreateUser}>
                  创建
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索用户..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>用户名</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>电话</TableHead>
                  <TableHead>地址</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin" 
                            ? "bg-red-100 text-red-800" 
                            : user.role === "shop" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-green-100 text-green-800"
                        }`}>
                          {user.role === "admin" 
                            ? "管理员" 
                            : user.role === "shop" 
                              ? "商家" 
                              : "用户"}
                        </span>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog open={isEditDialogOpen && editingUser?.id === user.id} onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (open) setEditingUser(user);
                          }}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">编辑</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>编辑用户</DialogTitle>
                                <DialogDescription>
                                  修改用户信息
                                </DialogDescription>
                              </DialogHeader>
                              {editingUser && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-username" className="text-right">
                                      用户名
                                    </label>
                                    <Input
                                      id="edit-username"
                                      value={editingUser.username}
                                      onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-email" className="text-right">
                                      邮箱
                                    </label>
                                    <Input
                                      id="edit-email"
                                      type="email"
                                      value={editingUser.email}
                                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-role" className="text-right">
                                      角色
                                    </label>
                                    <Select 
                                      value={editingUser.role} 
                                      onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="选择角色" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="user">普通用户</SelectItem>
                                        <SelectItem value="shop">商家</SelectItem>
                                        <SelectItem value="admin">管理员</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-phone" className="text-right">
                                      电话
                                    </label>
                                    <Input
                                      id="edit-phone"
                                      value={editingUser.phone}
                                      onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-address" className="text-right">
                                      地址
                                    </label>
                                    <Input
                                      id="edit-address"
                                      value={editingUser.address}
                                      onChange={(e) => setEditingUser({...editingUser, address: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  取消
                                </Button>
                                <Button onClick={handleEditUser}>
                                  保存
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog open={isDeleteDialogOpen && editingUser?.id === user.id} onOpenChange={(open) => {
                            setIsDeleteDialogOpen(open);
                            if (open) setEditingUser(user);
                          }}>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">删除</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>确认删除</DialogTitle>
                                <DialogDescription>
                                  您确定要删除用户 "{editingUser?.username}" 吗？此操作不可撤销。
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                  取消
                                </Button>
                                <Button variant="destructive" onClick={handleDeleteUser}>
                                  删除
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      未找到符合条件的用户
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
