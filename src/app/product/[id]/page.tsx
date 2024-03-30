"use client"
import { useMediaQuery } from 'react-responsive';
import LaptopHeader from '@/components/layouts/LaptopHeader';
import MobileHeader from '@/components/layouts/MobileHeader';
import Footer from '@/components/layouts/Footer';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LaptopSidebar from "@/components/product/DropDownProduct_Laptop";
import Link from "next/link";

function Product() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <article className="mx-64 px-0 py-6 md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
        <nav>
          <div className="flex justify-between">
            <div className="flex">
              <Link href="#">Home</Link>
              <span> / </span>
              <p>hand cream</p>
            </div>
            <div className="flex">
              <p> prev </p>
              <p> next </p>
            </div>
          </div>
        </nav>

        <div className="container mt-10 flex h-[calc(100vh-7rem)] items-center justify-between gap-8">
          <section className="flex h-full w-[50%] items-center justify-center">
            <div className="flex h-full w-full items-center justify-center border border-solid">
              <Image
                src="/shoes-nike-1.jpg"
                width={1000}
                height={500}
                alt="Picture of the product"
              />
            </div>
          </section>
          <section className="flex h-full w-[50%] flex-col">
            <div className="m-2">
              <h3 className="text-3xl font-bold">Hand Cream</h3>
              <p className="font-extralight mt-1">SKU: 099</p>
            </div>
            <div className="m-2 mt-3">
              <p className="text-xl text-[#eb1414]">$2.99</p>
            </div>
            <div className="m-2 mt-3 flex flex-col">
              <label htmlFor="quantity" className="mb-1 text-sm font-extralight">Quantity</label>
              <input className="w-20 border border-gray-300 px-3 py-2" type="number" id="quantity" name="quantity" placeholder="1" min="1" step="1" required />
            </div>
            <div className="m-2 mt-8">
              <button className="bg-[#a3c9bc] rounded-3xl w-72 h-10 font-light hover:opacity-75 transition-opacity text-white">
                Add to Cart
              </button>
              <button>
                <FavoriteBorderIcon className="text-[#a3c9bc] w-11 h-11 hover:text-[#363F46] transition duration-400 ease-in-out ml-3" />
              </button>
              <div className="mt-12 text-2xl">
                {isTabletOrLarger ? <LaptopSidebar /> : ""}
              </div>
            </div>
          </section>
        </div>
        <div className="mt-12 mb-8 w-[50%] text-sm font-extralight">I'm a product description. This is a great place to "sell" your product and grab buyers' attention. Describe your product clearly and concisely. Use unique keywords. Write your own description instead of using manufacturers' copy.</div>
      </article>
      <Footer />
    </>
  )
}

export default Product