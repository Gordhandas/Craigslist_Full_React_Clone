import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, Phone, MapPin, User, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onSubmitAd?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
  onSearch?: (query: string) => void;
  contactNumber?: string;
  showMyAds?: boolean;
}

const Header = ({
  onSubmitAd,
  onLogin,
  onRegister,
  onSearch,
  contactNumber = "+123 456 789",
  showMyAds = true,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("search") as string;
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/listings?search=${encodeURIComponent(query)}`);
    }
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const navItems = [
    { label: "Home", href: "/", active: location.pathname === "/" },
    {
      label: "Listing",
      href: "/listings",
      active: location.pathname === "/listings",
    },
    { label: "Pages", href: "/pages", active: location.pathname === "/pages" },
    {
      label: "Extras",
      href: "/extras",
      active: location.pathname === "/extras",
    },
    {
      label: "Blog",
      href: "/blog/123",
      active: location.pathname.startsWith("/blog"),
    },
    {
      label: "Messages",
      href: "/messages",
      active: location.pathname === "/messages",
    },
    {
      label: "Contact",
      href: "/contact",
      active: location.pathname === "/contact",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-800 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{contactNumber}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {showMyAds && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">My Ads</span>
              </div>
            )}
            <button onClick={onLogin} className="hover:text-gray-300">
              Sign in
            </button>
            <button onClick={onRegister} className="hover:text-gray-300">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <span className="font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Craigs</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-red-500 ${
                    item.active ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                onClick={onSubmitAd}
                className="bg-red-500 hover:bg-red-600 text-white px-6"
              >
                SUBMIT AD
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Button
                onClick={onSubmitAd}
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                SUBMIT AD
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 pt-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className={`text-left text-base font-medium transition-colors hover:text-red-500 ${
                      item.active ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
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
              {location.pathname === "/bookmarks" ? "LIBRARY" : "LISTINGS"}
            </button>
            {location.pathname.includes("/listing/") && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-900">DETAIL</span>
              </>
            )}
            {location.pathname === "/bookmarks" && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-900">DATA</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar - Only show on certain pages */}
      {(location.pathname === "/" || location.pathname === "/listings") && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  name="search"
                  placeholder="Search for items..."
                  className="pr-10"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
