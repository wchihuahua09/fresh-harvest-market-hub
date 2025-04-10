
import { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
  farmerId: number;
  farmerName: string;
}

interface FavoriteItem {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  farmerId: number;
  farmerName: string;
  farmerLocation: string;
  isOrganic?: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  favorites: FavoriteItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // 从本地存储加载购物车和收藏数据
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // 监听变化并保存到本地存储
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 购物车操作函数
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // 如果商品已存在于购物车，更新其数量
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // 如果商品不存在于购物车，添加新商品
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // 收藏操作函数
  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prevFavorites => {
      const isFavorited = prevFavorites.some(fav => fav.id === item.id);
      
      if (isFavorited) {
        // 如果已收藏，则移除
        return prevFavorites.filter(fav => fav.id !== item.id);
      } else {
        // 如果未收藏，则添加
        return [...prevFavorites, item];
      }
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      getCartTotal,
      getCartCount,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
