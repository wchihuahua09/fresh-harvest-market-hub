
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      toast({
        title: "订单已提交",
        description: "您的订单已成功提交，我们将尽快安排发货",
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link to="/products" className="flex items-center text-farm-green hover:underline mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          继续购物
        </Link>
        <h1 className="text-2xl font-bold text-farm-brown">购物车</h1>
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
    </div>
  );
};

export default Cart;
