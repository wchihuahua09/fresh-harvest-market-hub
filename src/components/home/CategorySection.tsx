import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "蔬菜",
    description: "新鲜应季蔬菜",
    image: "https://images.unsplash.com/photo-1467019972079-a273e1bc9173?w=800&auto=format&fit=crop",
    path: "/category/vegetables",
  },
  {
    id: 2,
    name: "水果",
    description: "甜美多汁的水果",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&auto=format&fit=crop",
    path: "/category/fruits",
  },
  {
    id: 3,
    name: "乳制品",
    description: "新鲜农场乳制品",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&auto=format&fit=crop",
    path: "/category/dairy",
  },
  {
    id: 4,
    name: "谷物",
    description: "有机谷物和豆类",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop",
    path: "/category/grains",
  },
];

const CategorySection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-farm-brown text-center mb-8">
          按分类购买
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.path} className="block">
              <div className="farm-card h-full overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25 flex items-end justify-start p-4">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm text-gray-100">{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
