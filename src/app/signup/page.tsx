"use client"
import React from 'react'
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import SignUpForm from '@/components/login-signup-forms/SignupForm';

function Signup() {
    const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  return (
    <>
    {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
    <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px] flex flex-col items-center px-6 pb-6 ssm:px-10">
        <SignUpForm/>
    </div>
    <Footer />
    </>
  )
}

export default Signup