import Listing from "./Listing";
import { Listing as ListingType, ListingFilters } from "@/types/listing";

interface ListingGridProps {
  listings: ListingType[];
  filters: ListingFilters;
  onListingClick?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  favoritedIds?: string[];
  className?: string;
}

const ListingGrid = ({
  listings,
  filters,
  onListingClick,
  onFavorite,
  onShare,
  favoritedIds = [],
  className = "",
}: ListingGridProps) => {
  const getGridClasses = () => {
    if (filters.viewMode === "list") {
      return "grid grid-cols-1 gap-4";
    }
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
  };

  const getListingClasses = () => {
    if (filters.viewMode === "list") {
      return "w-full";
    }
    return "";
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {listings.map((listing) => (
        <Listing
          key={listing.id}
          {...listing}
          onClick={onListingClick}
          onFavorite={onFavorite}
          onShare={onShare}
          isFavorited={favoritedIds.includes(listing.id)}
          className={getListingClasses()}
        />
      ))}
    </div>
  );
};

export default ListingGrid;
