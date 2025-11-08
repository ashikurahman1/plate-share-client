import React from 'react';
import Hero from '../components/HomePage/Hero/Hero';
import FeaturedFoods from '../components/HomePage/FeaturedFoods/FeaturedFoods';
import HowItWorks from '../components/HomePage/HowItWorks/HowItWorks';
import OurMission from '../components/HomePage/OurMission/OurMission';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedFoods />
      <HowItWorks />
      <OurMission />
    </div>
  );
};

export default Home;
