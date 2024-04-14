import Image from "next/image";
import React from "react";
import SubFooter from "@/components/homapage/SubFooter";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { useProduct } from "@/context/ProductContext";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function Footer() {
  const pathname = usePathname();
  const { token } = useAuth();
  const { categories } = useProduct();
  return (
    <>
      <div className="text-white bg-[#a3c9bc] py-10 flex flex-col items-center">
        <div className="border-b-2 border-white w-[90%] mb-8 md:flex md:justify-between md:items-start">
          <div className="mb-14">
            <Link href="/" className="flex justify-center items-center mb-2">
              <h1 className="mr-1 roboto font-semibold text-xl lg:text-4xl">
                ShipShop
              </h1>
              <Image
                src="/tertiary-logo.svg"
                alt="Logo"
                className="dark:invert lg:w-20 lg:h-20"
                width={50}
                height={50}
                priority
              />
            </Link>
            <div className="flex flex-col justify-center items-center mb-6 lg:mb-16">
              <p className="font-semibold text-lg mb-4 lg:text-2xl">
                Need Help?
              </p>
              <p>
                Visit our{" "}
                <Link href="/customer-support" className="underline">
                  Customer Support
                </Link>{" "}
                <br />
                for assistance or call us at
              </p>
              <p className="font-semibold text-lg">123-456-7890</p>
            </div>
            <div className="flex justify-center items-center text-xl md:text-2xl">
              <Link href="">
                <FaFacebookF className="mr-4 hover:text-[#363F46] transition duration-500 ease-in-out" />
              </Link>
              <Link href="">
                <FaInstagram className="mr-4 hover:text-[#363F46] transition duration-500 ease-in-out" />
              </Link>
              <Link href="">
                <FaTwitter className="mr-4 hover:text-[#363F46] transition duration-500 ease-in-out" />
              </Link>
              <Link
                href=""
                className="hover:text-[#363F46] transition duration-500 ease-in-out"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mb-14">
            <h3 className="font-semibold text-lg mb-4 lg:text-2xl">
              Categories
            </h3>
            {categories.map((category) => (
              <Link
                key={category.id} // Ensure each Link has a unique key
                href={`/category/${category.id}`} // Correct href to navigate to each category
                className={`mb-4 hover:text-[#363F46] transition duration-500 ease-in-out ${
                  pathname === `/category/${category.id}`
                    ? "text-[#363F46]"
                    : ""
                }`} // Add active class if the pathname matches the link
              >
                {category.name} {/* Display the category name as Link text */}
              </Link>
            ))}
            <Link
              href="/subcategory/hot"
              className={`hover:text-[#363F46] transition duration-500 ease-in-out ${
                    pathname === "/subcategory/hot" ? "text-[#363F46]" : ""
                  }`}
            >
              Most Popular
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center mb-14">
            <h3 className="font-semibold text-lg mb-4 lg:text-2xl">Info</h3>
            <Link
              href="/customer-support#faq"
              className="mb-4 hover:text-[#363F46] transition duration-500 ease-in-out"
            >
              FAQ
            </Link>
            <Link
              href="/aboutUs"
              className={`mb-4 hover:text-[#363F46] transition duration-500 ease-in-out ${
                pathname === "/aboutUs" ? "text-[#363F46]" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              href="/customer-support"
              className={`mb-4 hover:text-[#363F46] transition duration-500 ease-in-out ${
                pathname === "/customer-support" ? "text-[#363F46]" : ""
              }`}
            >
              Customer Support
            </Link>
            <Link
              href="/customer-support#locations"
              className="hover:text-[#363F46] transition duration-500 ease-in-out"
            >
              Locations
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center mb-8">
            <h3 className="font-semibold text-lg mb-4 lg:text-2xl">
              My Choice
            </h3>
            <Link
              href="/wishlist"
              className={`mb-4 hover:text-[#363F46] transition duration-500 ease-in-out ${
                pathname === "/wishlist" ? "text-[#363F46]" : ""
              }`}
            >
              Favorites
            </Link>
            <Link
              href={token ? '/orders' : '/login'}
              className={`mb-4 hover:text-[#363F46] transition duration-500 ease-in-out ${
                pathname === `/orders` ? "text-[#363F46]" : ""
              }`}
            >
              My Orders
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-14 md:flex-row md:justify-center md:items-center">
            <Link
              href="/shipping-returns"
              className="underline mb-4 md:mb-0 md:mr-16 hover:text-[#363F46] transition duration-500 ease-in-out"
            >
              Shipping & Returns
            </Link>
            <Link
              href="/terms-conditions"
              className="underline mb-4 md:mb-0 md:mr-16 hover:text-[#363F46] transition duration-500 ease-in-out"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/terms-conditions#payments"
              className="underline hover:text-[#363F46] transition duration-500 ease-in-out"
            >
              Payment Methods
            </Link>
          </div>
          <p className="text-lg font-semibold text-center mb-6 lg:text-2xl">
            We accept the following <br className="md:hidden" />
            payment methods
          </p>
          <div className="grid grid-cols-4 w-60 gap-4  md:w-[500px] lg:w-[600px] xl:w-[780px] lg:gap-7 md:flex md:items-center">
            <div className="w-12 h-fit md:w-16 lg:w-32">
              <Image src="/bank11.png" width={500} height={500} alt="Picture" />
            </div>
            <div className="w-12 h-fit md:w-16 lg:w-32">
              <Image src="/bank12.png" width={500} height={500} alt="Picture" />
            </div>
            <div className="w-12 h-fit md:w-16 lg:w-32">
              <Image src="/bank13.png" width={500} height={500} alt="Picture" />
            </div>
            <div className="w-12 h-fit md:w-16 lg:w-32">
              <Image src="/bank14.png" width={500} height={500} alt="Picture" />
            </div>
            <div className="w-12 h-fit md:w-16 lg:w-32">
              <Image src="/bank15.png" width={500} height={500} alt="Picture" />
            </div>
            <div className="w-12 h-fit md:w-16 lg:w-32">
              <Image src="/bank16.png" width={500} height={500} alt="Picture" />
            </div>
            <div className="w-12 h-fit md:w-16 lg:w-32">
              <Image src="/bank17.png" width={500} height={500} alt="Picture" />
            </div>
            <div className="w-12 h-fit md:w-16 lg:w-32">
              <Image src="/bank18.png" width={500} height={500} alt="Picture" />
            </div>
          </div>
        </div>
      </div>
      <SubFooter />
    </>
  );
}

export default Footer;
