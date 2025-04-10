
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
import { toast } from "@/hooks/use-toast";
import { 
  StoreFront, 
  Package, 
  CircleDollarSign, 
  Pencil, 
  Trash2, 
  Search,
  PlusCircle
} from "lucide-react";

// 模拟商店数据类型
interface Store {
  id: string;
  name: string;
  owner: string;
  products: number;
  revenue: number;
  status: "active" | "pending" | "suspended";
  joinDate: string;
  address: string;
}

const StoreManagement = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newStore, setNewStore] = useState<Omit<Store, "id" | "products" | "revenue">>({
    name: "",
    owner: "",
    status: "pending",
    joinDate: new Date().toISOString().split('T')[0],
    address: ""
  });

  // 模拟获取商店列表
  useEffect(() => {
    // 这里应该是从服务器获取商店列表
    // 暂时使用本地模拟数据
    const mockStores: Store[] = [
      { 
        id: "1", 
        name: "有机农场店", 
        owner: "张三", 
        products: 32, 
        revenue: 53260, 
        status: "active", 
        joinDate: "2023-01-15",
        address: "北京市海淀区农大路"
      },
      { 
        id: "2", 
        name: "鲜果之家", 
        owner: "李四", 
        products: 45, 
        revenue: 78420, 
        status: "active", 
        joinDate: "2023-02-20",
        address: "上海市浦东新区张江高科技园区"
      },
      { 
        id: "3", 
        name: "绿色蔬菜铺", 
        owner: "王五", 
        products: 18, 
        revenue: 21530, 
        status: "pending", 
        joinDate: "2023-04-05",
        address: "广州市天河区珠江新城"
      },
      { 
        id: "4", 
        name: "山珍海味店", 
        owner: "赵六", 
        products: 27, 
        revenue: 43650, 
        status: "suspended", 
        joinDate: "2023-03-10",
        address: "重庆市渝中区解放碑"
      },
      { 
        id: "5", 
        name: "生态农产品", 
        owner: "孙七", 
        products: 38, 
        revenue: 65840, 
        status: "active", 
        joinDate: "2023-05-22",
        address: "成都市武侯区科华北路"
      }
    ];
    setStores(mockStores);
  }, []);

  // 过滤商店列表
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理创建商店
  const handleCreateStore = () => {
    // 这里应该是发送请求到服务器创建商店
    // 暂时使用本地数据模拟
    const newId = (parseInt(stores[stores.length - 1]?.id || "0") + 1).toString();
    const createdStore: Store = {
      ...newStore,
      id: newId,
      products: 0,
      revenue: 0
    };
    
    setStores([...stores, createdStore]);
    setNewStore({
      name: "",
      owner: "",
      status: "pending",
      joinDate: new Date().toISOString().split('T')[0],
      address: ""
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "创建成功",
      description: `已成功创建商店 ${createdStore.name}`
    });
  };

  // 处理编辑商店
  const handleEditStore = () => {
    // 这里应该是发送请求到服务器更新商店
    // 暂时使用本地数据模拟
    if (!editingStore) return;
    
    const updatedStores = stores.map(s => 
      s.id === editingStore.id ? editingStore : s
    );
    setStores(updatedStores);
    setIsEditDialogOpen(false);
    
    toast({
      title: "更新成功",
      description: `已成功更新商店 ${editingStore.name} 的信息`
    });
  };

  // 处理删除商店
  const handleDeleteStore = () => {
    // 这里应该是发送请求到服务器删除商店
    // 暂时使用本地数据模拟
    if (!editingStore) return;
    
    const filteredStores = stores.filter(s => s.id !== editingStore.id);
    setStores(filteredStores);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "删除成功",
      description: `已成功删除商店 ${editingStore.name}`
    });
  };

  // 格式化收入
  const formatRevenue = (revenue: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(revenue);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">商店管理</CardTitle>
            <CardDescription>管理系统中的所有商店信息</CardDescription>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-farm-green hover:bg-farm-green-dark">
                <PlusCircle className="mr-2 h-4 w-4" />
                添加商店
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新商店</DialogTitle>
                <DialogDescription>
                  填写以下信息创建新商店
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    商店名称
                  </label>
                  <Input
                    id="name"
                    value={newStore.name}
                    onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="owner" className="text-right">
                    店主
                  </label>
                  <Input
                    id="owner"
                    value={newStore.owner}
                    onChange={(e) => setNewStore({...newStore, owner: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">
                    状态
                  </label>
                  <Select 
                    value={newStore.status} 
                    onValueChange={(value: "active" | "pending" | "suspended") => 
                      setNewStore({...newStore, status: value})
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">活跃</SelectItem>
                      <SelectItem value="pending">待审核</SelectItem>
                      <SelectItem value="suspended">已暂停</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="address" className="text-right">
                    地址
                  </label>
                  <Input
                    id="address"
                    value={newStore.address}
                    onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </Button>
                <Button className="bg-farm-green hover:bg-farm-green-dark" onClick={handleCreateStore}>
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
              placeholder="搜索商店..."
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
                  <TableHead>商店名</TableHead>
                  <TableHead>店主</TableHead>
                  <TableHead>产品数</TableHead>
                  <TableHead>收入</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>加入日期</TableHead>
                  <TableHead>地址</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell>{store.id}</TableCell>
                      <TableCell className="font-medium">{store.name}</TableCell>
                      <TableCell>{store.owner}</TableCell>
                      <TableCell>{store.products}</TableCell>
                      <TableCell>{formatRevenue(store.revenue)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          store.status === "active" 
                            ? "bg-green-100 text-green-800" 
                            : store.status === "pending" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-red-100 text-red-800"
                        }`}>
                          {store.status === "active" 
                            ? "活跃" 
                            : store.status === "pending" 
                              ? "待审核" 
                              : "已暂停"}
                        </span>
                      </TableCell>
                      <TableCell>{store.joinDate}</TableCell>
                      <TableCell>{store.address}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog open={isEditDialogOpen && editingStore?.id === store.id} onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (open) setEditingStore(store);
                          }}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">编辑</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>编辑商店</DialogTitle>
                                <DialogDescription>
                                  修改商店信息
                                </DialogDescription>
                              </DialogHeader>
                              {editingStore && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-name" className="text-right">
                                      商店名称
                                    </label>
                                    <Input
                                      id="edit-name"
                                      value={editingStore.name}
                                      onChange={(e) => setEditingStore({...editingStore, name: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-owner" className="text-right">
                                      店主
                                    </label>
                                    <Input
                                      id="edit-owner"
                                      value={editingStore.owner}
                                      onChange={(e) => setEditingStore({...editingStore, owner: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-status" className="text-right">
                                      状态
                                    </label>
                                    <Select 
                                      value={editingStore.status} 
                                      onValueChange={(value: "active" | "pending" | "suspended") => 
                                        setEditingStore({...editingStore, status: value})
                                      }
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="选择状态" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">活跃</SelectItem>
                                        <SelectItem value="pending">待审核</SelectItem>
                                        <SelectItem value="suspended">已暂停</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-address" className="text-right">
                                      地址
                                    </label>
                                    <Input
                                      id="edit-address"
                                      value={editingStore.address}
                                      onChange={(e) => setEditingStore({...editingStore, address: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  取消
                                </Button>
                                <Button onClick={handleEditStore}>
                                  保存
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog open={isDeleteDialogOpen && editingStore?.id === store.id} onOpenChange={(open) => {
                            setIsDeleteDialogOpen(open);
                            if (open) setEditingStore(store);
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
                                  您确定要删除商店 "{editingStore?.name}" 吗？此操作不可撤销。
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                  取消
                                </Button>
                                <Button variant="destructive" onClick={handleDeleteStore}>
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
                    <TableCell colSpan={9} className="h-24 text-center">
                      未找到符合条件的商店
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

export default StoreManagement;
