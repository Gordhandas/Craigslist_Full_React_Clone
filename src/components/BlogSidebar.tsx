import React from "react";

const popularPosts = [
  {
    id: 1,
    title: "How to build a cool swimming pool",
    author: "John Doe",
    date: "02.05.2017",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 2,
    title: "Concrete decorations can be beautiful",
    author: "John Doe",
    date: "02.05.2017",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 3,
    title: "Let's take a break",
    author: "John Doe",
    date: "02.05.2017",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=80&q=80",
  },
];

const popularArchive = [
  { month: "January 2017", count: 4 },
  { month: "February 2017", count: 12 },
  { month: "October 2016", count: 8 },
  { month: "August 2016", count: 3 },
  { month: "May 2016", count: 11 },
];

const BlogSidebar = () => {
  return (
    <aside className="w-full max-w-sm space-y-8">
      {/* Search Blog */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Search Blog</h2>
        <input
          type="text"
          placeholder="Enter keyword and press enter"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </section>

      {/* Popular Posts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Popular Posts</h2>
        <ul className="space-y-4">
          {popularPosts.map((post) => (
            <li key={post.id} className="flex space-x-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-sm font-semibold">{post.title}</h3>
                <p className="text-xs text-gray-600">{post.author}</p>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Popular Post Archive */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Popular Post</h2>
        <ul className="space-y-2 text-gray-600 text-sm">
          {popularArchive.map((archive, index) => (
            <li key={index} className="flex justify-between border-b border-gray-200 pb-1">
              <span>{archive.month}</span>
              <span>{archive.count}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default BlogSidebar;
