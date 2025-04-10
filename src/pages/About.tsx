
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Leaf, Users, Warehouse, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-farm-green" />,
      title: "可持续性",
      description: "我们致力于支持环保农业实践，减少我们对环境的影响。"
    },
    {
      icon: <Users className="h-8 w-8 text-farm-green" />,
      title: "社区",
      description: "我们相信强大的本地食品系统可以创造繁荣的社区。"
    },
    {
      icon: <Warehouse className="h-8 w-8 text-farm-green" />,
      title: "透明度",
      description: "我们让您了解食物的来源，以及生产食物的人。"
    },
    {
      icon: <Award className="h-8 w-8 text-farm-green" />,
      title: "品质",
      description: "我们只选择最优质、最新鲜的产品。"
    }
  ];

  return (
    <div className="bg-white">
      {/* 英雄区 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-farm-green/70 to-farm-green-dark/70 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80" 
          alt="农场景色" 
          className="w-full h-[50vh] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">关于新鲜收获</h1>
            <p className="text-xl max-w-2xl mx-auto">
              连接本地农户与消费者，共同创造一个更加健康、透明的食品系统
            </p>
          </div>
        </div>
      </div>

      {/* 我们的故事 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-farm-brown mb-4">我们的故事</h2>
            <div className="w-16 h-1 bg-farm-green mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 mb-6">
              新鲜收获起源于2018年，当时我们看到城市消费者越来越难以获得真正新鲜的本地食品，而本地农户也难以找到公平的市场销售他们的产品。
            </p>
            <p className="text-lg text-gray-700">
              我们的创始人李明和王芳，两位对农业充满热情的企业家，决定搭建一座桥梁，将消费者与本地农户直接连接起来。从小规模开始，与几位农户合作，如今已发展成为全国领先的农产品直连平台。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1595923533867-9a5b9509e563?w=600&auto=format&fit=crop&q=80" 
                alt="创始人" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-farm-brown mb-4">我们的使命</h3>
              <p className="text-gray-700 mb-6">
                我们的使命是创建一个更加可持续、透明和公平的食品系统，让每个人都能获得健康的食物，同时确保农户得到公平的回报。
              </p>
              <ul className="space-y-4">
                {[
                  "支持小规模家庭农户，确保他们获得公平的收入",
                  "减少食品从农场到餐桌的距离，确保最大的新鲜度",
                  "推广可持续和有机农业实践",
                  "帮助消费者了解食物的来源和生产方式"
                ].map((point, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-farm-green mr-2 mt-1 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的价值观 */}
      <section className="py-16 bg-farm-cream-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-farm-brown text-center mb-4">我们的价值观</h2>
          <div className="w-16 h-1 bg-farm-green mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-farm-brown mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-farm-brown mb-6">加入我们的旅程</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            无论您是消费者还是农户，我们邀请您加入我们，共同创造一个更好的食品未来。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-farm-green hover:bg-farm-green-dark text-white">
              <Link to="/products">浏览产品</Link>
            </Button>
            <Button asChild variant="outline" className="border-farm-green text-farm-green hover:bg-farm-cream">
              <Link to="/farmers">认识我们的农户</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
