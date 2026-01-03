import React from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

const AppHighlight = () => {
  return (
    <section className="py-24 bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">Share on the Go <br /> With Our <span className="text-primary italic">Mobile App</span></h2>
            <p className="text-lg text-base-content/70 leading-relaxed max-w-xl">
              Download the PlateShare app to get instant notifications when food is available nearby. Post your extra meals in seconds directly from your phone.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-neutral btn-lg rounded-2xl px-8 flex items-center gap-3">
                <FaGooglePlay size={24} />
                <div className="text-left">
                  <p className="text-[10px] uppercase opacity-60 leading-none mb-1">Get it on</p>
                  <p className="text-base leading-none">Google Play</p>
                </div>
              </button>
              <button className="btn btn-neutral btn-lg rounded-2xl px-8 flex items-center gap-3">
                <FaApple size={28} />
                <div className="text-left">
                  <p className="text-[10px] uppercase opacity-60 leading-none mb-1">Download on the</p>
                  <p className="text-base leading-none">App Store</p>
                </div>
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="avatar border-2 border-base-100 rounded-full">
                    <div className="w-10">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-bold text-sm">Join 10,000+ happy users</p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="w-64 h-[500px] bg-neutral rounded-[3rem] border-8 border-neutral-content shadow-2xl relative z-10 mx-auto overflow-hidden">
              <div className="w-full h-full bg-base-100 p-4">
                <div className="w-20 h-1 bg-neutral/20 rounded-full mx-auto mb-4"></div>
                <div className="space-y-4">
                  <div className="h-32 bg-primary/20 rounded-2xl animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-neutral/10 rounded-full"></div>
                  <div className="h-4 w-1/2 bg-neutral/10 rounded-full"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-20 bg-secondary/20 rounded-xl"></div>
                    <div className="h-20 bg-accent/20 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppHighlight;
