import React from 'react';
import Hero from '../components/Hero/Hero';
import FeaturedFoods from '../components/FeaturedFoods/FeaturedFoods';
import HowItWorks from '../components/HowItWorks/HowItWorks';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedFoods />
      <HowItWorks />
    </div>
  );
};

export default Home;
