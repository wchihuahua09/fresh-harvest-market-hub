
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, Heart, LogIn, LogOut, Shield, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { name: "蔬菜", path: "/category/vegetables" },
    { name: "水果", path: "/category/fruits" },
    { name: "乳制品", path: "/category/dairy" },
    { name: "谷物", path: "/category/grains" },
    { name: "草药", path: "/category/herbs" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 根据用户角色获取控制台链接
  const getDashboardLink = () => {
    if (hasRole("admin")) return "/admin";
    if (hasRole("shop")) return "/shop";
    return "/account";
  };

  // 根据用户角色获取图标
  const getDashboardIcon = () => {
    if (hasRole("admin")) return <Shield size={20} />;
    if (hasRole("shop")) return <Store size={20} />;
    return <User size={20} />;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-farm-green font-bold text-2xl">新鲜收获</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1 relative flex-1 mx-10 max-w-lg">
            <Input
              type="text"
              placeholder="搜索农产品..."
              className="pl-10 bg-farm-cream-light"
            />
            <Search className="absolute left-3 text-gray-400" size={18} />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-700 hover:text-farm-green">
              产品
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-farm-green">
              关于
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-farm-green">
              联系
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-farm-green">
              <Heart size={20} />
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="text-gray-700 hover:text-farm-green">
                  {getDashboardIcon()}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-700 hover:text-farm-green"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-farm-green">
                <LogIn size={20} />
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} className="text-farm-green" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-farm-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} className="text-farm-green" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-farm-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gray-500">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-farm-cream border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex justify-between items-center">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="py-2 px-4 text-farm-brown-dark font-medium hover:text-farm-green transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-gray-500">
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <div className="mb-6">
              <Input
                type="text"
                placeholder="搜索农产品..."
                className="pl-10 bg-farm-cream-light"
              />
              <Search className="absolute top-24 left-7 text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              <Link
                to="/products"
                className="block py-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                产品
              </Link>
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="block py-1 text-farm-brown"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/about"
                className="block py-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                关于
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                联系
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="block py-2 text-lg font-medium"
                    onClick={toggleMenu}
                  >
                    {user?.role === "admin" ? "管理控制台" : (user?.role === "shop" ? "商店管理" : "账户")}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="block py-2 text-lg font-medium w-full text-left"
                  >
                    登出
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 text-lg font-medium"
                  onClick={toggleMenu}
                >
                  登录
                </Link>
              )}
              
              <Link
                to="/favorites"
                className="block py-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                收藏
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
