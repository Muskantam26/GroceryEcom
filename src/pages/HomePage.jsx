import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import TrustBadges from '../components/home/TrustBadges';
import CategoryGrid from '../components/home/CategoryGrid';
import DealsOfDay from '../components/home/DealsOfDay';
import BestSellers from '../components/home/BestSellers';
import PromoBanner from '../components/home/PromoBanner';
import WhyUs from '../components/home/WhyUs';
import AppDownload from '../components/home/AppDownload';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">
      <HeroBanner />
      <TrustBadges />
      <CategoryGrid />
      <DealsOfDay />
      <BestSellers />
      <PromoBanner />
      <WhyUs />
      <AppDownload />
    </div>
  );
};

export default HomePage;
