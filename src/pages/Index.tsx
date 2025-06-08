import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import FilterControls from "@/components/FilterControls";
import ListingGrid from "@/components/ListingGrid";
import CustomPagination from "@/components/CustomPagination";
import Footer from "@/components/Footer";
import { mockListings } from "@/data/mockListings";
import { ListingFilters, PaginationInfo } from "@/types/listing";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // State management
  const [filters, setFilters] = useState<ListingFilters>({
    sortBy: "default",
    viewMode: "grid",
  });

  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 16,
    totalItems: 0,
  });

  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Handle URL parameters
  useEffect(() => {
    const searchParam = searchParams.get("search");
    const categoryParam = searchParams.get("category");

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
  }, [searchParams]);

  // Memoized filtered and sorted listings
  const filteredAndSortedListings = useMemo(() => {
    let filtered = [...mockListings];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.category.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query),
      );
    }

    // Apply category filter
    if (
      categoryFilter.trim() &&
      categoryFilter.toLowerCase() !== "all categories"
    ) {
      filtered = filtered.filter(
        (listing) =>
          listing.category.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        // Keep default order with featured items first
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    return filtered;
  }, [filters.sortBy, searchQuery, categoryFilter]);

  // Update pagination info when filtered listings change
  useEffect(() => {
    const totalPages = Math.ceil(
      filteredAndSortedListings.length / pagination.itemsPerPage,
    );
    setPagination((prev) => ({
      ...prev,
      totalPages,
      totalItems: filteredAndSortedListings.length,
    }));
  }, [filteredAndSortedListings.length, pagination.itemsPerPage]);

  // Memoized paginated listings
  const paginatedListings = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredAndSortedListings.slice(startIndex, endIndex);
  }, [
    filteredAndSortedListings,
    pagination.currentPage,
    pagination.itemsPerPage,
  ]);

  // Event handlers
  const handleFiltersChange = (newFilters: Partial<ListingFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    // Reset to first page when filters change
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleListingClick = (id: string) => {
    navigate(`/listing/${id}`);
  };

  const handleFavorite = (id: string) => {
    setFavoritedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      } else {
        return [...prev, id];
      }
    });
    console.log("Favorite toggled for listing:", id);
  };

  const handleShare = (id: string) => {
    const listing = mockListings.find((l) => l.id === id);
    if (listing) {
      const url = `${window.location.origin}/listing/${id}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log("Listing URL copied to clipboard");
        })
        .catch(() => {
          console.log("Failed to copy URL");
        });
    }
  };

  const handleSubmitAd = () => {
    console.log("Submit ad clicked - would navigate to submit ad page");
  };

  const handleLogin = () => {
    console.log("Login clicked - would open login modal");
  };

  const handleRegister = () => {
    console.log("Register clicked - would open register modal");
  };

  const handleNavigationClick = (page: string) => {
    if (page.startsWith("/")) {
      navigate(page);
    } else {
      switch (page) {
        case "home":
          navigate("/");
          break;
        case "listing":
          navigate("/listings");
          break;
        case "bookmarks":
          navigate("/bookmarks");
          break;
        case "contact":
          navigate("/contact");
          break;
        case "my-ads":
          navigate("/listings");
          break;
        case "signin":
          handleLogin();
          break;
        case "register":
          handleRegister();
          break;
        case "submit-ad":
          handleSubmitAd();
          break;
        default:
          console.log("Navigation clicked:", page);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onSubmitAd={handleSubmitAd}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Listing Grid Full Width
          </h1>
          <p className="text-gray-600">
            Browse through our extensive collection of listings
          </p>
        </div>

        {/* Filter Controls */}
        <FilterControls
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalItems={filteredAndSortedListings.length}
          className="border-b border-gray-200 mb-8"
        />

        {/* Listings Grid */}
        {paginatedListings.length > 0 ? (
          <ListingGrid
            listings={paginatedListings}
            filters={filters}
            onListingClick={handleListingClick}
            onFavorite={handleFavorite}
            onShare={handleShare}
            favoritedIds={favoritedIds}
            className="mb-12"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No listings found matching your criteria.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <CustomPagination
            pagination={pagination}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigationClick={handleNavigationClick} />
    </div>
  );
};

export default Index;
