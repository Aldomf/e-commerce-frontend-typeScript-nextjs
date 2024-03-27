import React from "react";

function OrderDetailCard() {
  return (
    <div className="w-full my-6">
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-20 h-24 border border-black mr-2"></div>
          <div className="flex flex-col">
            <div className="mb-2">
              <p>Lorem, ipsum.</p>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <button className="border-2 flex justify-center items-center font-semibold w-fit px-2 py-1">
              Repurchase
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold text-[#A3C9BC]">$8.99</p>
          <p className="line-through text-sm text-[#7C7C7C]">$8.99</p>
          <p className="text-sm">x1</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailCard;
