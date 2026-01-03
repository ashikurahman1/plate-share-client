import React from 'react';
import Hero from '../components/HomePage/Hero/Hero';
import FeaturedFoods from '../components/HomePage/FeaturedFoods/FeaturedFoods';
import HowItWorks from '../components/HomePage/Sections/HowItWorks';
import Features from '../components/HomePage/Sections/Features';
import Statistics from '../components/HomePage/Sections/Statistics';
import Testimonials from '../components/HomePage/Sections/Testimonials';
import FAQ from '../components/HomePage/Sections/FAQ';
import Categories from '../components/HomePage/Sections/Categories';
import AppHighlight from '../components/HomePage/Sections/AppHighlight';
import BlogSafety from '../components/HomePage/Sections/BlogSafety';
import Newsletter from '../components/HomePage/Sections/Newsletter';
import Partners from '../components/HomePage/Sections/Partners';
import { useLoaderData } from 'react-router';

const Home = () => {
  const featuredFoods = useLoaderData();

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Partners />
      <Statistics />
      <HowItWorks />
      <Features />
      <FeaturedFoods featuredFoods={featuredFoods} />
      <Categories />
      <AppHighlight />
      <Testimonials />
      <BlogSafety />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
