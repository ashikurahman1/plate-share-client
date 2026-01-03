import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import hero1 from '../../../assets/hero1.png';
import hero2 from '../../../assets/hero2.png';
import hero3 from '../../../assets/hero3.png';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: hero1,
    title: "Share Your Food, Spread Love",
    description: "PlateShare connects communities by reducing food waste. Post your surplus food and help those in need.",
    cta: "Explore Foods",
    link: "/available-foods"
  },
  {
    image: hero2,
    title: "Healthy Meals for Everyone",
    description: "Every plate shared is a step towards a world without hunger. Join the movement today.",
    cta: "Join Community",
    link: "/register"
  },
  {
    image: hero3,
    title: "Together We Can Do More",
    description: "Volunteers and donors working together to ensure no one goes to bed hungry.",
    cta: "How It Works",
    link: "/#how-it-works"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center text-white">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-black mb-6 leading-tight max-w-4xl"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl mb-10 max-w-2xl text-white/90"
            >
              {slides[current].description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <Link to={slides[current].link} className="btn btn-primary btn-lg px-8 rounded-2xl border-none text-white shadow-xl shadow-primary/40">
                {slides[current].cta}
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg px-8 rounded-2xl text-white hover:bg-white hover:text-black border-2 border-white/50">
                Lern More
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 transition-all duration-300 rounded-full ${current === idx ? 'w-10 bg-primary' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>

      {/* Visual Hint to next section */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
