"use client";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import ResetPasword from "@/components/reset-password/resetPasword";

const ResetPasswordPage = () => {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasword />
      </Suspense>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
