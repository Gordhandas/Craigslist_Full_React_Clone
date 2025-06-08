import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User } from "lucide-react";
import { Listing } from "@/types/listing";

interface FeaturedListingsProps {
  listings: Listing[];
  onListingClick: (id: string) => void;
  className?: string;
}

const FeaturedListings: React.FC<FeaturedListingsProps> = ({
  listings,
  onListingClick,
  className = "",
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {listings.map((listing) => (
        <Card
          key={listing.id}
          className="flex flex-col sm:flex-row hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => onListingClick(listing.id)}
        >
          {/* Image */}
          <div className="relative w-full sm:w-64 h-48 flex-shrink-0">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-gray-800 text-white text-xs px-2 py-1">
                {listing.category.toUpperCase()}
              </Badge>
            </div>

            {/* Featured Badge */}
            {listing.featured && (
              <div className="absolute top-3 right-3">
                <Badge variant="destructive" className="text-xs px-2 py-1">
                  FEATURED
                </Badge>
              </div>
            )}

            {/* Price */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-black/70 text-white px-3 py-1 rounded text-lg font-bold">
                {listing.currency}
                {listing.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Content */}
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-red-500 transition-colors">
                  {listing.title}
                </h3>

                <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.location}</span>
                </div>
              </div>

              <Badge
                variant={listing.type === "offer" ? "default" : "secondary"}
                className="text-xs"
              >
                {listing.type.toUpperCase()}
              </Badge>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {listing.description}
            </p>

            {/* Additional Details for specific categories */}
            {(listing.category === "Jobs" || listing.category === "Education") && (
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500 block">START DATE</span>
                  <span className="font-medium">25.06.2017 09:00</span>
                </div>
                <div>
                  <span className="text-gray-500 block">LENGTH</span>
                  <span className="font-medium">2 months</span>
                </div>
                <div>
                  <span className="text-gray-500 block">SESSIONS</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{listing.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{listing.author}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                Detail
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedListings;
