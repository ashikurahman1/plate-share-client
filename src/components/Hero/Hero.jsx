import React, { useEffect } from 'react';
import { Link } from 'react-router';
import HeroImage from '../../assets/Hero-Image.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);
  return (
    <section className="bg-primary/1">
      <div className="container mx-auto px-4 lg:px-30 py-20 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Content */}
        <div
          data-aos="fade-right"
          className="text-center md:text-left md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Share Your Food, <br />{' '}
            <span className="text-primary ">Spread Love</span>
          </h1>
          <p className=" mb-6 text-lg max-w-xl ">
            Plate Share connects communities by reducing food waste. Post your
            surplus food and help those in need.
          </p>
          <div className="mt-15">
            <Link to="/foods" className="">
              <button className="btn btn-primary text-white">
                View All Foods
              </button>
            </Link>
          </div>
        </div>

        {/* Image / Illustration */}
        <div
          data-aos="fade-left"
          className="md:w-1/2 mb-8 md:mb-0 flex justify-end"
        >
          <img
            src={HeroImage}
            alt="Community Food Sharing"
            className="w-full lg:max-w-xl h-auto "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
