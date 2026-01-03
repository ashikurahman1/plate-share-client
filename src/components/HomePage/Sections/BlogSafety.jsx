import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const posts = [
  {
    title: "How to properly store leftovers",
    category: "Food Safety",
    date: "Dec 12, 2024",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "10 best practices for food donors",
    category: "Community",
    date: "Jan 02, 2025",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Reducing waste in your home kitchen",
    category: "Sustainable Living",
    date: "Jan 04, 2025",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400"
  }
];

const BlogSafety = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-base font-bold text-primary tracking-widest uppercase mb-3">Resources</h2>
            <h3 className="text-4xl md:text-5xl font-black">Food Safety & Tips</h3>
          </div>
          <button className="btn btn-ghost text-primary font-bold flex items-center gap-2 group">
            View All Articles <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary">
                  {p.category}
                </div>
              </div>
              <p className="text-sm opacity-50 mb-3 font-bold">{p.date}</p>
              <h4 className="text-2xl font-black group-hover:text-primary transition-colors leading-tight mb-4">
                {p.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSafety;
