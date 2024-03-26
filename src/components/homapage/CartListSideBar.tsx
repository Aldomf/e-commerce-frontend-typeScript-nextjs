"use client";
import React, { forwardRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface CartListSideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const CartListSideBar = forwardRef<HTMLDivElement, CartListSideBarProps>(
  function CartListSideBar({ isOpen, toggleSidebar }, ref) {
    const handleCloseSidebar = () => {
      toggleSidebar(); // Close sidebar when arrow right icon is clicked
    };

    return (
      <div
        ref={ref}
        className={`fixed z-10 top-0 right-0 h-screen bg-white w-[25%] overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-500`}
        id="sidebar"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-start text-white bg-[#a3c9bc] h-28 xl:h-32 px-4">
            <MdKeyboardArrowRight className="text-4xl mr-14 xl:mr-28 cursor-pointer" onClick={handleCloseSidebar} />
            <h2 className="font-semibold text-3xl">Cart</h2>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
);

CartListSideBar.displayName = "CartListSideBar";

export default CartListSideBar;
