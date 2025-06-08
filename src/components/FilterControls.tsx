import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, LayoutGrid } from "lucide-react";
import { ListingFilters } from "@/types/listing";

interface FilterControlsProps {
  filters: ListingFilters;
  onFiltersChange: (filters: Partial<ListingFilters>) => void;
  totalItems?: number;
  className?: string;
}

const FilterControls = ({
  filters,
  onFiltersChange,
  totalItems = 0,
  className = "",
}: FilterControlsProps) => {
  const sortOptions = [
    { value: "default", label: "Default Sorting" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  const handleSortChange = (value: string) => {
    onFiltersChange({ sortBy: value as ListingFilters["sortBy"] });
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    onFiltersChange({ viewMode: mode });
  };

  return (
    <div className={`flex items-center justify-between py-4 ${className}`}>
      {/* Sort Controls */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Sort by:</span>
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">Showing {totalItems} results</div>

      {/* View Mode Toggle */}
      <div className="flex items-center space-x-2">
        <Button
          variant={filters.viewMode === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => handleViewModeChange("grid")}
          className="w-10 h-10"
        >
          <LayoutGrid className="w-4 h-4" />
        </Button>
        <Button
          variant={filters.viewMode === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => handleViewModeChange("list")}
          className="w-10 h-10"
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;
