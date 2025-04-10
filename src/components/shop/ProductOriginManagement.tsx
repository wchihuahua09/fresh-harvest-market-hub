
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
  Search, 
  Plus, 
  Edit, 
  Trash, 
  MapPin,
  Camera,
  Globe
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

const ProductOriginManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<any>(null);
  const [newOrigin, setNewOrigin] = useState({
    name: "",
    location: "",
    description: "",
    coordinates: "",
    certifications: ""
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 模拟数据
  const [origins, setOrigins] = useState([
    { 
      id: 1, 
      name: "青山有机农场", 
      location: "四川省成都市郫都区",
      coordinates: "30.5892° N, 104.0812° E",
      description: "位于郫都区西部山区的有机蔬菜种植基地，采用纯天然种植方法",
      certifications: "有机认证,绿色食品认证",
      verificationStatus: "verified"
    },
    { 
      id: 2, 
      name: "阳光果园", 
      location: "云南省昆明市晋宁区",
      coordinates: "24.6695° N, 102.5952° E",
      description: "专业水果种植基地，主要种植苹果、梨、桃等水果",
      certifications: "绿色食品认证",
      verificationStatus: "pending"
    },
    { 
      id: 3, 
      name: "东北黑土地农场", 
      location: "黑龙江省哈尔滨市松北区",
      coordinates: "45.8038° N, 126.5340° E",
      description: "黑土地种植基地，主要种植玉米、大豆、杂粮等作物",
      certifications: "无公害农产品认证",
      verificationStatus: "verified"
    }
  ]);

  const filteredOrigins = origins.filter(origin => 
    origin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    origin.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    origin.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddOrigin = () => {
    const newId = Math.max(...origins.map(origin => origin.id)) + 1;
    const originToAdd = {
      id: newId,
      ...newOrigin,
      verificationStatus: "pending"
    };
    setOrigins([...origins, originToAdd]);
    setShowAddDialog(false);
    setNewOrigin({
      name: "",
      location: "",
      description: "",
      coordinates: "",
      certifications: ""
    });
    toast({
      title: "添加成功",
      description: `产地 ${newOrigin.name} 已添加，等待验证`,
    });
  };

  const handleEditOrigin = () => {
    const updatedOrigins = origins.map(origin => 
      origin.id === selectedOrigin.id ? selectedOrigin : origin
    );
    setOrigins(updatedOrigins);
    setShowEditDialog(false);
    toast({
      title: "更新成功",
      description: `产地 ${selectedOrigin.name} 信息已更新`,
    });
  };

  const handleDeleteOrigin = () => {
    const updatedOrigins = origins.filter(origin => origin.id !== selectedOrigin.id);
    setOrigins(updatedOrigins);
    setShowDeleteDialog(false);
    toast({
      title: "删除成功",
      description: `产地 ${selectedOrigin.name} 已删除`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-farm-brown">产地管理</h2>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-farm-green hover:bg-farm-green-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加产地
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索产地名称或位置..."
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
              <TableHead>产地名称</TableHead>
              <TableHead>地理位置</TableHead>
              <TableHead>认证</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrigins.map((origin) => (
              <TableRow key={origin.id}>
                <TableCell>{origin.id}</TableCell>
                <TableCell className="font-medium">{origin.name}</TableCell>
                <TableCell>{origin.location}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {origin.certifications.split(',').map((cert, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {cert.trim()}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      origin.verificationStatus === "verified"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {origin.verificationStatus === "verified" ? "已验证" : "待验证"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => {
                      setSelectedOrigin(origin);
                      setShowEditDialog(true);
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-600"
                      onClick={() => {
                        setSelectedOrigin(origin);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* 添加产地对话框 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>添加新产地</DialogTitle>
            <DialogDescription>
              请填写农产品产地的详细信息。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">产地名称 *</label>
                <Input 
                  placeholder="输入产地名称" 
                  value={newOrigin.name} 
                  onChange={(e) => setNewOrigin({...newOrigin, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">地理位置 *</label>
                <Input 
                  placeholder="输入详细地址" 
                  value={newOrigin.location} 
                  onChange={(e) => setNewOrigin({...newOrigin, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GPS坐标</label>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="例如: 30.5892° N, 104.0812° E" 
                    value={newOrigin.coordinates} 
                    onChange={(e) => setNewOrigin({...newOrigin, coordinates: e.target.value})}
                  />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">产地描述</label>
                <Textarea 
                  placeholder="描述产地特点、种植方式等..." 
                  value={newOrigin.description}
                  onChange={(e) => setNewOrigin({...newOrigin, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">认证证书</label>
                <Input 
                  placeholder="多个认证用逗号分隔，如: 有机认证,绿色食品认证" 
                  value={newOrigin.certifications}
                  onChange={(e) => setNewOrigin({...newOrigin, certifications: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  上传产地照片
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  添加地图定位
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button 
              onClick={handleAddOrigin} 
              className="bg-farm-green hover:bg-farm-green-dark"
              disabled={!newOrigin.name || !newOrigin.location}
            >
              添加产地
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 编辑产地对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>编辑产地</DialogTitle>
            <DialogDescription>
              修改产地信息。
            </DialogDescription>
          </DialogHeader>
          {selectedOrigin && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">产地名称 *</label>
                  <Input 
                    placeholder="输入产地名称" 
                    value={selectedOrigin.name} 
                    onChange={(e) => setSelectedOrigin({...selectedOrigin, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">地理位置 *</label>
                  <Input 
                    placeholder="输入详细地址" 
                    value={selectedOrigin.location} 
                    onChange={(e) => setSelectedOrigin({...selectedOrigin, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GPS坐标</label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="例如: 30.5892° N, 104.0812° E" 
                      value={selectedOrigin.coordinates} 
                      onChange={(e) => setSelectedOrigin({...selectedOrigin, coordinates: e.target.value})}
                    />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">产地描述</label>
                  <Textarea 
                    placeholder="描述产地特点、种植方式等..." 
                    value={selectedOrigin.description}
                    onChange={(e) => setSelectedOrigin({...selectedOrigin, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">认证证书</label>
                  <Input 
                    placeholder="多个认证用逗号分隔，如: 有机认证,绿色食品认证" 
                    value={selectedOrigin.certifications}
                    onChange={(e) => setSelectedOrigin({...selectedOrigin, certifications: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    更新产地照片
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="w-full">
                    <Globe className="h-4 w-4 mr-2" />
                    更新地图定位
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
            <Button 
              onClick={handleEditOrigin} 
              className="bg-farm-green hover:bg-farm-green-dark"
              disabled={!selectedOrigin?.name || !selectedOrigin?.location}
            >
              保存更改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除产地确认对话框 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除产地 "{selectedOrigin?.name}" 吗？此操作不可逆。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>取消</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteOrigin}
            >
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductOriginManagement;
