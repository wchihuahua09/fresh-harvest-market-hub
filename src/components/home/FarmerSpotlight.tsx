
const farmers = [
  {
    id: 1,
    name: "王丽",
    farm: "绿谷有机农场",
    image: "https://images.unsplash.com/photo-1553413077-190183f6a611?w=400&auto=format&fit=crop",
    description: "第四代农户，专注于有机蔬菜和草药种植。",
    products: ["羽衣甘蓝", "番茄", "香草"],
    location: "河北省",
  },
  {
    id: 2,
    name: "李明",
    farm: "阳光田野农场",
    image: "https://images.unsplash.com/photo-1504971319684-a51a2b5a4cd2?w=400&auto=format&fit=crop",
    description: "家族农场，以种植最甜美的草莓和桃子而闻名。",
    products: ["草莓", "桃子", "李子"],
    location: "山东省",
  },
  {
    id: 3,
    name: "陈晓",
    farm: "传承农场",
    image: "https://images.unsplash.com/photo-1592087046781-466fede8b6f9?w=400&auto=format&fit=crop",
    description: "践行可持续农业，专注于传统品种。",
    products: ["传统番茄", "古代谷物", "手工奶酪"],
    location: "云南省",
  },
];

const FarmerSpotlight = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-farm-brown text-center mb-2">
          认识我们的农户
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          了解为您提供食物的辛勤工作者。我们与致力于可持续实践的本地农户合作。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {farmers.map((farmer) => (
            <div key={farmer.id} className="farm-card h-full flex flex-col">
              <img
                src={farmer.image}
                alt={farmer.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-farm-brown">{farmer.name}</h3>
                <p className="text-farm-green font-medium">{farmer.farm}</p>
                <p className="text-sm text-gray-500 mb-4">{farmer.location}</p>
                <Separator className="mb-4" />
                <p className="text-gray-700 mb-4 flex-grow">{farmer.description}</p>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">特色产品：</h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.products.map((product) => (
                      <span key={product} className="farm-badge">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmerSpotlight;
