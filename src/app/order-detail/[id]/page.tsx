"use client";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import OrderDetailCard from "@/components/orders/OrderDetailCard";
import { IoPerson } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { useCheckoutAndOrder } from "@/context/CheckoutAndOrderContext";
import { useParams } from "next/navigation";

function Orders() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  const { user, token } = useAuth();
  const { getOrderById, orderById, setIsLoading, isLoading } = useCheckoutAndOrder();

  console.log("ee", orderById)

  useEffect(() => {
    if (token && user?.id) {
      getOrderById(orderId);
    }
  }, [token, user]);
  
  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px] flex flex-col pb-6 md:px-20 lg:px-32 xl:px-60">
        <h2 className="text-3xl font-bold my-6 lg:text-5xl text-center">
          Order details
        </h2>
        <div className="flex justify-between py-2 px-2 mm:px-4 ml:px-8 border-b-8 md:px-0">
          <div className="flex flex-col font-semibold">
            <p className="text-sm">Delivery time :</p>
            <p className="text-[#7C7C7C] text-sm font-medium">7-12 open days</p>
          </div>
          <div className="flex flex-col font-semibold">
            <p className="text-sm">Status :</p>
            <p className="text-[#7C7C7C] text-sm font-medium">{orderById?.orderStatus}</p>
          </div>
        </div>
        <div className="px-2 md:px-0">
        <OrderDetailCard products={orderById?.products}/>
        </div>
        <div className="flex flex-col py-2 px-2 mm:px-4 ml:px-8 border-y-8 md:px-0">
          <div className="flex items-center mb-2">
            <IoPerson className="mr-4" />
            <p className="mr-4">{orderById?.user.username}</p>
            <p>{orderById?.user.shippingAddress.mobile}</p>
          </div>
          <div className="flex justify-start items-center">
            <IoLocationSharp className="mr-4 w-8 ssm2:w-auto" />
            <div className="flex flex-col">
              <div>{orderById?.shippingAddress}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-2 px-2 mm:px-4 ml:px-8 border-b-8 md:px-0">
          <div className="flex items-center font-semibold">
            <p className="mr-4"><span className="md:text-xl">Total:</span> ${orderById?.totalPrice}</p>
          </div>
          <div className="flex justify-start font-semibold">
            <p><span className="md:text-lg font-normal">Payment method: </span>{orderById?.paymentInformation}</p>
          </div>
        </div>
        <div className="flex flex-col py-2 px-2 mm:px-4 ml:px-8 md:px-0">
          <div className="font-semibold mb-2">Order information</div>
          <div className="flex flex-col mb-2">
            <p className="text-[#7C7C7C] text-sm font-medium">Order number</p>
            <p>{orderById?.id}</p>
          </div>
          <div className="flex flex-col mb-2">
            <p className="text-[#7C7C7C] text-sm font-medium">Order lead time</p>
            <p>24 oct. 2024 15:04:53</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#7C7C7C] text-sm font-medium">Delivery method</p>
            <p>Standard Delivery</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
