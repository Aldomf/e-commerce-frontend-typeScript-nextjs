import { useAuth } from "@/context/AuthContext";
import { useCheckoutAndOrder } from "@/context/CheckoutAndOrderContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TbTruckOff } from "react-icons/tb";

function OrderCard() {
  const { user, token } = useAuth();
  const { getUserOrders, orders, setIsLoading, isLoading, updateOrderStatus } =
    useCheckoutAndOrder();

  useEffect(() => {
    if (token && user?.id) {
      getUserOrders();
      setIsLoading(false);
    }
  }, [token, user]);
  return (
    <>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : orders && orders.length === 0 ? (
        <div className="flex flex-col items-center lg:flex-row">
          <p className="text-3xl lg:text-4xl lg:mr-6">There are no orders</p>
          <TbTruckOff className="w-20 h-20"/>
        </div>
      ) : (
        orders?.map((order, index) => (
          <div
            key={index}
            className="bg-[#F8F8F8] p-4 w-full flex flex-col rounded-md mb-8 sm:mb-0 border"
          >
            <div className="flex flex-col">
              <p className="mb-2 flex items-center">
                Status:{" "}
                <span
                  className={
                    order.orderStatus === "delivered"
                      ? "font-semibold mx-1 text-green-500"
                      : "font-semibold mx-1"
                  }
                >
                  {order.orderStatus}
                </span>
                {order.orderStatus === "delivered" && (
                  <FaRegCircleCheck className="text-green-500" />
                )}
              </p>
              <p className="mb-2">
                Order Number: <span>{order.id}</span>
              </p>
              <p className="mb-2">
                Order Date:{" "}
                <span>{new Date(order.orderDate).toLocaleDateString()}</span>
              </p>
              <div className="mb-6 flex justify-between">
                <p className="">
                  Articles: <span>{order.quantity}</span>
                </p>
                <p className="font-bold">
                  Total: <span>${order.totalPrice}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              {/* Render images of products */}
              {order.products.map((product, index) => (
                <div key={index} className="w-20 h-20 mb-2 mr-2">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex">
              <Link
                href={`/order-detail/${order.id}`}
                className="w-1/2 py-4 font-bold mr-2 bg-[#6CA08E] hover:bg-[#A3C9BC] text-white flex justify-center items-center rounded-md"
              >
                Order Details
              </Link>
              <button
                className="w-1/2 py-4 font-bold bg-[#363F46] hover:bg-[#4B565E] text-white flex justify-center items-center rounded-md"
                onClick={() => updateOrderStatus(order.id.toString())}
              >
                Received
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default OrderCard;
