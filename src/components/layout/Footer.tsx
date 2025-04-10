
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-farm-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">FreshHarvest</h3>
            <p className="text-gray-200 mb-4">
              Connecting local farmers with consumers to bring the freshest produce to your table.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-farm-cream">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-farm-cream">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-farm-cream">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-200 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="text-gray-200 hover:text-white">
                  Our Farmers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/vegetables" className="text-gray-200 hover:text-white">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/category/fruits" className="text-gray-200 hover:text-white">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/category/dairy" className="text-gray-200 hover:text-white">
                  Dairy
                </Link>
              </li>
              <li>
                <Link to="/category/grains" className="text-gray-200 hover:text-white">
                  Grains
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>123 Farm Lane, Harvest City, HC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} />
                <span>info@freshharvest.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-6 text-center text-gray-300">
          <p>© 2025 FreshHarvest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
