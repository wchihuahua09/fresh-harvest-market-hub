
import { useState, useRef } from "react";
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
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  ChevronDown,
  ImagePlus,
  Tag
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const ProductManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputEditRef = useRef<HTMLInputElement>(null);

  // 模拟数据
  const products = [
    { 
      id: 1, 
      name: "有机胡萝卜", 
      price: 5.99,
      unit: "kg",
      category: "蔬菜",
      stock: 120,
      isOrganic: true,
      isFeatured: true,
      image: "/placeholder.svg"
    },
    { 
      id: 2, 
      name: "新鲜苹果", 
      price: 8.50,
      unit: "kg",
      category: "水果",
      stock: 85,
      isOrganic: false,
      isFeatured: true,
      image: "/placeholder.svg"
    },
    { 
      id: 3, 
      name: "农家鸡蛋", 
      price: 12.99,
      unit: "dozen",
      category: "禽蛋",
      stock: 45,
      isOrganic: true,
      isFeatured: false,
      image: "/placeholder.svg"
    },
    { 
      id: 4, 
      name: "蓝莓", 
      price: 15.99,
      unit: "box",
      category: "水果",
      stock: 30,
      isOrganic: true,
      isFeatured: false,
      image: "/placeholder.svg"
    },
    { 
      id: 5, 
      name: "山羊奶酪", 
      price: 18.75,
      unit: "piece",
      category: "乳制品",
      stock: 25,
      isOrganic: false,
      isFeatured: true,
      image: "/placeholder.svg"
    },
  ];

  const categories = ["蔬菜", "水果", "禽蛋", "乳制品", "肉类"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 在真实环境中，这里会上传文件到服务器，并获取URL
      // 这里我们模拟这个过程，使用本地URL
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      toast({
        title: "图片已上传",
        description: `文件 ${file.name} 已成功上传`,
      });
    }
  };

  const handleAddProduct = () => {
    // 添加产品的逻辑
    setShowAddDialog(false);
    setSelectedImage(null);
    toast({
      title: "产品已添加",
      description: "新产品已成功添加到系统",
    });
  };

  const handleEditProduct = () => {
    // 编辑产品的逻辑
    setShowEditDialog(false);
    setSelectedImage(null);
    toast({
      title: "产品已更新",
      description: "产品信息已成功更新",
    });
  };

  const openEditDialog = (product: any) => {
    setSelectedProduct(product);
    setSelectedImage(product.image);
    setShowEditDialog(true);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerEditFileInput = () => {
    fileInputEditRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-farm-brown">产品管理</h2>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-farm-green hover:bg-farm-green-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加产品
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索产品名称或类别..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="所有类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有类别</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              排序
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>名称（A-Z）</DropdownMenuItem>
            <DropdownMenuItem>名称（Z-A）</DropdownMenuItem>
            <DropdownMenuItem>价格（低-高）</DropdownMenuItem>
            <DropdownMenuItem>价格（高-低）</DropdownMenuItem>
            <DropdownMenuItem>库存（低-高）</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>图片</TableHead>
              <TableHead>产品名称</TableHead>
              <TableHead>价格</TableHead>
              <TableHead>单位</TableHead>
              <TableHead>类别</TableHead>
              <TableHead>库存</TableHead>
              <TableHead>标签</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>¥{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <span className={`font-medium ${product.stock < 30 ? 'text-red-600' : product.stock < 50 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.isOrganic && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">有机</Badge>
                    )}
                    {product.isFeatured && (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">特色</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => openEditDialog(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* 添加产品对话框 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>添加新产品</DialogTitle>
            <DialogDescription>
              请填写新产品的详细信息。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">产品名称</label>
                <Input placeholder="输入产品名称" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">价格</label>
                <Input type="number" step="0.01" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">单位</label>
                <Input placeholder="kg, box, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">类别</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择类别" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">库存</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">产品描述</label>
                <Textarea placeholder="描述产品的特点和优势..." />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">产品图片</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {selectedImage ? (
                  <div className="flex items-center space-x-2">
                    <img 
                      src={selectedImage} 
                      alt="产品预览" 
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={triggerFileInput}
                    >
                      <ImagePlus className="h-4 w-4 mr-2" />
                      更换图片
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={triggerFileInput}
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    上传图片
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox rounded" />
                  <span>有机产品</span>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox rounded" />
                  <span>特色产品</span>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              setSelectedImage(null);
            }}>取消</Button>
            <Button onClick={handleAddProduct} className="bg-farm-green hover:bg-farm-green-dark">添加产品</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 编辑产品对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>编辑产品</DialogTitle>
            <DialogDescription>
              修改产品的详细信息。
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">产品名称</label>
                  <Input placeholder="输入产品名称" defaultValue={selectedProduct.name} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">价格</label>
                  <Input type="number" step="0.01" placeholder="0.00" defaultValue={selectedProduct.price} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">单位</label>
                  <Input placeholder="kg, box, etc." defaultValue={selectedProduct.unit} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">类别</label>
                  <Select defaultValue={selectedProduct.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">库存</label>
                  <Input type="number" placeholder="0" defaultValue={selectedProduct.stock} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">产品描述</label>
                  <Textarea placeholder="描述产品的特点和优势..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">产品图片</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    ref={fileInputEditRef}
                    onChange={handleFileChange}
                  />
                  <div className="flex items-center space-x-2">
                    <img 
                      src={selectedImage || selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={triggerEditFileInput}
                    >
                      <ImagePlus className="h-4 w-4 mr-2" />
                      更换图片
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox rounded" defaultChecked={selectedProduct.isOrganic} />
                    <span>有机产品</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox rounded" defaultChecked={selectedProduct.isFeatured} />
                    <span>特色产品</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowEditDialog(false);
              setSelectedImage(null);
            }}>取消</Button>
            <Button onClick={handleEditProduct} className="bg-farm-green hover:bg-farm-green-dark">保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
