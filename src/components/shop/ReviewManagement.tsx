
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
  MessageSquare, 
  Star, 
  Flag,
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
import { format } from "date-fns";

const ReviewManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  // 模拟数据
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      productId: 101,
      productName: "有机胡萝卜", 
      customerName: "张三", 
      rating: 5,
      content: "产品非常新鲜，物流也很快，下次还会购买！",
      date: "2025-04-01T15:30:00Z",
      isReplied: true,
      reply: "感谢您的支持，我们会继续保持产品质量！",
      replyDate: "2025-04-02T10:15:00Z"
    },
    { 
      id: 2, 
      productId: 102,
      productName: "生态鸡蛋", 
      customerName: "李四", 
      rating: 3,
      content: "产品质量还可以，但包装有点简陋，蛋壳有几个破了。",
      date: "2025-04-03T09:45:00Z",
      isReplied: false,
      reply: "",
      replyDate: ""
    },
    { 
      id: 3, 
      productId: 103,
      productName: "新鲜苹果", 
      customerName: "王五", 
      rating: 4,
      content: "苹果味道很好，就是大小不太均匀。",
      date: "2025-04-05T14:20:00Z",
      isReplied: false,
      reply: "",
      replyDate: ""
    },
    { 
      id: 4, 
      productId: 101,
      productName: "有机胡萝卜", 
      customerName: "赵六", 
      rating: 5,
      content: "品质很棒，很甜很脆，孩子很喜欢吃。",
      date: "2025-04-07T11:30:00Z",
      isReplied: true,
      reply: "谢谢您的评价，我们的产品都是精挑细选的，欢迎再次购买！",
      replyDate: "2025-04-07T16:45:00Z"
    },
    { 
      id: 5, 
      productId: 104,
      productName: "有机菠菜", 
      customerName: "钱七", 
      rating: 2,
      content: "感觉不太新鲜，有一些已经发黄了。",
      date: "2025-04-08T13:10:00Z",
      isReplied: false,
      reply: "",
      replyDate: ""
    }
  ]);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "replied" && review.isReplied) || 
                         (filterStatus === "unreplied" && !review.isReplied);
    return matchesSearch && matchesStatus;
  });

  const handleReplySubmit = () => {
    if (!replyContent.trim()) {
      toast({
        title: "回复失败",
        description: "回复内容不能为空",
        variant: "destructive"
      });
      return;
    }

    const updatedReviews = reviews.map(review => 
      review.id === selectedReview.id 
        ? { 
            ...review, 
            isReplied: true, 
            reply: replyContent,
            replyDate: new Date().toISOString()
          } 
        : review
    );
    
    setReviews(updatedReviews);
    setShowReplyDialog(false);
    setReplyContent("");
    
    toast({
      title: "回复成功",
      description: "您的回复已发送给客户",
    });
  };

  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-farm-brown">评价管理</h2>
        <div className="space-x-2">
          <Button 
            variant={filterStatus === "all" ? "default" : "outline"} 
            onClick={() => setFilterStatus("all")}
          >
            全部
          </Button>
          <Button 
            variant={filterStatus === "unreplied" ? "default" : "outline"} 
            onClick={() => setFilterStatus("unreplied")}
          >
            未回复
          </Button>
          <Button 
            variant={filterStatus === "replied" ? "default" : "outline"} 
            onClick={() => setFilterStatus("replied")}
          >
            已回复
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索产品、用户或评价内容..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>产品</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>评分</TableHead>
              <TableHead>评价内容</TableHead>
              <TableHead>日期</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell className="font-medium">{review.productName}</TableCell>
                  <TableCell>{review.customerName}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {getRatingStars(review.rating)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={review.content}>
                    {review.content}
                  </TableCell>
                  <TableCell>{format(new Date(review.date), 'yyyy-MM-dd')}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        review.isReplied
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {review.isReplied ? "已回复" : "待回复"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-blue-600"
                        onClick={() => {
                          setSelectedReview(review);
                          setShowReplyDialog(true);
                          if (review.isReplied) {
                            setReplyContent(review.reply);
                          } else {
                            setReplyContent("");
                          }
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-600"
                        onClick={() => {
                          setSelectedReview(review);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  没有找到匹配的评价
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* 回复评价对话框 */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>回复客户评价</DialogTitle>
            <DialogDescription>
              您的回复将直接显示在产品评价下方，请保持礼貌和专业。
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4 py-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{selectedReview.customerName}</p>
                    <div className="flex my-1">
                      {getRatingStars(selectedReview.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {format(new Date(selectedReview.date), 'yyyy-MM-dd HH:mm')}
                  </p>
                </div>
                <p className="text-gray-700">{selectedReview.content}</p>
                
                {selectedReview.isReplied && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-farm-green">商家回复</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(selectedReview.replyDate), 'yyyy-MM-dd HH:mm')}
                      </p>
                    </div>
                    <p className="mt-1 text-gray-700">{selectedReview.reply}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">您的回复</label>
                <Textarea 
                  placeholder="输入回复内容..." 
                  className="min-h-[150px]"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReplyDialog(false)}>取消</Button>
            <Button 
              onClick={handleReplySubmit} 
              className="bg-farm-green hover:bg-farm-green-dark"
              disabled={!replyContent.trim()}
            >
              {selectedReview?.isReplied ? "更新回复" : "发送回复"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 标记评价对话框 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>标记不当评价</DialogTitle>
            <DialogDescription>
              将此评价标记为不当内容，系统管理员将进行审核。
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="border rounded-lg p-4 bg-gray-50 my-4">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">{selectedReview.customerName}</p>
                <div className="flex">
                  {getRatingStars(selectedReview.rating)}
                </div>
              </div>
              <p className="text-gray-700">{selectedReview.content}</p>
            </div>
          )}
          <div className="space-y-4 py-2">
            <Textarea 
              placeholder="请说明标记原因..." 
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>取消</Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                setShowDeleteDialog(false);
                toast({
                  title: "已标记",
                  description: "评价已标记，等待管理员审核",
                });
              }}
            >
              标记评价
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewManagement;
