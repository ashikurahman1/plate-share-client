import React from 'react';

const Card = () => {
  return (
    <div className="card bg-base-100 max-w-110 shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition duration-200">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary text-white w-full mt-5">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
