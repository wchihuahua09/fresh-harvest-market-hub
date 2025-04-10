
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Truck, Users, ShieldCheck } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-farm-green" />,
      title: "Fresh & Organic",
      description: "We prioritize organic farming methods that are better for you and the environment.",
    },
    {
      icon: <Truck className="h-10 w-10 text-farm-green" />,
      title: "Farm to Table",
      description: "From harvest to your doorstep in record time for maximum freshness.",
    },
    {
      icon: <Users className="h-10 w-10 text-farm-green" />,
      title: "Support Local",
      description: "Your purchase directly supports local farmers and sustainable agriculture.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-farm-green" />,
      title: "Quality Guaranteed",
      description: "We stand behind the quality of every product with our satisfaction guarantee.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-farm-brown mb-4">
              Our Mission: Connecting Farms & Families
            </h2>
            <p className="text-gray-700 mb-6">
              FreshHarvest was founded with a simple yet powerful mission: to create a direct bridge between local farmers and consumers. We believe in a food system that's transparent, sustainable, and beneficial for everyone involved.
            </p>
            <p className="text-gray-700 mb-6">
              By cutting out the middlemen, we ensure that farmers receive fair compensation for their hard work, while customers get the freshest produce at reasonable prices. Our platform makes it easy to know exactly where your food comes from and who grew it.
            </p>
            <Button asChild className="bg-farm-green hover:bg-farm-green-dark text-white">
              <Link to="/about">Learn More About Us</Link>
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
