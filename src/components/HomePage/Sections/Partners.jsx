import React from 'react';
import { FaHeartbeat, FaHandHoldingHeart, FaLeaf, FaHandsHelping } from 'react-icons/fa';

const partners = [
  { name: "ShareFood", icon: <FaHandHoldingHeart /> },
  { name: "EcoWaste", icon: <FaLeaf /> },
  { name: "HealthCare", icon: <FaHeartbeat /> },
  { name: "YouthHands", icon: <FaHandsHelping /> },
];

const Partners = () => {
  return (
    <section className="py-20 bg-base-100/50 grayscale hover:grayscale-0 transition-all duration-700">
      <div className="container mx-auto px-4 lg:px-8">
        <h4 className="text-center font-bold text-base-content/30 uppercase tracking-[0.2em] mb-12">Our Proud Partners</h4>
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-40">
          {partners.map((p, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="text-4xl group-hover:text-primary transition-colors">
                {p.icon}
              </div>
              <span className="text-2xl font-black group-hover:text-primary transition-colors">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
