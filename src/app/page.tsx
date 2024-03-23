"use client"
import React from 'react';
import MobileHeader from './layouts/MobileHeader';
import { useMediaQuery } from 'react-responsive';
import LaptopHeader from './layouts/LaptopHeader';
import HeroMobile from '@/components/HeroMobile';
import HeroLaptop from '@/components/HeroLaptop';
import SectionOne from '@/components/SectionOne';
import BestDeals from '@/components/BestDeals';
import SectionTwo from '@/components/SectionTwo';
import PopularCategories from '@/components/PopularCategories';
import StartYourCart from '@/components/StartYourCart';
import SectionThree from '@/components/SectionThree';
import MostPopular from '@/components/MostPopular';
import SectionFour from '@/components/SectionFour';
import NewProducts from '@/components/NewProducts';
import NewsLetter from '@/components/NewsLetter';
import Footer from './layouts/Footer';
import SectionThree2 from '@/components/SectionThree2';

function HomePage() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 }); // Adjust the minWidth according to your laptop viewport width

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
      <Footer/>
    </>
  );
}

export default HomePage;

