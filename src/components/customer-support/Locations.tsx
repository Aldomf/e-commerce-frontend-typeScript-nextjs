import React from "react";
import { IoLocationOutline } from "react-icons/io5";

function Locations() {
  return (
    <div className="mb-6 lg:mx-20 xl:mx-36 lg:mb-40">
      <div className="mb-8 mx-6">
        <h2 className="text-2xl font-bold mb-3 lg:text-4xl">
          You Can Find Us in Any of These Locations
        </h2>
        <p className="font-thin">
          I&apos;m a paragraph. Click here to add your own text and edit me. Let
          your users get to know you.
        </p>
      </div>
      <div className="md:grid md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center font-thin border-black border-y-2 space-y-2 py-4 md:border lg:py-14">
          <IoLocationOutline className="w-8 h-8 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl">Location 01</h3>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
        </div>
        <div className="flex flex-col items-center justify-center font-thin border-black border-b-2 space-y-2 py-4 md:border lg:py-14">
          <IoLocationOutline className="w-8 h-8 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl">Location 02</h3>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
        </div>
        <div className="flex flex-col items-center justify-center font-thin border-black border-b-2 space-y-2 py-4 md:border lg:py-14">
          <IoLocationOutline className="w-8 h-8 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl">Location 03</h3>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
        </div>
        <div className="flex flex-col items-center justify-center font-thin border-black border-b-2 space-y-2 py-4 md:border lg:py-14">
          <IoLocationOutline className="w-8 h-8 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl">Location 04</h3>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
        </div>
        <div className="flex flex-col items-center justify-center font-thin border-black border-b-2 space-y-2 py-4 md:border lg:py-14">
          <IoLocationOutline className="w-8 h-8 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl">Location 05</h3>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
        </div>
        <div className="flex flex-col items-center justify-center font-thin border-black border-b-2 space-y-2 py-4 md:border lg:py-14">
          <IoLocationOutline className="w-8 h-8 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl">Location 06</h3>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
        </div>
        <div className="flex flex-col items-center justify-center font-thin border-black border-b-2 space-y-2 py-4 md:border lg:py-14">
          <IoLocationOutline className="w-8 h-8 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl">Location 07</h3>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
        </div>
        <div className="flex flex-col items-center justify-center font-thin border-black border-b-2 space-y-2 py-4 md:border lg:py-14">
          <IoLocationOutline className="w-8 h-8 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl">Location 08</h3>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
          <p>123-456-7890</p>
        </div>
      </div>
    </div>
  );
}

export default Locations;
