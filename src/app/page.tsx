"use client"
import React from 'react';
import MobileHeader from './layouts/MobileHeader';
import { useMediaQuery } from 'react-responsive';
import LaptopHeader from './layouts/LaptopHeader';
import HeroMobile from '@/components/HeroMobile';
import HeroLaptop from '@/components/HeroLaptop';

function HomePage() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 }); // Adjust the minWidth according to your laptop viewport width

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      {isTabletOrLarger ? <HeroLaptop /> : <HeroMobile />}
    </>
  );
}

export default HomePage;

