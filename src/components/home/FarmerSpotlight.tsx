
import { Separator } from "@/components/ui/separator";

const farmers = [
  {
    id: 1,
    name: "Sarah Johnson",
    farm: "Green Valley Organics",
    image: "https://images.unsplash.com/photo-1553413077-190183f6a611?w=400&auto=format&fit=crop",
    description: "Fourth-generation farmer specializing in organic vegetables and herbs.",
    products: ["Kale", "Tomatoes", "Herbs"],
    location: "Riverside County",
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    farm: "Sunny Fields Farm",
    image: "https://images.unsplash.com/photo-1504971319684-a51a2b5a4cd2?w=400&auto=format&fit=crop",
    description: "Family-owned farm growing the sweetest strawberries and stone fruits in the region.",
    products: ["Strawberries", "Peaches", "Plums"],
    location: "Valley View",
  },
  {
    id: 3,
    name: "Emma Chen",
    farm: "Heritage Acres",
    image: "https://images.unsplash.com/photo-1592087046781-466fede8b6f9?w=400&auto=format&fit=crop",
    description: "Practicing sustainable agriculture with a focus on heirloom varieties.",
    products: ["Heirloom Tomatoes", "Ancient Grains", "Artisanal Cheese"],
    location: "Mountainside",
  },
];

const FarmerSpotlight = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-farm-brown text-center mb-2">
          Meet Our Farmers
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Get to know the hard-working people behind your food. We partner with local farmers who are committed to sustainable practices.
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
                  <h4 className="font-medium text-gray-700 mb-2">Specialties:</h4>
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
