import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock data for farmers
const farmersList = [{
  id: 1,
  name: "王丽",
  farm: "绿谷有机农场",
  image: "https://images.unsplash.com/photo-1553413077-190183f6a611?w=600&auto=format&fit=crop",
  description: "第四代农户，专注于有机蔬菜和草药种植。我们的农场位于河北省的山区，拥有肥沃的土壤和清澈的山泉水。",
  longDescription: "我从祖父那里继承了这个农场，并将其转变为完全有机的操作。我们不使用任何化学农药或肥料，而是依靠传统的耕作方法和现代的可持续技术的结合。我们的土地经过了有机认证，我们以种植各种传统和特色蔬菜而自豪。",
  products: ["羽衣甘蓝", "番茄", "香草", "胡萝卜", "菠菜"],
  location: "河北省 承德市",
  contact: {
    phone: "135-1234-5678",
    email: "ligreen@example.com",
    address: "河北省承德市绿谷镇农业路123号"
  },
  certifications: ["有机认证", "无农药"],
  since: 2010
}, {
  id: 2,
  name: "李明",
  farm: "阳光田野农场",
  image: "https://images.unsplash.com/photo-1504971319684-a51a2b5a4cd2?w=600&auto=format&fit=crop",
  description: "家族农场，以种植最甜美的草莓和桃子而闻名。我们注重自然生长过程，尽量减少人工干预。",
  longDescription: "我们的农场坐落在山东的丘陵地带，这里的气候特别适合种植各种水果。我们家族已经在这里耕种了三代人，积累了丰富的种植经验。我尤其注重水果的天然风味，所以我们让水果在树上或藤上完全成熟，然后才采摘，确保最佳口感。",
  products: ["草莓", "桃子", "李子", "樱桃", "蓝莓"],
  location: "山东省 烟台市",
  contact: {
    phone: "139-8765-4321",
    email: "mingsunshine@example.com",
    address: "山东省烟台市阳光镇果园路45号"
  },
  certifications: ["生态种植", "GAP认证"],
  since: 2005
}, {
  id: 3,
  name: "陈晓",
  farm: "传承农场",
  image: "https://images.unsplash.com/photo-1592087046781-466fede8b6f9?w=600&auto=format&fit=crop",
  description: "践行可持续农业，专注于传统品种。我们保存和种植许多濒临消失的古老蔬菜和谷物品种。",
  longDescription: "我有着农学博士学位，但对传统农业有着深深的热爱。我的农场位于云南的一个偏远山区，这里保存着许多古老的农作物品种。我们致力于保护这些农业遗产，同时通过现代化的销售渠道，让更多人能够品尝到这些珍贵的食材。",
  products: ["传统番茄", "古代谷物", "手工奶酪", "野生蘑菇", "本地豆类"],
  location: "云南省 大理市",
  contact: {
    phone: "132-9876-5432",
    email: "xiaoheirloom@example.com",
    address: "云南省大理市传承村文化路78号"
  },
  certifications: ["文化遗产保护", "生物多样性"],
  since: 2015
}, {
  id: 4,
  name: "张伟",
  farm: "清泉禽蛋场",
  image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop",
  description: "专注于放养家禽和高品质禽蛋的生产。我们的鸡、鸭和鹅都享有充分的活动空间和天然饮食。",
  longDescription: "我们的农场位于湖南的山间，这里空气清新，水质纯净。我们的家禽完全自由放养，有充足的空间活动，吃着天然的食物。我们不使用抗生素或生长激素，确保产品的天然和健康。我们的禽蛋因其鲜黄的蛋黄和丰富的风味而受到顾客的喜爱。",
  products: ["放养鸡蛋", "鸭蛋", "鹅蛋", "土鸡", "咸鸭蛋"],
  location: "湖南省 常德市",
  contact: {
    phone: "138-2345-6789",
    email: "weifreerange@example.com",
    address: "湖南省常德市清泉镇养殖路56号"
  },
  certifications: ["动物福利认证", "无抗生素"],
  since: 2012
}, {
  id: 5,
  name: "刘芳",
  farm: "蜜蜂花园",
  image: "https://images.unsplash.com/photo-1473973266408-ed4e9c94c2aa?w=600&auto=format&fit=crop",
  description: "致力于养蜂和花卉种植。我们的蜂蜜来自不同的花源，每种都有独特的风味。",
  longDescription: "我的蜜蜂花园位于浙江的山区，这里有丰富的野花资源。我们养殖的蜜蜂根据季节在不同的花源间迁移，采集各种花蜜。除了生产各种单花蜜外，我们还种植各种蜜源植物和食用花卉，提供给餐厅和烘焙店使用。",
  products: ["桂花蜜", "洋槐蜜", "百花蜜", "蜂王浆", "食用花卉"],
  location: "浙江省 丽水市",
  contact: {
    phone: "136-8765-4321",
    email: "fangbee@example.com",
    address: "浙江省丽水市蜜蜂村花园路89号"
  },
  certifications: ["纯天然", "无添加"],
  since: 2014
}, {
  id: 6,
  name: "赵强",
  farm: "稻香米业",
  image: "https://images.unsplash.com/photo-1530598252563-47d088c6b5ae?w=600&auto=format&fit=crop",
  description: "专注于水稻种植，尤其是传统和特色稻米品种。我们的稻田实行生态种植，减少农药使用。",
  longDescription: "我们的稻田位于江西的鄱阳湖区，这里水源充足，土壤肥沃，非常适合种植水稻。我们保留了许多传统的稻米品种，如紫米、红米和香米，这些都有着丰富的营养和独特的风味。我们采用传统和现代相结合的种植方法，确保稻米的品质和产量。",
  products: ["香米", "紫米", "糙米", "米粉", "米酒"],
  location: "江西省 九江市",
  contact: {
    phone: "137-1234-5678",
    email: "qiangrice@example.com",
    address: "江西省九江市稻香镇湖边路34号"
  },
  certifications: ["生态种植", "无重金属"],
  since: 2008
}];
const Farmers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCertification, setSelectedCertification] = useState("");

  // Get unique certifications from all farmers
  const allCertifications = Array.from(new Set(farmersList.flatMap(farmer => farmer.certifications)));

  // Filter farmers based on search term and selected certification
  const filteredFarmers = farmersList.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || farmer.farm.toLowerCase().includes(searchTerm.toLowerCase()) || farmer.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCertification = selectedCertification === "" || farmer.certifications.includes(selectedCertification);
    return matchesSearch && matchesCertification;
  });
  return <div className="bg-white min-h-screen">
      {/* 英雄区 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-farm-brown/70 to-farm-brown-dark/70 z-10" />
        <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&auto=format&fit=crop&q=80" alt="农民在田间" className="w-full h-[40vh] object-cover" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">我们的农户</h1>
            <p className="text-xl max-w-2xl mx-auto">
              认识那些辛勤耕耘、为您提供新鲜食物的人们
            </p>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <section className="py-8 bg-farm-cream-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input type="text" placeholder="搜索农户或产品..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <Badge className={`cursor-pointer ${selectedCertification === "" ? "bg-farm-green" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`} onClick={() => setSelectedCertification("")}>
                全部
              </Badge>
              {allCertifications.map(cert => <Badge key={cert} className={`cursor-pointer ${selectedCertification === cert ? "bg-farm-green" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`} onClick={() => setSelectedCertification(cert)}>
                  {cert}
                </Badge>)}
            </div>
          </div>
        </div>
      </section>

      {/* 农户列表 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFarmers.map(farmer => <div key={farmer.id} className="farm-card h-full flex flex-col overflow-hidden">
                <div className="relative h-64">
                  <img src={farmer.image} alt={farmer.farm} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{farmer.name}</h3>
                    <p className="text-white/90">{farmer.farm}</p>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-farm-green mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{farmer.location}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{farmer.description}</p>
                  <div className="mb-4">
                    {farmer.certifications.map(cert => <Badge key={cert} className="mr-2 mb-2 bg-farm-cream text-farm-brown-dark">
                        {cert}
                      </Badge>)}
                  </div>
                  <Separator className="mb-4" />
                  <div className="mb-4 flex-grow">
                    <h4 className="font-medium text-gray-700 mb-2">特色产品：</h4>
                    <div className="flex flex-wrap gap-2">
                      {farmer.products.map(product => <span key={product} className="farm-badge">
                          {product}
                        </span>)}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-farm-green hover:bg-farm-green-dark">
                    <Link to={`/shop/${farmer.id}`}>
                      查看农场详情
                      <ExternalLink size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>)}
          </div>

          {filteredFarmers.length === 0 && <div className="text-center py-12">
              <p className="text-lg text-gray-600">没有找到匹配的农户，请尝试其他搜索条件。</p>
            </div>}
        </div>
      </section>

      {/* 加入我们 */}
      <section className="py-16 bg-farm-cream-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-farm-brown mb-4">您是农户吗？</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            加入我们的平台，直接向消费者销售您的产品，获得更好的价格，建立您自己的品牌。
          </p>
          
        </div>
      </section>
    </div>;
};
export default Farmers;