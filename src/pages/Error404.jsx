import React from 'react';
import { Link } from 'react-router';
import ErrorImg from '../assets/error404.png';
const Error404 = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-r/oklab from-indigo-500 to-teal-400">
      <div className="w-full max-w-xl space-y-5">
        <img src={ErrorImg} alt="error img" />
        <div className="container mx-auto text-center">
          <Link to="/" className="btn btn-primary text-white ">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
