import { User, Heart, Bookmark, Lock, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface UserSidebarProps {
  onMenuClick?: (menuItem: string) => void;
  activeMenuItem?: string;
  className?: string;
}

const UserSidebar = ({
  onMenuClick,
  activeMenuItem = "profile",
  className = "",
}: UserSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      count: null,
    },
    {
      id: "listings",
      label: "My Ads Listing",
      icon: Heart,
      count: null,
    },
    {
      id: "bookmarks",
      label: "Bookmarks",
      icon: Bookmark,
      count: null,
    },
    {
      id: "password",
      label: "Change Password",
      icon: Lock,
      count: null,
    },
    {
      id: "sold",
      label: "Sold Items",
      icon: Package,
      count: null,
    },
  ];

  const handleMenuClick = (menuId: string) => {
    if (menuId === "bookmarks") {
      navigate("/bookmarks");
    } else if (menuId === "listings") {
      navigate("/listings");
    } else {
      onMenuClick?.(menuId);
    }
  };

  return (
    <Card className={`p-0 w-full max-w-xs mx-auto lg:mx-0 ${className}`}>
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">Account</h3>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeMenuItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors hover:bg-gray-50 ${
                isActive
                  ? "bg-red-50 text-red-600 border-r-2 border-red-500"
                  : "text-gray-700"
              }`}
            >
              <IconComponent
                className={`w-5 h-5 ${isActive ? "text-red-500" : "text-gray-400"}`}
              />
              <span className="font-medium">{item.label}</span>
              {item.count && (
                <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </Card>
  );
};

export default UserSidebar;
