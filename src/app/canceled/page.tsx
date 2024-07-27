import Link from "next/link";
import React from "react";

function PaymentCanceled() {
  return (
    <div className="bg-white h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="text-red-600 w-16 h-16 mx-auto my-6"
        >
          <circle cx="12" cy="12" r="11" fill="currentColor" />
          <path
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 7l10 10M17 7l-10 10"
          />
        </svg>

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Canceled
          </h3>
          <p className="text-gray-600 my-2">
            Your payment was canceled. If you have any questions, please feel
            free to contact us.
          </p>
          <div className="py-10 text-center flex flex-col space-y-2 mm:px-12 md:flex-row md:justify-center md:space-y-0 md:space-x-2">
            <Link
              href="/"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO HOMEPAGE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentCanceled;
