import React from 'react';
import logo from '../../assets/PlateShare-Logo.png';

const Loader = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-base-100 gap-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-primary/10 border-t-primary animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
             <img src={logo} alt="Loading..." className="w-10 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-black italic tracking-tighter">Plate<span className="text-primary italic">Share</span></h2>
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
