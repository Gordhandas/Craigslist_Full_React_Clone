import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  onNavigationClick?: (page: string) => void;
  contactInfo?: {
    address: string;
    city: string;
    email: string;
    skype: string;
  };
  className?: string;
}

const Footer = ({
  onNavigationClick,
  contactInfo = {
    address: "124 Abia Martin Drive",
    city: "New York, NY 10011",
    email: "hello@example.com",
    skype: "Craigs",
  },
  className = "",
}: FooterProps) => {
  const navigate = useNavigate();

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Listing", href: "/listings" },
    { label: "Pages", href: "/pages" },
    { label: "Extras", href: "/extras" },
    { label: "Contact", href: "/contact" },
    { label: "Submit Ad", href: "/submit-ad" },
  ];

  const userLinks = [
    { label: "My Ads", href: "/listings" },
    { label: "Bookmarks", href: "/bookmarks" },
    { label: "Sign In", href: "/signin" },
    { label: "Register", href: "/register" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      onNavigationClick?.(href);
    }
  };

  return (
    <footer className={`bg-white border-t ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <span className="font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Craigs</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec
              tincidunt arcu, id fermentum sem. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                {navigationLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="block text-sm text-gray-600 hover:text-red-500 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {userLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="block text-sm text-gray-600 hover:text-red-500 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Contact</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <p>{contactInfo.address}</p>
                <p>{contactInfo.city}</p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-red-500 hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </p>
                <p>
                  <span className="font-medium">Skype:</span>{" "}
                  {contactInfo.skype}
                </p>
              </div>
            </div>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              CONTACT US
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2024 Craigs. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <button className="hover:text-red-500 transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-red-500 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
