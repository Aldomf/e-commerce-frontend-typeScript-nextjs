import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiRecycleLight } from "react-icons/pi";
import { LiaProductHunt } from "react-icons/lia";

function SecondPart() {
  return (
    <div className="mb-6 lg:mx-20 xl:mx-36 lg:mb-28">
      <div className="grid grid-cols-1 md:flex justify-center border">
        <div className="flex flex-col justify-start font-thin border-black px-4 border-y-2 space-y-2 py-4 md:border md:px-10 lg:py-14 w-[100%]">
          <CiDeliveryTruck className="w-14 h-14 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl lg:text-2xl">
            Delivering Every Day at a Time
          </h3>
          <p>
            m a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. I’m a great place for you to
            tell a story and let your users know a little more about you.
          </p>
        </div>
        <div className="flex flex-col justify-start font-thin border-black px-4 border-b-2 space-y-2 py-4 md:border md:px-10 lg:py-14 w-[100%]">
          <PiRecycleLight className="w-14 h-14 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl lg:text-2xl">
            We Take Sustainability Seriously
          </h3>
          <p>
            I&apos;m a paragraph. Click here to add your own text and edit me.
            It’s easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font.
          </p>
          <p>
            This is a great space to write a long text about your company and
            your services. You can use this space to go into a little more
            detail about your company.
          </p>
        </div>
        <div className="flex flex-col justify-start font-thin border-black px-4 border-b-2 space-y-2 py-4 md:border md:px-10 lg:py-14 w-[100%]">
          <LiaProductHunt className="w-14 h-14 text-[#6CA08E]" />
          <h3 className="font-semibold text-xl lg:text-2xl">Supporting Local Products</h3>
          <p>
            I&apos;m a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecondPart;
