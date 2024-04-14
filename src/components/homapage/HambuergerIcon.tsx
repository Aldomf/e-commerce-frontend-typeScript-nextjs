"use client";
import { useState, useEffect } from "react"; // import state
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserAccount from "../login-signup-forms/UserAccount";
import { FaLocationDot } from "react-icons/fa6";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

export default function HambuergerIcon() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { token } = useAuth();

  const pathname = usePathname();

  const { categories } = useProduct();

  useEffect(() => {
    return () => {
      // Reset body styles when component unmounts
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = "auto";
        body.style.position = "static";
      }
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = isNavOpen ? "auto" : "hidden";
      body.style.position = isNavOpen ? "static" : "fixed";
    }
  };

  return (
    <div className="">
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div className="HAMBURGER-ICON space-y-2" onClick={toggleNav}>
            <span className="block h-0.5 w-8 bg-white"></span>
            <span className="block h-0.5 w-8 bg-white"></span>
            <span className="block h-0.5 w-8 bg-white"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div className="absolute top-0 flex justify-between w-full px-4 md:px-10 pt-16">
              <div className="flex justify-between items-center w-full">
              {token ? (
                  <UserAccount />
                ) : (
                  <Link
                    href="/login"
                    className="text-white flex justify-center items-center"
                  >
                    Log In{" "}
                    <AccountCircleIcon className="ml-2 w-10 h-10" />
                  </Link>
                )}
                <div className="flex">
                  <Link href="/customer-support#locations">
                    <FaLocationDot className="text-white mr-4 w-7 h-7" />
                  </Link>
                  <Link href="/wishlist">
                    <FavoriteIcon className="text-white mr-4 w-7 h-7" />
                  </Link>
                </div>
              </div>
              <div
                className="CROSS-ICON flex justify-center items-center"
                onClick={() => {
                  setIsNavOpen(false);
                  const body = document.querySelector("body");
                  if (body) {
                    body.style.overflow = "auto";
                    body.style.position = "static";
                  }
                }}
              >
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center text-white mt-36">
              <Link href="/aboutUs">About Us</Link>
              <Link href="/customer-support">Customer Support</Link>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between font-bold mt-6 text-xl text-white min-h-[250px]">
              <Link
                href="/category/all"
                className={`my-4 flex justify-center items-center cursor-pointer ${
                  pathname === "/category/all" ? "text-[#363F46]" : ""
                }`}
                //onClick={handleLinkClick}
              >
                All products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id} // Ensure each Link has a unique key
                  href={`/category/${category.id}`} // Correct href to navigate to each category
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === `/category/${category.id}`
                      ? "text-[#363F46]"
                      : ""
                  }`} // Add active class if the pathname matches the link
                >
                  {category.name} {/* Display the category name as Link text */}
                </Link>
              ))}
              <Link href="/subcategory/hot">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/subcategory/hot" ? "text-[#363F46]" : ""
                  }`}
                >
                  <p>Most Popular</p>
                </li>
              </Link>
              <Link href={token ? '/orders' : '/login'}>
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === `/orders` ? "text-[#363F46]" : ""
                  }`}
                >
                  <p>My orders</p>
                </li>
              </Link>
            </ul>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #a3c9bc;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        overflow-y: auto; /* Enable scrolling within menu */
      }
      `}</style>
    </div>
  );
}
