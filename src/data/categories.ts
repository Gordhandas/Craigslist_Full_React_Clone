export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "furniture",
    name: "Furniture",
    description: "Beds, Sofas, Garden...",
    icon: "Home",
    color: "bg-red-500",
  },
  {
    id: "pets",
    name: "Pets",
    description: "Dogs, Cats, Exotic...",
    icon: "Heart",
    color: "bg-red-500",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Houses, Apartments...",
    icon: "Building",
    color: "bg-red-500",
  },
  {
    id: "jobs",
    name: "Jobs",
    description: "Find Job, Offer Job...",
    icon: "Briefcase",
    color: "bg-red-500",
  },
  {
    id: "car",
    name: "Car",
    description: "New, Used, Rent...",
    icon: "Car",
    color: "bg-red-500",
  },
  {
    id: "mobile",
    name: "Mobile",
    description: "Apple, Samsung...",
    icon: "Smartphone",
    color: "bg-red-500",
  },
  {
    id: "cameras",
    name: "Cameras",
    description: "Photo, Video, Lenses...",
    icon: "Camera",
    color: "bg-red-500",
  },
  {
    id: "sport",
    name: "Sport",
    description: "Ski, Bike, Hockey...",
    icon: "Trophy",
    color: "bg-red-500",
  },
  {
    id: "electro",
    name: "Electro",
    description: "TV, Radio, PC...",
    icon: "Tv",
    color: "bg-red-500",
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Shirts, Trousers...",
    icon: "Shirt",
    color: "bg-red-500",
  },
  {
    id: "books",
    name: "Books",
    description: "Fantasy, History, Sci-Fi...",
    icon: "Book",
    color: "bg-red-500",
  },
  {
    id: "music",
    name: "Music",
    description: "Rock, Techno, Folk...",
    icon: "Music",
    color: "bg-red-500",
  },
];
