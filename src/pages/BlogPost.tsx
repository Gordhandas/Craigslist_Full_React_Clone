import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSidebar from "@/components/BlogSidebar";

const mockPost = {
  title: "10 tips for renovation",
  categories: ["Home & Decor", "Design"],
  author: {
    name: "Judy Ivey",
    location: "Manhattan, NY",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  date: "02.05.2017",
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  content: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec tincidunt arcu, sit amet fermentum sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum tincidunt, sapien sagittis sollicitudin dapibus, risus mi euismod elit.

In nec nulla nec enim vehicula mattis id vel nunc. Quisque vel augue in erat scelerisque egestas at et leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cur sus orci et lacus imperdiet, sed maximus nibh laoreet. Nam posuere dolor id orci fringilla, imperdiet porttitor justo varius. Proin ac lorem condimentum, iaculis tortor sed, semper dui. Praesent dignissim posuere euismod. Donec cursus massa nisi, eget lobortis eros vestibulum vitae. Vivamus a sapien sem. Praesent in massa dui. Aliquam augue sem, porttitor in orci quis, tempus bibendum purus. Suspendisse at aliquet ex, id egestas nisi. Donec quis dictum quam. Nullam sed sodales nisl. Duis eget consectetur eu, eu sodales nisl.
  `,
};

const mockComments = [
  {
    id: 1,
    name: "Jane Doe",
    date: "02.05.2017",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content:
      "Nam pulvinar tortor nec lacinia efficitur. Integer erat tortor, ultricies ut est vel, euismod imperdiet lacus. Aenean nec turpis condimentum, mollis mauris id, scelerisque quam.",
  },
  {
    id: 2,
    name: "John Doe",
    date: "02.05.2017",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    content:
      "Integer erat tortor, ultricies ut est vel, euismod imperdiet lacus. Aenean nec turpis condimentum, mollis mauris id, scelerisque quam.",
  },
  {
    id: 3,
    name: "Susan Jefferson",
    date: "02.05.2017",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    content:
      "Cras luctus aliquet fringilla. In eu cursus nunc. Quisque dolor leo, vehicula a sem ut, aliquam pretium tellus. Morbi ut mi eleifend, sollicitudin nisi in, elementum nisi. Praesent sed libero euismod, pellentesque risus sit amet, faucibus lorem. Pellentesque bibendum libero sed tempor tristique.",
  },
];

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name && newComment.email && newComment.content) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          name: newComment.name,
          date: new Date().toLocaleDateString(),
          avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
          content: newComment.content,
        },
      ]);
      setNewComment({ name: "", email: "", content: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full grid grid-cols-1 lg:grid-cols-4 gap-12">
        <article className="bg-white rounded shadow p-8 lg:col-span-3">
          <img
            src={mockPost.image}
            alt={mockPost.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
          <h1 className="text-4xl font-bold mb-2">{mockPost.title}</h1>
          <div className="flex space-x-2 mb-4">
            {mockPost.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs font-semibold uppercase bg-gray-200 rounded px-2 py-1"
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-4 mb-6 text-gray-600 text-sm">
            <span>By {mockPost.author.name}</span>
            <span>•</span>
            <span>{mockPost.date}</span>
          </div>
          <section className="prose max-w-none mb-8 whitespace-pre-line">
            {mockPost.content}
          </section>

          {/* Author Bio */}
          <div className="flex items-center space-x-6 mb-8 p-4 bg-gray-100 rounded">
            <img
              src={mockPost.author.avatar}
              alt={mockPost.author.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{mockPost.author.name}</h3>
              <p className="text-gray-600">{mockPost.author.location}</p>
              <p className="text-yellow-500">{"★".repeat(mockPost.author.rating)}</p>
              <div className="flex space-x-4 mt-2">
                <a href={mockPost.author.social.facebook} aria-label="Facebook" className="hover:text-red-500">FB</a>
                <a href={mockPost.author.social.twitter} aria-label="Twitter" className="hover:text-red-500">TW</a>
                <a href={mockPost.author.social.instagram} aria-label="Instagram" className="hover:text-red-500">IG</a>
              </div>
            </div>
          </div>

          {/* Previous and Next Post Navigation */}
          <div className="flex justify-between mb-8 text-sm text-gray-600">
            <button className="hover:text-red-500">{'<'} Previous Post: Concrete Decorations</button>
            <button className="hover:text-red-500">Next Post: Professional kitchen at your home {'>'}</button>
          </div>

          {/* Comments Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <div className="space-y-6 mb-8">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{comment.name}</p>
                    <p className="text-xs text-gray-500">{comment.date}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-4 max-w-2xl">
              <h3 className="text-xl font-semibold">Add Comment</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={newComment.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={newComment.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <textarea
                name="content"
                placeholder="Your Comment"
                value={newComment.content}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                rows={4}
                required
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Add Comment
              </button>
            </form>
          </section>
        </article>
        <BlogSidebar />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
