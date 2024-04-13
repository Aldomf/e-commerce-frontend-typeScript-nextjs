import React, { useState } from "react";

function FAQ() {
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };
  return (
    <div className="mb-6 lg:mx-20 xl:mx-36 lg:mb-40">
      <div className="border-b border-black">
        <h2 className="text-2xl mx-6 font-bold mb-3 lg:text-4xl text-center py-4">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="mx-6">
        <div className="flex flex-col mt-4 py-5 border-b border-black">
          <div
            className="text-xl flex justify-between items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <h3 className="font-semibold">What is an FAQ section?</h3>
            {isDropdownOpen ? (
              <svg
                className="w-6 h-6 flex justify-center items-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M20 11H4v2h16z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 flex justify-center items-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 11H13V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
            )}
          </div>

          <ul
            className={`transition-all duration-300 ease-linear ${
              isDropdownOpen ? "max-h-96 mt-1" : "max-h-0 overflow-hidden"
            }`}
          >
            <p
              className={`mb-2 block transition font-light duration-300 ease-in-out`}
            >
              An FAQ section can be used to quickly answer common questions
              about your business like &ldquo;Where do you ship to?&rdquo;,
              &ldquo;What are your opening hours?&rdquo;, or &ldquo;How can I
              book a service?&rdquo;.
            </p>
          </ul>
        </div>
        <div className="flex flex-col mt-4 py-5 border-b border-black">
          <div
            className="text-xl flex justify-between items-center cursor-pointer"
            onClick={toggleDropdown2}
          >
            <h3 className="font-semibold">Why do FAQs matter?</h3>
            {isDropdownOpen2 ? (
              <svg
                className="w-6 h-6 flex justify-center items-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M20 11H4v2h16z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 flex justify-center items-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 11H13V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
            )}
          </div>

          <ul
            className={`transition-all duration-300 ease-linear ${
              isDropdownOpen2 ? "max-h-96 mt-1" : "max-h-0 overflow-hidden"
            }`}
          >
            <p
              className={`mb-2 block transition font-light duration-300 ease-in-out`}
            >
              FAQs are a great way to help site visitors find quick answers to
              common questions about your business and create a better
              navigation experience.
            </p>
          </ul>
        </div>
        <div className="flex flex-col mt-4 py-5 border-b border-black">
          <div
            className="text-xl flex justify-between items-center cursor-pointer"
            onClick={toggleDropdown3}
          >
            <h3 className="font-semibold">Where can I add my FAQs?</h3>
            {isDropdownOpen3 ? (
              <svg
                className="w-6 h-6 flex justify-center items-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M20 11H4v2h16z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 flex justify-center items-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 11H13V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
            )}
          </div>

          <ul
            className={`transition-all duration-300 ease-linear ${
              isDropdownOpen3 ? "max-h-96 mt-1" : "max-h-0 overflow-hidden"
            }`}
          >
            <p
              className={`mb-2 block transition font-light duration-300 ease-in-out`}
            >
              FAQs can be added to any page on your site or to your Wix mobile
              app, giving access to members on the go.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
