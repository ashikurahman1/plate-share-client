import React, { useEffect } from 'react';
import Card from '../../Card/Card';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
const FeaturedFoods = ({ featuredFoods }) => {
  console.log(featuredFoods);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);
  return (
    <section className="bg-base-200">
      <div data-aos="fade-up" className="px-4 mx-auto container py-20 ">
        {/* Heading */}
        <div className="mb-15 flex flex-col items-center">
          <h2 className=" text-3xl md:text-5xl font-semibold mb-4">
            Featured <span className="text-primary">Foods</span>
          </h2>
          <p className="text-neutral-500 italic">
            Most Generous Shares This Week
          </p>
        </div>

        {/* Foods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 mb-10">
          {featuredFoods.map(food => (
            <Card key={food._id} food={food} />
          ))}
        </div>
        {/* Button */}
        <div className="flex justify-center">
          <Link
            to="/available-foods"
            className="btn btn-primary text-white text-center"
          >
            Show All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFoods;
