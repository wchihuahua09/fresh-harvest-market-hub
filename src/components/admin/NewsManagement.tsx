
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
  FileText,
  Calendar,
  Eye,
  EyeOff
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
import { format } from "date-fns";

// 资讯类型
const NEWS_TYPES = [
  { value: "news", label: "新闻" },
  { value: "announcement", label: "公告" },
  { value: "promotion", label: "促销活动" },
  { value: "update", label: "系统更新" }
];

const NewsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    type: "news",
    isPublished: true
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");

  // 模拟数据
  const [newsList, setNewsList] = useState([
    { 
      id: 1, 
      title: "平台春季促销活动开始", 
      type: "promotion", 
      publishDate: "2025-03-15T10:00:00Z", 
      author: "系统管理员", 
      views: 245,
      isPublished: true,
      content: "春季促销活动现已开始，多种有机蔬果特价销售，期待您的参与！"
    },
    { 
      id: 2, 
      title: "系统维护通知", 
      type: "announcement", 
      publishDate: "2025-04-05T14:30:00Z", 
      author: "系统管理员", 
      views: 156,
      isPublished: true,
      content: "系统将于本周六凌晨2点至4点进行维护，期间可能无法访问，敬请谅解。"
    },
    { 
      id: 3, 
      title: "有机认证标准更新", 
      type: "news", 
      publishDate: "2025-04-01T09:15:00Z", 
      author: "农业专家", 
      views: 328,
      isPublished: true,
      content: "国家有机产品认证标准已更新，本平台将严格遵循新标准审核产品。"
    },
    { 
      id: 4, 
      title: "新增商家入驻指南", 
      type: "update", 
      publishDate: "2025-03-28T11:20:00Z", 
      author: "系统管理员", 
      views: 189,
      isPublished: false,
      content: "我们更新了商家入驻流程，现在申请更加简便快捷，欢迎新商家加入。"
    }
  ]);

  const filteredNews = newsList.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || news.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddNews = () => {
    const newId = Math.max(...newsList.map(news => news.id)) + 1;
    const currentDate = new Date().toISOString();
    const newsToAdd = {
      id: newId,
      ...newNews,
      publishDate: currentDate,
      author: "系统管理员", // 可以从登录用户获取
      views: 0
    };
    setNewsList([...newsList, newsToAdd]);
    setShowAddDialog(false);
    setNewNews({
      title: "",
      content: "",
      type: "news",
      isPublished: true
    });
    toast({
      title: "添加成功",
      description: `${newsToAdd.type === "announcement" ? "公告" : "资讯"} ${newsToAdd.title} 已发布`,
    });
  };

  const handleEditNews = () => {
    const updatedNewsList = newsList.map(news => 
      news.id === selectedNews.id ? selectedNews : news
    );
    setNewsList(updatedNewsList);
    setShowEditDialog(false);
    toast({
      title: "更新成功",
      description: `${selectedNews.type === "announcement" ? "公告" : "资讯"} ${selectedNews.title} 已更新`,
    });
  };

  const handleDeleteNews = () => {
    const updatedNewsList = newsList.filter(news => news.id !== selectedNews.id);
    setNewsList(updatedNewsList);
    setShowDeleteDialog(false);
    toast({
      title: "删除成功",
      description: `${selectedNews.type === "announcement" ? "公告" : "资讯"} ${selectedNews.title} 已删除`,
    });
  };

  const handleTogglePublish = (newsId: number) => {
    const updatedNewsList = newsList.map(news => 
      news.id === newsId ? { ...news, isPublished: !news.isPublished } : news
    );
    setNewsList(updatedNewsList);
    
    const targetNews = newsList.find(news => news.id === newsId);
    if (targetNews) {
      toast({
        title: targetNews.isPublished ? "已取消发布" : "已发布",
        description: `${targetNews.title} ${targetNews.isPublished ? "已设为不可见" : "已设为可见"}`,
      });
    }
  };

  const getTypeLabel = (type: string) => {
    const found = NEWS_TYPES.find(t => t.value === type);
    return found ? found.label : type;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-farm-brown">资讯与公告管理</h2>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-farm-green hover:bg-farm-green-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加资讯
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索标题或内容..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="所有类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有类型</SelectItem>
            {NEWS_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>发布日期</TableHead>
              <TableHead>作者</TableHead>
              <TableHead>浏览量</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.map((news) => (
              <TableRow key={news.id}>
                <TableCell>{news.id}</TableCell>
                <TableCell className="font-medium">{news.title}</TableCell>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {getTypeLabel(news.type)}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(news.publishDate), 'yyyy-MM-dd HH:mm')}</TableCell>
                <TableCell>{news.author}</TableCell>
                <TableCell>{news.views}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      news.isPublished
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {news.isPublished ? "已发布" : "未发布"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => {
                      setSelectedNews(news);
                      setShowEditDialog(true);
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-600"
                      onClick={() => {
                        setSelectedNews(news);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={news.isPublished ? "text-gray-600" : "text-green-600"}
                      onClick={() => handleTogglePublish(news.id)}
                    >
                      {news.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* 添加资讯对话框 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>添加新资讯</DialogTitle>
            <DialogDescription>
              请填写资讯或公告的详细内容。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">标题 *</label>
                <Input 
                  placeholder="输入标题" 
                  value={newNews.title} 
                  onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">类型 *</label>
                <Select 
                  value={newNews.type} 
                  onValueChange={(value) => setNewNews({...newNews, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {NEWS_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="form-checkbox rounded" 
                    checked={newNews.isPublished}
                    onChange={(e) => setNewNews({...newNews, isPublished: e.target.checked})}
                  />
                  <span>立即发布</span>
                </label>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">内容 *</label>
                <Textarea 
                  placeholder="输入详细内容..." 
                  className="min-h-[200px]"
                  value={newNews.content}
                  onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button 
              onClick={handleAddNews} 
              className="bg-farm-green hover:bg-farm-green-dark"
              disabled={!newNews.title || !newNews.content}
            >
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 编辑资讯对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>编辑资讯</DialogTitle>
            <DialogDescription>
              修改资讯或公告内容。
            </DialogDescription>
          </DialogHeader>
          {selectedNews && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">标题 *</label>
                  <Input 
                    placeholder="输入标题" 
                    value={selectedNews.title} 
                    onChange={(e) => setSelectedNews({...selectedNews, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">类型 *</label>
                  <Select 
                    value={selectedNews.type} 
                    onValueChange={(value) => setSelectedNews({...selectedNews, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {NEWS_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="form-checkbox rounded" 
                      checked={selectedNews.isPublished}
                      onChange={(e) => setSelectedNews({...selectedNews, isPublished: e.target.checked})}
                    />
                    <span>{selectedNews.isPublished ? "已发布" : "未发布"}</span>
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">内容 *</label>
                  <Textarea 
                    placeholder="输入详细内容..." 
                    className="min-h-[200px]"
                    value={selectedNews.content}
                    onChange={(e) => setSelectedNews({...selectedNews, content: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">发布日期</label>
                  <Input 
                    type="text" 
                    value={format(new Date(selectedNews.publishDate), 'yyyy-MM-dd HH:mm')}
                    readOnly
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">浏览量</label>
                  <Input 
                    type="number" 
                    value={selectedNews.views}
                    onChange={(e) => setSelectedNews({...selectedNews, views: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
            <Button 
              onClick={handleEditNews} 
              className="bg-farm-green hover:bg-farm-green-dark"
              disabled={!selectedNews?.title || !selectedNews?.content}
            >
              保存更改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除资讯确认对话框 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除 "{selectedNews?.title}" 吗？此操作不可逆。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>取消</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteNews}
            >
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsManagement;
