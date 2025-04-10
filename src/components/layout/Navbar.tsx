
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { name: "Vegetables", path: "/category/vegetables" },
    { name: "Fruits", path: "/category/fruits" },
    { name: "Dairy", path: "/category/dairy" },
    { name: "Grains", path: "/category/grains" },
    { name: "Herbs", path: "/category/herbs" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-farm-green font-bold text-2xl">FreshHarvest</span>
          </Link>

          {/* Search - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1 relative flex-1 mx-10 max-w-lg">
            <Input
              type="text"
              placeholder="Search for products..."
              className="pl-10 bg-farm-cream-light"
            />
            <Search className="absolute left-3 text-gray-400" size={18} />
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-700 hover:text-farm-green">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-farm-green">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-farm-green">
              Contact
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-farm-green">
              <Heart size={20} />
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-farm-green">
              <User size={20} />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} className="text-farm-green" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-farm-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Categories bar */}
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

      {/* Mobile Menu */}
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
                placeholder="Search for products..."
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
                Products
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
                About
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                to="/account"
                className="block py-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                Account
              </Link>
              <Link
                to="/favorites"
                className="block py-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                Favorites
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
