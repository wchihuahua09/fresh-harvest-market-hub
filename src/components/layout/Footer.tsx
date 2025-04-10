
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-farm-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* 关于 */}
          <div>
            <h3 className="text-xl font-bold mb-4">新鲜收获</h3>
            <p className="text-gray-200 mb-4">
              连接本地农户与消费者，为您带来最新鲜的农产品。
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

          {/* 快速链接 */}
          <div>
            <h3 className="text-xl font-bold mb-4">快速导航</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-200 hover:text-white">
                  产品
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white">
                  关于我们
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="text-gray-200 hover:text-white">
                  我们的农户
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 类别 */}
          <div>
            <h3 className="text-xl font-bold mb-4">产品分类</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/vegetables" className="text-gray-200 hover:text-white">
                  蔬菜
                </Link>
              </li>
              <li>
                <Link to="/category/fruits" className="text-gray-200 hover:text-white">
                  水果
                </Link>
              </li>
              <li>
                <Link to="/category/dairy" className="text-gray-200 hover:text-white">
                  乳制品
                </Link>
              </li>
              <li>
                <Link to="/category/grains" className="text-gray-200 hover:text-white">
                  谷物
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系 */}
          <div>
            <h3 className="text-xl font-bold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>中国 北京市 农业大道 123号</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} />
                <span>info@freshharvest.cn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-6 text-center text-gray-300">
          <p>© 2025 新鲜收获. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
