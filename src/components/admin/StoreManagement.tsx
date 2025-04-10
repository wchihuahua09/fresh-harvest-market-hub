
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Store, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Check, 
  X 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoreManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [newStore, setNewStore] = useState({
    name: "",
    owner: "",
    location: "",
    description: "",
    contactPhone: "",
    contactEmail: ""
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 模拟数据
  const [stores, setStores] = useState([
    { 
      id: 1, 
      name: "绿色有机农场", 
      owner: "张三", 
      products: 24, 
      status: "active", 
      location: "北京市朝阳区", 
      description: "提供新鲜有机蔬菜的农场",
      contactPhone: "13800138000",
      contactEmail: "farm1@example.com"
    },
    { 
      id: 2, 
      name: "健康蔬果店", 
      owner: "李四", 
      products: 15, 
      status: "pending", 
      location: "上海市浦东新区",
      description: "健康蔬果直供",
      contactPhone: "13900139000",
      contactEmail: "farm2@example.com"
    },
    { 
      id: 3, 
      name: "山村特产店", 
      owner: "王五", 
      products: 32, 
      status: "active", 
      location: "四川省成都市",
      description: "销售山区特色农产品",
      contactPhone: "13700137000",
      contactEmail: "farm3@example.com"
    },
  ]);

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStore = () => {
    const newId = Math.max(...stores.map(store => store.id)) + 1;
    const storeToAdd = {
      id: newId,
      ...newStore,
      products: 0,
      status: "pending"
    };
    setStores([...stores, storeToAdd]);
    setShowAddDialog(false);
    setNewStore({
      name: "",
      owner: "",
      location: "",
      description: "",
      contactPhone: "",
      contactEmail: ""
    });
    toast({
      title: "添加成功",
      description: `商店 ${newStore.name} 已添加，等待审核`,
    });
  };

  const handleEditStore = () => {
    const updatedStores = stores.map(store => 
      store.id === selectedStore.id ? selectedStore : store
    );
    setStores(updatedStores);
    setShowEditDialog(false);
    toast({
      title: "更新成功",
      description: `商店 ${selectedStore.name} 信息已更新`,
    });
  };

  const openEditDialog = (store: any) => {
    setSelectedStore(store);
    setShowEditDialog(true);
  };

  const handleDeleteStore = () => {
    const updatedStores = stores.filter(store => store.id !== selectedStore.id);
    setStores(updatedStores);
    setShowDeleteDialog(false);
    toast({
      title: "删除成功",
      description: `商店 ${selectedStore.name} 已删除`,
    });
  };

  const handleApproveStore = (storeId: number) => {
    const updatedStores = stores.map(store => 
      store.id === storeId ? { ...store, status: "active" } : store
    );
    setStores(updatedStores);
    toast({
      title: "审核通过",
      description: "商店已成功激活"
    });
  };

  const handleRejectStore = (storeId: number) => {
    const updatedStores = stores.filter(store => store.id !== storeId);
    setStores(updatedStores);
    toast({
      title: "已拒绝",
      description: "商店申请已被拒绝"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-farm-brown">商店管理</h2>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-farm-green hover:bg-farm-green-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加商店
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索商店名称、店主或位置..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">筛选</Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>商店名称</TableHead>
              <TableHead>店主</TableHead>
              <TableHead>产品数量</TableHead>
              <TableHead>地点</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.id}</TableCell>
                <TableCell className="font-medium">{store.name}</TableCell>
                <TableCell>{store.owner}</TableCell>
                <TableCell>{store.products}</TableCell>
                <TableCell>{store.location}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      store.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {store.status === "active" ? "已激活" : "待审核"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => openEditDialog(store)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-600"
                      onClick={() => {
                        setSelectedStore(store);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    {store.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-green-600"
                          onClick={() => handleApproveStore(store.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-600"
                          onClick={() => handleRejectStore(store.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* 添加商店对话框 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加新商店</DialogTitle>
            <DialogDescription>
              请填写新商店的详细信息。添加后，商店将处于待审核状态。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">商店名称 *</label>
                <Input 
                  placeholder="输入商店名称" 
                  value={newStore.name} 
                  onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">店主姓名 *</label>
                <Input 
                  placeholder="输入店主姓名" 
                  value={newStore.owner} 
                  onChange={(e) => setNewStore({...newStore, owner: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">位置 *</label>
                <Input 
                  placeholder="输入商店地址" 
                  value={newStore.location} 
                  onChange={(e) => setNewStore({...newStore, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">联系电话</label>
                <Input 
                  placeholder="输入联系电话" 
                  value={newStore.contactPhone} 
                  onChange={(e) => setNewStore({...newStore, contactPhone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">联系邮箱</label>
                <Input 
                  placeholder="输入联系邮箱" 
                  value={newStore.contactEmail}
                  onChange={(e) => setNewStore({...newStore, contactEmail: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">商店描述</label>
                <Textarea 
                  placeholder="描述商店特色和经营范围..." 
                  value={newStore.description}
                  onChange={(e) => setNewStore({...newStore, description: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button 
              onClick={handleAddStore} 
              className="bg-farm-green hover:bg-farm-green-dark"
              disabled={!newStore.name || !newStore.owner || !newStore.location}
            >
              添加商店
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 编辑商店对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑商店</DialogTitle>
            <DialogDescription>
              修改商店的详细信息。
            </DialogDescription>
          </DialogHeader>
          {selectedStore && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">商店名称 *</label>
                  <Input 
                    placeholder="输入商店名称" 
                    value={selectedStore.name} 
                    onChange={(e) => setSelectedStore({...selectedStore, name: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">店主姓名 *</label>
                  <Input 
                    placeholder="输入店主姓名" 
                    value={selectedStore.owner} 
                    onChange={(e) => setSelectedStore({...selectedStore, owner: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">位置 *</label>
                  <Input 
                    placeholder="输入商店地址" 
                    value={selectedStore.location} 
                    onChange={(e) => setSelectedStore({...selectedStore, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">联系电话</label>
                  <Input 
                    placeholder="输入联系电话" 
                    value={selectedStore.contactPhone || ""} 
                    onChange={(e) => setSelectedStore({...selectedStore, contactPhone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">联系邮箱</label>
                  <Input 
                    placeholder="输入联系邮箱" 
                    value={selectedStore.contactEmail || ""}
                    onChange={(e) => setSelectedStore({...selectedStore, contactEmail: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">商店描述</label>
                  <Textarea 
                    placeholder="描述商店特色和经营范围..." 
                    value={selectedStore.description || ""}
                    onChange={(e) => setSelectedStore({...selectedStore, description: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">状态</label>
                  <Select 
                    value={selectedStore.status} 
                    onValueChange={(value) => setSelectedStore({...selectedStore, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">已激活</SelectItem>
                      <SelectItem value="pending">待审核</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
            <Button 
              onClick={handleEditStore} 
              className="bg-farm-green hover:bg-farm-green-dark"
              disabled={!selectedStore?.name || !selectedStore?.owner || !selectedStore?.location}
            >
              保存更改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除商店确认对话框 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除商店 "{selectedStore?.name}" 吗？此操作不可逆。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>取消</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteStore}
            >
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreManagement;
