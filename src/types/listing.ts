export interface Listing {
  id: string;
  type: "offer" | "wanted";
  category: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  image: string;
  date: string;
  author: string;
  featured?: boolean;
  urgent?: boolean;
  condition?: "new" | "used" | "fair" | "excellent";
  phone?: string;
  email?: string;
}

export interface ListingFilters {
  sortBy: "default" | "price-low" | "price-high" | "newest" | "oldest";
  viewMode: "grid" | "list";
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}
