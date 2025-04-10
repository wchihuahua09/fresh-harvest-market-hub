
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, MessageCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "姓名不能少于2个字符" }),
  address: z.string().min(5, { message: "请输入完整的收货地址" }),
  phone: z.string().min(11, { message: "请输入有效的手机号码" }),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderId, setOrderId] = useState("");

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      notes: "",
    },
  });

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id);
    toast({
      title: "已移除商品",
      description: `${name} 已从购物车中移除`,
    });
  };

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const onSubmitCheckout = (data: CheckoutFormValues) => {
    setIsCheckingOut(true);
    // Generate an order ID based on timestamp and random string
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newOrderId = `ORD-${Date.now().toString().substring(6)}-${randomId}`;
    setOrderId(newOrderId);
    
    // Simulate order processing
    setTimeout(() => {
      setShowCheckoutForm(false);
      setIsCheckingOut(false);
      setShowOrderConfirmation(true);
    }, 1500);
  };

  const handleCompleteOrder = () => {
    clearCart();
    setShowOrderConfirmation(false);
    toast({
      title: "订单已提交",
      description: "您的订单已成功提交，我们将尽快安排发货",
    });
    navigate("/orders");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link to="/products" className="flex items-center text-farm-green hover:underline mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          继续购物
        </Link>
        <h1 className="text-2xl font-bold text-farm-brown">购物车</h1>
        <Button variant="outline" className="ml-auto" asChild>
          <Link to="/customer-service" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            联系客服
          </Link>
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex rounded-full bg-farm-cream p-6 mb-4">
            <ShoppingBag className="h-12 w-12 text-farm-green" />
          </div>
          <h2 className="text-xl font-semibold mb-2">您的购物车是空的</h2>
          <p className="text-gray-500 mb-6">看起来您还没有将任何商品添加到购物车中</p>
          <Button asChild className="bg-farm-green hover:bg-farm-green-dark">
            <Link to="/products">浏览商品</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">商品</TableHead>
                  <TableHead>单价</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>总计</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded object-cover mr-4"
                        />
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-farm-green">
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500">卖家: {item.farmerName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}/{item.unit}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="md:w-1/2">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="w-full md:w-auto"
              >
                清空购物车
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 md:w-1/2">
              <h2 className="text-lg font-semibold mb-4">订单摘要</h2>
              <div className="flex justify-between mb-2">
                <span>小计</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>运费</span>
                <span>免费</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>总计</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <Button 
                className="w-full bg-farm-green hover:bg-farm-green-dark"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "处理中..." : "结算"}
              </Button>
            </div>
          </div>
        </>
      )}

      {/* 结算表单对话框 */}
      <Dialog open={showCheckoutForm} onOpenChange={setShowCheckoutForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>填写收货信息</DialogTitle>
            <DialogDescription>
              请填写您的收货地址和联系信息，以便我们及时送达您的订单。
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitCheckout)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>姓名</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入您的姓名" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>收货地址</FormLabel>
                    <FormControl>
                      <Textarea placeholder="请输入详细的收货地址" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>手机号码</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入您的手机号码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>订单备注（可选）</FormLabel>
                    <FormControl>
                      <Textarea placeholder="如有特殊要求，请在此备注" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setShowCheckoutForm(false)}>取消</Button>
                <Button type="submit" disabled={isCheckingOut}>
                  {isCheckingOut ? "处理中..." : "提交订单"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* 订单确认对话框 */}
      <Dialog open={showOrderConfirmation} onOpenChange={setShowOrderConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>订单已生成</DialogTitle>
            <DialogDescription>
              您的订单已成功生成，请记录您的订单号。
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 p-4 bg-gray-50 rounded-md border text-center">
              <p className="text-sm text-gray-500">订单号</p>
              <p className="text-xl font-bold">{orderId}</p>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              您可以在"我的订单"中查看订单状态和详情。商家确认订单后，将通知您支付。
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleCompleteOrder} className="w-full">
              确认并查看我的订单
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
