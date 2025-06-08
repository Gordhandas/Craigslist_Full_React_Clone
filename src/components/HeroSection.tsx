import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Settings } from "lucide-react";

interface HeroSectionProps {
  onSearch?: (what: string, where: string, category: string) => void;
  onMoreOptions?: () => void;
  backgroundImage?: string;
  className?: string;
}

const HeroSection = ({
  onSearch,
  onMoreOptions,
  backgroundImage = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
  className = "",
}: HeroSectionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const what = (formData.get("what") as string) || "";
    const where = (formData.get("where") as string) || "";

    // Get category value from select element
    const selectElement = form.querySelector(
      'select[name="category"]',
    ) as HTMLSelectElement;
    const category = selectElement?.value || "";

    onSearch?.(what, where, category);
  };

  const categories = [
    "All Categories",
    "Furniture",
    "Pets",
    "Real Estate",
    "Jobs",
    "Car",
    "Mobile",
    "Cameras",
    "Sport",
    "Electro",
    "Clothing",
    "Books",
    "Music",
  ];

  return (
    <section
      className={`relative bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
          <span className="underline decoration-4 decoration-red-500">Buy</span>
          ,{" "}
          <span className="underline decoration-4 decoration-red-500">
            Sell
          </span>{" "}
          or{" "}
          <span className="underline decoration-4 decoration-red-500">
            Find
          </span>{" "}
          What You need
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-2 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {/* What Field */}
              <div className="flex flex-col">
                <label className="text-left text-gray-700 font-medium mb-1 text-sm px-2">
                  What?
                </label>
                <Input
                  name="what"
                  placeholder="What are you looking for?"
                  className="border-0 shadow-none focus-visible:ring-0 h-12"
                />
              </div>

              {/* Where Field */}
              <div className="flex flex-col relative">
                <label className="text-left text-gray-700 font-medium mb-1 text-sm px-2">
                  Where?
                </label>
                <div className="relative">
                  <Input
                    name="where"
                    placeholder="Enter Location"
                    className="border-0 shadow-none focus-visible:ring-0 h-12 pr-10"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                </div>
              </div>

              {/* Category Field */}
              <div className="flex flex-col">
                <label className="text-left text-gray-700 font-medium mb-1 text-sm px-2">
                  Category?
                </label>
                <Select defaultValue="">
                  <SelectTrigger
                    className="border-0 shadow-none focus:ring-0 h-12"
                    name="category"
                  >
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="flex flex-col justify-end">
                <Button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white h-12 text-base font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* More Options Link */}
        <button
          onClick={onMoreOptions}
          className="inline-flex items-center mt-6 text-white hover:text-red-300 transition-colors"
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="text-sm">More Options</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
