import React from 'react';

const steps = [
  {
    num: "01",
    title: "Take a Photo",
    desc: "Simply take a clear photo of the surplus food you want to share.",
    color: "bg-primary"
  },
  {
    num: "02",
    title: "Post to PlateShare",
    desc: "Upload the details and location. It's live in seconds!",
    color: "bg-secondary"
  },
  {
    num: "03",
    title: "Coordination",
    desc: "Recipients will request the food and you coordinate the pickup.",
    color: "bg-accent"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-base font-bold text-primary tracking-widest uppercase mb-3 text-left">Process</h2>
            <h3 className="text-5xl font-black leading-tight italic">How It <br /> Works <span className="text-primary italic">?</span></h3>
            <p className="mt-8 text-lg text-base-content/70 leading-relaxed">
              We've made it incredibly simple to make a massive impact in your neighborhood.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Visual line connecting steps */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/5 -translate-y-1/2 hidden md:block"></div>
            
            {steps.map((s, i) => (
              <div key={i} className="relative z-10 group">
                <div className={`${s.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 group-hover:rotate-12 transition-transform shadow-xl`}>
                  {s.num}
                </div>
                <h4 className="text-2xl font-black mb-4 italic leading-none">{s.title}</h4>
                <p className="text-base-content/60 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
