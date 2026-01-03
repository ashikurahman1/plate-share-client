import React from 'react';
import { Link } from 'react-router';
import ErrorImg from '../assets/error404.png';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-3xl w-full text-center space-y-12 relative z-10">
        <div className="relative inline-block">
             <img src={ErrorImg} alt="404" className="w-full max-w-lg mx-auto drop-shadow-2xl" />
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-base-100 px-8 py-3 rounded-2xl shadow-xl border border-base-200">
                <h1 className="text-4xl font-black italic tracking-tighter">Oops <span className="text-primary italic">!</span></h1>
             </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-black italic">Page Not Found</h2>
          <p className="text-xl text-base-content/60 font-medium max-w-xl mx-auto">
            The plate you're looking for seems to have been moved or never existed. Let's get you back to the community!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn btn-primary btn-lg rounded-2xl px-10 text-white font-black gap-3 shadow-xl shadow-primary/30 w-full sm:w-auto">
            <FaHome /> Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-outline btn-lg rounded-2xl px-10 border-base-300 font-bold gap-3 w-full sm:w-auto">
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
