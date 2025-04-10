
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import ShopDetail from "./pages/ShopDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { NewsList, NewsDetail } from "./pages/News";
import Admin from "./pages/Admin";
import ShopDashboard from "./pages/ShopDashboard";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import CustomerService from "./pages/CustomerService";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Farmers from "./pages/Farmers";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<ProductListing />} />
                  <Route path="/category/:category" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/shop/:id" element={<ShopDetail />} />
                  {/* Add a redirect from /farmer/:id to /shop/:id */}
                  <Route path="/farmer/:id" element={<ShopDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/customer-service" element={<CustomerService />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/farmers" element={<Farmers />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/news" element={<NewsList />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute roles="admin">
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/shop" 
                    element={
                      <ProtectedRoute roles="shop">
                        <ShopDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
