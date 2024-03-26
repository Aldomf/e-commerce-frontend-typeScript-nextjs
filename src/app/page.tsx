"use client"
import React from 'react';
import SectionOne from '@/components/homapage/SectionOne';
import BestDeals from '@/components/homapage/BestDeals';
import SectionTwo from '@/components/homapage/SectionTwo';
import PopularCategories from '@/components/homapage/PopularCategories';
import StartYourCart from '@/components/homapage/StartYourCart';
import SectionThree from '@/components/homapage/SectionThree';
import MostPopular from '@/components/homapage/MostPopular';
import SectionFour from '@/components/homapage/SectionFour';
import NewProducts from '@/components/homapage/NewProducts';
import NewsLetter from '@/components/homapage/NewsLetter';
import SectionThree2 from '@/components/homapage/SectionThree2';
import HeroMobile from '@/components/homapage/HeroMobile';
import HeroLaptop from '@/components/homapage/HeroLaptop';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from '@/components/layouts/MobileHeader';
import LaptopHeader from '@/components/layouts/LaptopHeader';
import Footer from '@/components/layouts/Footer';

function HomePage() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  return (
    <>
    {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
    {isTabletOrLarger ? <HeroLaptop /> : <HeroMobile />}
      <SectionOne/>
      <BestDeals/>
      <SectionTwo/>
      <PopularCategories/>
      <StartYourCart/>
      {/* <SectionThree/> */}
      <SectionThree2/>
      <MostPopular/>
      <SectionFour/>
      <NewProducts/>
      <NewsLetter/>
      <Footer />
    </>
  );
}

export default HomePage;

