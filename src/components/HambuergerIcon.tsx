"use client";
import { useState, useEffect } from "react"; // import state
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function HambuergerIcon() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const pathname = usePathname();

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
                <div className="text-white flex justify-center items-center">
                  Log In <AccountCircleIcon className="ml-2 w-10 h-10"/>
                </div>
                <div>
                  <FavoriteIcon className="text-white mr-4 w-7 h-7" />
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
              <Link href="">About Us</Link>
              <Link href="">Customer Support</Link>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between font-bold mt-6 text-xl text-white min-h-[250px]">
              <Link href="/admin/users">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/users"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Electronics</p>
                </li>
              </Link>
              <Link href="/admin/products">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/products"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Games</p>
                </li>
              </Link>
              <Link href="/admin/categories">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/categories"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Health</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Fashion</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Beauty</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Accessories</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Toys</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Office</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Pets</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Books</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Sport</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <p>Most Popular</p>
                </li>
              </Link>
              <Link href="/admin/orders">
                <li
                  className={`my-4 flex justify-center items-center cursor-pointer ${
                    pathname === "/admin/orders"
                      ? "text-blue-400"
                      : "hover:text-blue-400"
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
