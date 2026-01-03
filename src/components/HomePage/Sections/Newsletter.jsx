import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <section className="py-24 bg-primary text-primary-content">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto bg-base-100 rounded-[3rem] p-8 md:p-16 shadow-2xl flex flex-col lg:flex-row items-center gap-12 text-base-content">
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-3xl md:text-5xl font-black leading-tight italic">Join Our <br /> Newsletter <span className="text-primary italic">.</span></h3>
            <p className="text-lg opacity-70">Get weekly updates on food safety, community events and stories.</p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="input input-lg w-full rounded-2xl h-16 bg-base-200 focus:outline-0 focus:ring-4 focus:ring-primary/20 border-none px-6"
              />
              <button className="btn btn-primary btn-lg absolute right-2 top-2 rounded-xl text-white px-8">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
