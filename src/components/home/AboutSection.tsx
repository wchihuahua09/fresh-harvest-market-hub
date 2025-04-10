
const features = [
  {
    icon: <Leaf className="h-10 w-10 text-farm-green" />,
    title: "新鲜有机",
    description: "我们重视对环境友好的有机耕作方式。",
  },
  {
    icon: <Truck className="h-10 w-10 text-farm-green" />,
    title: "农场直达",
    description: "从采摘到您的餐桌，最快保证新鲜。",
  },
  {
    icon: <Users className="h-10 w-10 text-farm-green" />,
    title: "支持本地",
    description: "您的购买直接支持本地农户和可持续农业。",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-farm-green" />,
    title: "品质保证",
    description: "我们对每一件产品的品质都有承诺和保障。",
  },
];

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-farm-brown mb-4">
              我们的使命：连接农场与家庭
            </h2>
            <p className="text-gray-700 mb-6">
              新鲜收获成立的初衷是构建一个直接连接本地农户和消费者的桥梁。我们相信一个透明、可持续、对所有参与者都有益的食品系统。
            </p>
            <p className="text-gray-700 mb-6">
              通过减少中间环节，我们确保农户能获得公平的补偿，同时消费者可以用合理的价格买到最新鲜的农产品。我们的平台让您轻松了解食物的来源和生产者。
            </p>
            <Button asChild className="bg-farm-green hover:bg-farm-green-dark text-white">
              <Link to="/about">了解更多</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-farm-cream p-6 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-farm-brown mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
