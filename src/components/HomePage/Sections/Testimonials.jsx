import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Regular Donor",
    image: "https://i.pravatar.cc/150?u=sarah",
    text: "PlateShare has made it so easy to share my extra garden produce. It feels great to see nothing go to waste!",
    stars: 5
  },
  {
    name: "Michael Chen",
    role: "Community Member",
    image: "https://i.pravatar.cc/150?u=michael",
    text: "As a student, this app has helped me find healthy meals nearby. The community is so supportive and kind.",
    stars: 5
  },
  {
    name: "Emily Davis",
    role: "Volunteer",
    image: "https://i.pravatar.cc/150?u=emily",
    text: "The platform is incredibly user-friendly. I've been using it for 6 months and have met so many amazing people.",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-base-200/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold text-primary tracking-widest uppercase mb-3">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-black">Success Stories</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-base-100 p-10 rounded-3xl shadow-xl shadow-base-200 border border-base-200 relative group hover:-translate-y-2 transition-transform duration-300">
              <FaQuoteLeft className="text-4xl text-primary/10 absolute top-8 right-8" />
              <div className="flex gap-1 mb-6 text-secondary">
                {[...Array(r.stars)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-base-content/80 mb-8 italic leading-relaxed font-medium">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={r.image} alt={r.name} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{r.name}</h4>
                  <p className="text-sm opacity-60">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
