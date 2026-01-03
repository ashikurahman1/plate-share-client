import React from 'react';

const stats = [
  { value: "50k+", label: "Meals Shared", color: "text-primary" },
  { value: "12k+", label: "Active Donors", color: "text-secondary" },
  { value: "95%", label: "Waste Reduced", color: "text-green-500" },
  { value: "24/7", label: "Support Available", color: "text-accent" },
];

const Statistics = () => {
  return (
    <section className="py-20 bg-neutral text-neutral-content">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((s, i) => (
            <div key={i} className="space-y-2">
              <h2 className={`text-5xl md:text-6xl font-black ${s.color}`}>{s.value}</h2>
              <p className="text-lg opacity-70 font-medium uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
