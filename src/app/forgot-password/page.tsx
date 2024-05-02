"use client";
// reset-password-request.js

import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import axios from "axios"; // Import axios to make HTTP requests

const ResetPasswordRequestPage = () => {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const [error, setError] = useState(""); // State to hold error messages
  const [success, setSuccess] = useState(""); // State to hold success messages

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Get the email from the form input field
      const emailInput = (e.target as HTMLFormElement).elements.namedItem(
        "email"
      ) as HTMLInputElement;
      const email = emailInput.value;

      // Send a POST request to the backend to request password reset
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`, { email });

      // Reset the form and display success message
      (e.target as HTMLFormElement).reset();
      setSuccess("Email sent successfully!");
      setError("");
    } catch (error: any) {
      // Display error message if request fails
      setSuccess("");
      setError(error.response.data.message);
      console.error("Error resetting password:", error);
    }
  };

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[250px] flex flex-col items-center px-6 pb-6 ssm:px-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-2 md:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter Your Email
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="">
              {error && <p className="text-red-500">{error}</p>}{" "}
              {/* Display error message */}
              {success && <p className="text-green-500">{success}</p>}{" "}
              {/* Display success message */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CA08E] sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#6CA08E] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#A3C9BC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6CA08E] mt-4"
                >
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordRequestPage;
