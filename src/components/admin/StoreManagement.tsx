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

const StoreManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(null);

  // 模拟数据
  const stores = [
    { 
      id: 1, 
      name: "绿色有机农场", 
      owner: "张三", 
      products: 24, 
      status: "active", 
      location: "北京市朝阳区"
    },
    { 
      id: 2, 
      name: "健康蔬果店", 
      owner: "李四", 
      products: 15, 
      status: "pending", 
      location: "上海市浦东新区"
    },
    { 
      id: 3, 
      name: "山村特产店", 
      owner: "王五", 
      products: 32, 
      status: "active", 
      location: "四川省成都市"
    },
  ];

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStore = () => {
    // 添加商店的逻辑
    setShowAddDialog(false);
  };

  const handleEditStore = () => {
    // 编辑商店的逻辑
    setShowEditDialog(false);
  };

  const openEditDialog = (store: any) => {
    setSelectedStore(store);
    setShowEditDialog(true);
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
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                    {store.status === "pending" && (
                      <>
                        <Button size="sm" variant="ghost" className="text-green-600">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
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
          {/* 表单内容 */}
          <div className="space-y-4 py-4">
            {/* 表单字段 */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button onClick={handleAddStore} className="bg-farm-green hover:bg-farm-green-dark">添加商店</Button>
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
          {/* 表单内容 */}
          <div className="space-y-4 py-4">
            {/* 表单字段 */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
            <Button onClick={handleEditStore} className="bg-farm-green hover:bg-farm-green-dark">保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreManagement;
