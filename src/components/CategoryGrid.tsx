import {
  Home,
  Heart,
  Building,
  Briefcase,
  Car,
  Smartphone,
  Camera,
  Trophy,
  Tv,
  Shirt,
  Book,
  Music,
} from "lucide-react";
import { categories, Category } from "@/data/categories";

interface CategoryGridProps {
  onCategoryClick?: (categoryId: string) => void;
  className?: string;
}

const CategoryGrid = ({
  onCategoryClick,
  className = "",
}: CategoryGridProps) => {
  const getIcon = (iconName: string) => {
    const iconMap = {
      Home,
      Heart,
      Building,
      Briefcase,
      Car,
      Smartphone,
      Camera,
      Trophy,
      Tv,
      Shirt,
      Book,
      Music,
    };

    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Home;
    return <IconComponent className="w-8 h-8 text-white" />;
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick?.(categoryId);
  };

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our wide range of categories to find exactly what
            you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer text-center hover:transform hover:scale-105 transition-all duration-200"
            >
              {/* Icon Circle */}
              <div
                className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-200`}
              >
                {getIcon(category.icon)}
              </div>

              {/* Category Info */}
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-red-500 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
