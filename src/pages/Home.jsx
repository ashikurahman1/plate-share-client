import React from 'react';
import Hero from '../components/HomePage/Hero/Hero';
import FeaturedFoods from '../components/HomePage/FeaturedFoods/FeaturedFoods';
import HowItWorks from '../components/HomePage/HowItWorks/HowItWorks';
import OurMission from '../components/HomePage/OurMission/OurMission';
import { useLoaderData } from 'react-router';

const Home = () => {
  const featuredFoods = useLoaderData();

  return (
    <div>
      <Hero />
      <FeaturedFoods featuredFoods={featuredFoods} />
      <HowItWorks />
      <OurMission />
    </div>
  );
};

export default Home;
