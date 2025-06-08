import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Heart, Share2 } from "lucide-react";
import { Listing as ListingType } from "@/types/listing";
import { Button } from "@/components/ui/button";

interface ListingProps extends ListingType {
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  onClick?: (id: string) => void;
  isFavorited?: boolean;
  showActions?: boolean;
  className?: string;
}

const Listing = ({
  id,
  type,
  category,
  title,
  description,
  price,
  currency,
  location,
  image,
  date,
  author,
  featured = false,
  urgent = false,
  onFavorite,
  onShare,
  onClick,
  isFavorited = false,
  showActions = true,
  className = "",
}: ListingProps) => {
  const handleCardClick = () => {
    onClick?.(id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(id);
  };

  return (
    <Card
      className={`group cursor-pointer hover:shadow-lg transition-all duration-200 ${className}`}
      onClick={handleCardClick}
    >
      <div className="relative">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {featured && (
            <Badge
              variant="destructive"
              className="bg-red-500 text-white text-xs px-2 py-1"
            >
              FEATURED
            </Badge>
          )}
          {urgent && (
            <Badge
              variant="destructive"
              className="bg-orange-500 text-white text-xs px-2 py-1"
            >
              URGENT
            </Badge>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/80 hover:bg-white w-8 h-8"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/80 hover:bg-white w-8 h-8"
              onClick={handleShareClick}
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-black/70 text-white px-3 py-1 rounded text-lg font-bold">
            {currency}
            {price.toLocaleString()}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {category.toUpperCase()}
          </Badge>
          <Badge
            variant={type === "offer" ? "default" : "secondary"}
            className="text-xs"
          >
            {type === "offer" ? "OFFER" : "WANTED"}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{author}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Listing;
