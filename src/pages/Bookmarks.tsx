import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import UserSidebar from "@/components/UserSidebar";
import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";
import CustomPagination from "@/components/CustomPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { mockListings } from "@/data/mockListings";
import { PaginationInfo } from "@/types/listing";

const Bookmarks = () => {
  const navigate = useNavigate();

  // State management
  const [activeMenuItem, setActiveMenuItem] = useState("bookmarks");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 6,
    totalItems: 0,
  });

  // Mock bookmarked listings (first 7 items for demo)
  const bookmarkedListings = useMemo(() => mockListings.slice(0, 7), []);

  // Memoized sorted listings
  const sortedListings = useMemo(() => {
    let sorted = [...bookmarkedListings];

    switch (sortBy) {
      case "newest":
        sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        // Keep default order with featured items first
        sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    return sorted;
  }, [bookmarkedListings, sortBy]);

  // Update pagination info when sorted listings change
  useEffect(() => {
    const totalPages = Math.ceil(
      sortedListings.length / pagination.itemsPerPage,
    );
    setPagination((prev) => ({
      ...prev,
      totalPages,
      totalItems: sortedListings.length,
    }));
  }, [sortedListings.length, pagination.itemsPerPage]);

  // Memoized paginated listings
  const paginatedListings = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return sortedListings.slice(startIndex, endIndex);
  }, [sortedListings, pagination.currentPage, pagination.itemsPerPage]);

  // Event handlers
  const handleMenuClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
    switch (menuItem) {
      case "listings":
        navigate("/listings");
        break;
      case "profile":
        console.log("Navigate to profile");
        break;
      default:
        console.log("Menu clicked:", menuItem);
    }
  };

  const handleListingClick = (id: string) => {
    navigate(`/listing/${id}`);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitAd = () => {
    console.log("Submit ad clicked");
  };

  const handleLogin = () => {
    console.log("Login clicked");
  };

  const handleRegister = () => {
    console.log("Register clicked");
  };

  const handleHeaderSearch = (query: string) => {
    navigate(`/listings?search=${encodeURIComponent(query)}`);
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
        default:
          console.log("Navigation clicked:", page);
      }
    }
  };

  const sortOptions = [
    { value: "default", label: "Default Sorting" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onSubmitAd={handleSubmitAd}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSearch={handleHeaderSearch}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <button
              onClick={() => navigate("/")}
              className="hover:text-red-500"
            >
              HOME
            </button>
            <span className="mx-2">/</span>
            <button
              onClick={() => navigate("/listings")}
              className="hover:text-red-500"
            >
              LIBRARY
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">DATA</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <UserSidebar
              onMenuClick={handleMenuClick}
              activeMenuItem={activeMenuItem}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              {/* Sort Control */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={handleSortChange}>
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

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleViewModeChange("grid")}
                  className="w-10 h-10"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleViewModeChange("list")}
                  className="w-10 h-10"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bookmarked Listings */}
            {paginatedListings.length > 0 ? (
              <div className="mb-8">
                {viewMode === "list" ? (
                  <FeaturedListings
                    listings={paginatedListings}
                    onListingClick={handleListingClick}
                    showSortControl={false}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedListings.map((listing) => (
                      <div
                        key={listing.id}
                        onClick={() => handleListingClick(listing.id)}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                              {listing.category.toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="bg-red-500 text-white p-1 rounded">
                              <svg
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <span className="bg-black/70 text-white px-2 py-1 rounded text-lg font-bold">
                              {listing.currency}
                              {listing.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {listing.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {listing.location}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {listing.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No bookmarked listings found.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Start browsing and bookmark your favorite items!
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigationClick={handleNavigationClick} />
    </div>
  );
};

export default Bookmarks;
