import React from 'react';
import { FaHeart, FaShieldAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const features = [
  {
    icon: <FaHeart className="text-red-500" />,
    title: "Community Led",
    description: "Built by the community, for the community. We help neighbors help each other."
  },
  {
    icon: <FaShieldAlt className="text-blue-500" />,
    title: "Safe & Secure",
    description: "Verified donors and secure messaging to ensure food safety and privacy."
  },
  {
    icon: <FaMapMarkerAlt className="text-green-500" />,
    title: "Local Sharing",
    description: "Find food available in your immediate neighborhood to reduce travel."
  },
  {
    icon: <FaClock className="text-amber-500" />,
    title: "Real-time Updates",
    description: "Get notified instantly when new food is posted or requested."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold text-primary tracking-widest uppercase mb-3">Features</h2>
          <h3 className="text-4xl md:text-5xl font-black">Why Choose PlateShare?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 bg-base-200/50 rounded-3xl hover:bg-base-200 transition-all border border-base-200 group">
              <div className="text-4xl mb-6 p-4 bg-base-100 w-fit rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{f.title}</h4>
              <p className="text-base-content/70 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
