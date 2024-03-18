"use client";
import { useState, useEffect } from "react"; // import state
import Link from "next/link";
import { usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function Header() {
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
    <div className="flex items-center justify-between mb-2 py-8 px-4 bg-gray-800">
      <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div className="HAMBURGER-ICON space-y-2" onClick={toggleNav}>
            <span className="block h-0.5 w-8 bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-400"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
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
                className="h-8 w-8 text-gray-400"
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
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between text-2xl text-white min-h-[250px]">
        <Link href="/admin/users">
          <li
            className={`my-8 flex justify-center items-center cursor-pointer ${
              pathname === "/admin/users"
                ? "text-blue-400"
                : "hover:text-blue-400"
            }`}
          >
            <PersonIcon className="mr-2 text-4xl" />
            <p>Users</p>
          </li>
        </Link>
        <Link href="/admin/products">
          <li
            className={`my-8 flex justify-center items-center cursor-pointer ${
              pathname === "/admin/products"
                ? "text-blue-400"
                : "hover:text-blue-400"
            }`}
          >
            <ShoppingCartIcon className="mr-2 text-4xl" />
            <p>Products</p>
          </li>
        </Link>
        <Link href="/admin/categories">
          <li
            className={`my-8 flex justify-center items-center cursor-pointer ${
              pathname === "/admin/categories"
                ? "text-blue-400"
                : "hover:text-blue-400"
            }`}
          >
            <CategoryIcon className="mr-2 text-4xl" />
            <p>Categories</p>
          </li>
        </Link>
        <Link href="/admin/orders">
          <li
            className={`my-8 flex justify-center items-center cursor-pointer ${
              pathname === "/admin/orders"
                ? "text-blue-400"
                : "hover:text-blue-400"
            }`}
          >
            <LocalShippingIcon className="mr-2 text-4xl" />
            <p>Orders</p>
          </li>
        </Link>
      </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/portfolio">Portfolio</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
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
        background: #1f2937;
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
