import React from 'react';
import { FaHeart, FaUsers, FaLeaf, FaHandsHelping } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6">
          <h1 className="text-5xl md:text-7xl font-black italic">Our <span className="text-primary tracking-tighter">Mission .</span></h1>
          <p className="text-xl text-base-content/60 max-w-3xl mx-auto font-medium leading-relaxed">
            We believe that no good food should go to waste while someone goes hungry. PlateShare is a community platform dedicated to connecting those with surplus food to those who need it.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: <FaHeart className="text-red-500" />, title: "Community", desc: "Building stronger bonds through sharing." },
            { icon: <FaLeaf className="text-green-500" />, title: "Sustainability", desc: "Reducing food waste for a healthier planet." },
            { icon: <FaUsers className="text-blue-500" />, title: "Inclusivity", desc: "Everyone is welcome to give and receive." },
            { icon: <FaHandsHelping className="text-amber-500" />, title: "Impact", desc: "Making a real difference in daily lives." }
          ].map((v, i) => (
            <div key={i} className="bg-base-100 p-10 rounded-[3rem] shadow-xl border border-base-200 hover:-translate-y-2 transition-transform duration-300">
               <div className="text-4xl mb-6 bg-base-200/50 w-20 h-20 rounded-3xl flex items-center justify-center">
                 {v.icon}
               </div>
               <h3 className="text-2xl font-black mb-4 italic">{v.title}</h3>
               <p className="text-base-content/60 font-medium">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="bg-neutral text-neutral-content p-12 md:p-20 rounded-[4rem] flex flex-col lg:flex-row items-center gap-16 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="lg:w-1/2 space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black italic leading-tight">It started with a <br/><span className="text-primary italic">Simple Idea .</span></h2>
            <p className="text-lg opacity-70 leading-relaxed font-medium">
              Founded in 2024, PlateShare began when a group of friends realized how much food was wasted after community events. We decided to build a bridge between abundance and need. 
              <br/><br/>
              Today, we facilitate thousands of shares across the city, powered by the incredible generosity of neighbors like you.
            </p>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="h-64 bg-base-100/10 rounded-[2rem] animate-pulse"></div>
                <div className="h-64 bg-primary/20 rounded-[2rem] mt-8 animate-pulse"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
