import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import FeaturedProducts from '../components/FeaturedProducts';
import DiscountedProducts from '../components/DiscountedProducts';
import WeeklyOffers from '../components/WeeklyOffers';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <FeaturedProducts />
      <DiscountedProducts />
      <WeeklyOffers />
      <Benefits />
    </main>
  );
};

export default Home; 