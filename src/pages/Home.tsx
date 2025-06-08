import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import UserSidebar from "@/components/UserSidebar";
import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";
import CustomPagination from "@/components/CustomPagination";
import { mockListings } from "@/data/mockListings";
import { PaginationInfo } from "@/types/listing";

const Home = () => {
  const navigate = useNavigate();

  // State management
  const [activeMenuItem, setActiveMenuItem] = useState("profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 6,
    totalItems: 0,
  });

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let filtered = [...mockListings];

    // Apply search filters
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query),
      );
    }

    if (selectedCategory && selectedCategory !== "all categories") {
      filtered = filtered.filter(
        (listing) =>
          listing.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (selectedLocation.trim()) {
      filtered = filtered.filter((listing) =>
        listing.location.toLowerCase().includes(selectedLocation.toLowerCase()),
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
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
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  // Update pagination info when filtered listings change
  useEffect(() => {
    const totalPages = Math.ceil(
      filteredListings.length / pagination.itemsPerPage,
    );
    setPagination((prev) => ({
      ...prev,
      totalPages,
      totalItems: filteredListings.length,
    }));
  }, [filteredListings.length, pagination.itemsPerPage]);

  // Paginated listings
  const paginatedListings = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredListings.slice(startIndex, endIndex);
  }, [filteredListings, pagination.currentPage, pagination.itemsPerPage]);

  // Event handlers
  const handleSearch = (what: string, where: string, category: string) => {
    setSearchQuery(what);
    setSelectedLocation(where);
    setSelectedCategory(category);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to listings page with category filter
    navigate(`/listings?category=${encodeURIComponent(categoryId)}`);
  };

  const handleMenuClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
    // Navigate to different sections based on menu item
    switch (menuItem) {
      case "listings":
        navigate("/listings");
        break;
      case "profile":
        console.log("Navigate to profile");
        break;
      case "bookmarks":
        console.log("Navigate to bookmarks");
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

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 600, behavior: "smooth" });
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

  const handleHeaderSearch = (query: string) => {
    navigate(`/listings?search=${encodeURIComponent(query)}`);
  };

  const handleMoreOptions = () => {
    console.log("More options clicked - would show advanced search");
  };

  const handleNavigationClick = (page: string) => {
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "listing":
        navigate("/listings");
        break;
      case "my-ads":
        navigate("/listings"); // Could be a user-specific page
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onSubmitAd={handleSubmitAd}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSearch={handleHeaderSearch}
      />

      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} onMoreOptions={handleMoreOptions} />

      {/* Categories Grid */}
      <CategoryGrid onCategoryClick={handleCategoryClick} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 w-full max-w-xs">
            <UserSidebar
              onMenuClick={handleMenuClick}
              activeMenuItem={activeMenuItem}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <FeaturedListings
              listings={paginatedListings}
              onListingClick={handleListingClick}
              className="mb-8"
            />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <CustomPagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigationClick={handleNavigationClick} />
    </div>
  );
};

export default Home;
