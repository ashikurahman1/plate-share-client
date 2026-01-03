import React from 'react';
import { FaAppleAlt, FaBreadSlice, FaEgg, FaCarrot } from 'react-icons/fa';

const categories = [
  { name: "Fruits", icon: <FaAppleAlt />, count: 120, color: "bg-red-500/10 text-red-500" },
  { name: "Bakery", icon: <FaBreadSlice />, count: 85, color: "bg-amber-500/10 text-amber-500" },
  { name: "Dairy", icon: <FaEgg />, count: 64, color: "bg-blue-500/10 text-blue-500" },
  { name: "Vegetables", icon: <FaCarrot />, count: 156, color: "bg-green-500/10 text-green-500" },
];

const Categories = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-base font-bold text-primary tracking-widest uppercase mb-3">Browse Items</h2>
            <h3 className="text-4xl md:text-5xl font-black italic">Popular Categories</h3>
          </div>
          <button className="btn btn-outline btn-primary rounded-xl px-10">View All</button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((c, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-base-200/50 hover:bg-base-200 transition-all cursor-pointer group flex flex-col items-center text-center">
              <div className={`text-4xl mb-6 p-6 rounded-full ${c.color} group-hover:rotate-12 transition-transform`}>
                {c.icon}
              </div>
              <h4 className="text-2xl font-black mb-2">{c.name}</h4>
              <p className="font-bold opacity-40">{c.count} Items Available</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
