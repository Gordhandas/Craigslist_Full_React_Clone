import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const peopleData = [
  {
    id: 1,
    name: "Jane Brown",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "24 Hour Ago",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    category: "All",
  },
  {
    id: 2,
    name: "Rosina Warner",
    message: "Fusce consectetur nibh ac euismod vestibulum. Sed sit",
    time: "48 Hour Ago",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    category: "All",
  },
  {
    id: 3,
    name: "George A. Stevens",
    message: "Nam vel egestas lacus, eget rutrum justo. Fusce eleifend,",
    time: "28.03.2017",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "All",
  },
  {
    id: 4,
    name: "Renee Williams",
    message: "Donec consequat lobortis erat non tempus. Quisque id",
    time: "05.03.2017",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "All",
  },
  {
    id: 5,
    name: "Nicola Armstrong",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "11.01.2017",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    category: "All",
  },
];

const categories = ["All", "Buyers", "Sellers", "Blocked"];

const messagesData = [
  {
    id: 1,
    sender: "Rosina Warner",
    senderAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Curabitur vel venenatis sem. Fusce suscipit pharetra nisl, sit amet blandit sem sollicitudin ac.",
    time: "24 hour ago",
    fromMe: false,
  },
  {
    id: 2,
    sender: "Rosina Warner",
    senderAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Vivamus laoreet nisl a odio commodo varius. Donec arcu mauris, molestie a euismod at, mattis eu arcu. Cras volutpat, velit sit amet cursus molestie, ex ipsum sagittis urna, vitae auctor augue erat eget justo. Sed dignissim lacus risus, ut blandit nunc volutpat quis. Fusce porta semper nisi, quis lobortis nulla ultricies ac.",
    time: "24 hour ago",
    fromMe: false,
  },
  {
    id: 3,
    sender: "You",
    senderAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Cras volutpat, velit sit amet cursus molestie, ex ipsum sagittis urna, vitae auctor augue erat eget justo. Sed",
    time: "",
    fromMe: true,
  },
];

const Messages = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPersonId, setSelectedPersonId] = useState(peopleData[0].id);
  const [newMessage, setNewMessage] = useState("");

  const filteredPeople = peopleData.filter(
    (person) =>
      selectedCategory === "All" || person.category === selectedCategory
  );

  const selectedPerson = peopleData.find((p) => p.id === selectedPersonId);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Reset selected person to first in filtered list
    const filtered = peopleData.filter(
      (person) => category === "All" || person.category === category
    );
    if (filtered.length > 0) {
      setSelectedPersonId(filtered[0].id);
    }
  };

  const handlePersonClick = (id: number) => {
    setSelectedPersonId(id);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    // For now, just clear input (no real sending)
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 flex space-x-2">
          <button
            onClick={() => window.history.back()}
            className="hover:text-red-500"
          >
            HOME
          </button>
          <span>/</span>
          <button className="hover:text-red-500">LIBRARY</button>
          <span>/</span>
          <span className="text-gray-900">DATA</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">Messages</h1>

        <div className="flex flex-col md:flex-row md:space-x-8 space-x-0 space-y-4 md:space-y-0">
          {/* People List */} 
          <div className="w-full md:w-1/3 bg-white rounded-md shadow-md p-4 flex flex-col">
            {/* Tabs */}
            <div className="flex space-x-4 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 rounded-md text-sm font-medium border ${
                    selectedCategory === category
                      ? "bg-red-500 text-white border-red-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* People Scroll List */}
            <div className="overflow-y-auto flex-grow space-y-4">
              {filteredPeople.map((person) => (
                <div
                  key={person.id}
                  onClick={() => handlePersonClick(person.id)}
                  className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
                    selectedPersonId === person.id
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{person.name}</p>
                    <p className="text-xs text-gray-600">{person.message}</p>
                    <p className="text-xs text-gray-400">{person.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Window */}
          <div className="w-full md:w-2/3 bg-white rounded-md shadow-md p-4 flex flex-col">
            {/* Header */}
            {selectedPerson && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedPerson.avatar}
                    alt={selectedPerson.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-semibold">{selectedPerson.name}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-sm font-semibold">You</p>
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="You"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Messages Scroll */}
            <div className="flex-grow overflow-y-auto space-y-4 mb-4 max-h-[400px]">
              {messagesData.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-md max-w-[70%] text-sm whitespace-pre-wrap ${
                    msg.fromMe
                      ? "bg-red-500 text-white self-end rounded-tr-none"
                      : "bg-gray-200 text-gray-700 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Your Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-red-500 hover:bg-red-600 text-white px-6"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
