import React from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

const Card = ({ food }) => {
  const {
    _id,
    location,
    donor_name,
    expired_date,
    food_img_thumb,
    food_name,
    food_quantity,
    food_status,
  } = food;

  return (
    <div className="group bg-base-100 rounded-[2rem] overflow-hidden border border-base-200 shadow-xl shadow-base-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={food_img_thumb}
          alt={food_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
          <span className={`badge badge-lg border-none text-white font-bold rounded-xl px-4 py-4 shadow-lg ${food_status === 'Available' ? 'bg-primary' : 'bg-error'}`}>
            {food_status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-neutral shadow-sm flex items-center gap-2">
          <FaCalendarAlt className="text-primary" /> Expires: {expired_date}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-black leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {food_name}
          </h2>
        </div>

        <div className="space-y-3 mb-6 flex-grow text-base-content/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FaMapMarkerAlt size={14} />
            </div>
            <span className="text-sm font-semibold truncate">{location}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <FaUser size={14} />
            </div>
            <span className="text-sm font-semibold">Donor: {donor_name}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-base-200 mt-auto">
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold opacity-40 leading-none mb-1">Quantity</p>
            <p className="font-black text-primary text-lg">{food_quantity} Servings</p>
          </div>
          <Link
            to={`/foods/${_id}`}
            className="btn btn-primary rounded-xl px-6 text-white font-bold group-hover:px-8 transition-all shadow-lg shadow-primary/20"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="bg-base-100 rounded-[2rem] overflow-hidden border border-base-200 animate-pulse">
    <div className="h-60 bg-base-300"></div>
    <div className="p-6 space-y-4">
      <div className="h-8 bg-base-300 rounded-xl w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-base-300 rounded-lg w-full"></div>
        <div className="h-4 bg-base-300 rounded-lg w-5/6"></div>
      </div>
      <div className="pt-4 border-t border-base-200 flex justify-between items-center">
        <div className="h-10 bg-base-300 rounded-xl w-24"></div>
        <div className="h-10 bg-base-300 rounded-xl w-32"></div>
      </div>
    </div>
  </div>
);

export default Card;
