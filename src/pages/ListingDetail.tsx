import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockListings } from "@/data/mockListings";

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const listing = mockListings.find((item) => item.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Listing Not Found
          </h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
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
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "listing":
        navigate("/listings");
        break;
      default:
        console.log("Navigation to:", page);
    }
  };

  const handleFavorite = () => {
    console.log("Added to favorites:", listing.id);
  };

  const handleShare = () => {
    console.log("Share listing:", listing.id);
  };

  const handleContact = () => {
    console.log("Contact seller for listing:", listing.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSubmitAd={handleSubmitAd}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSearch={handleHeaderSearch}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="aspect-[16/10] mb-6 relative overflow-hidden rounded-lg">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="bg-gray-800 text-white">
                  {listing.category.toUpperCase()}
                </Badge>
                {listing.featured && (
                  <Badge variant="destructive">FEATURED</Badge>
                )}
                {listing.urgent && (
                  <Badge className="bg-orange-500">URGENT</Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/80 hover:bg-white"
                  onClick={handleFavorite}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/80 hover:bg-white"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Title and Price */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {listing.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{listing.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-red-500">
                  {listing.currency}
                  {listing.price.toLocaleString()}
                </div>
                <Badge
                  variant={listing.type === "offer" ? "default" : "secondary"}
                  className="mt-2"
                >
                  {listing.type.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {listing.description}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-medium">{listing.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium capitalize">
                      {listing.type}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 font-medium">{listing.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Posted:</span>
                    <span className="ml-2 font-medium">{listing.date}</span>
                  </div>
                  {listing.condition && (
                    <div>
                      <span className="text-gray-600">Condition:</span>
                      <span className="ml-2 font-medium capitalize">
                        {listing.condition}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Seller */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">{listing.author}</div>
                    <div className="text-sm text-gray-600">Seller</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={handleContact}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Seller
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleContact}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                {listing.phone && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-600">Phone:</div>
                    <div className="font-medium">{listing.phone}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Safety Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Meet in a public place</li>
                  <li>• Don't send money in advance</li>
                  <li>• Check the item before buying</li>
                  <li>• Trust your instincts</li>
                  <li>• Report suspicious activity</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer onNavigationClick={handleNavigationClick} />
    </div>
  );
};

export default ListingDetail;
