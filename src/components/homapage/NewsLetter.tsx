import Image from "next/image";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Perform subscription logic here, for example, sending the email to a server
    // For demonstration purposes, let's assume the subscription was successful
    setEmail("");
    toast.success("Subscribed successfully!");
  };
  return (
    <div className="h-[450px] lg:h-[500px] relative lg:mt-16">
      <Image
        src="/back-newsletter.jpg"
        alt="Background Image 1"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex justify-center items-center text-white relative">
        <div className="flex flex-col justify-start items-start p-8 lg:p-0 lg:w-[750px] pt-16 lg:pl-0 lg:pt-20">
          <span className="font-bold text-lg lg:text-2xl xl:mb-0 xl:text-2xl">
            Subscribe & Save
          </span>
          <div className="flex mb-4">
            <span className="font-bold text-8xl lg:text-9xl xl:text-9xl">
              20%
            </span>
            <span className="font-bold mt-4 text-2xl">off</span>
          </div>
          <span className="font-bold text-2xl mb-4 md:mb-8 lg:text-3xl">
            Your Next Order
          </span>
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
          >
            <p className="mb-2 text-lg">Enter your email here *</p>
            <div className="lg:flex items-center justify-center">
              <input
                type="email"
                className="rounded-full mb-4 py-2 w-full lg:mb-0 text-black px-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="submit"
                value="Subscribe"
                className="bg-[#A3C9BC] font-bold text-white px-10 py-2 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 hover:bg-white lg:ml-4 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default NewsLetter;
