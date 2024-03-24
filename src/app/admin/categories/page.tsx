"use client";
import React, { useEffect, useState } from "react";
import HamburguerMenuAdmin from "@/components/homapage/HamburguerMenuAdmin";
import { SideBar } from "@/components/homapage/SideBar";
import { useMediaQuery } from "react-responsive";
import Pagination from "@/components/homapage/Pagination";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  description?: string;
}

function Categories() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/category/create");
  };

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTabletOrMobile2 = useMediaQuery({ query: "(max-width: 968px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 426px)" });
  const isMobile2 = useMediaQuery({ query: "(max-width: 444px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1224px)" });
  const isLaptop2 = useMediaQuery({ query: "(min-width: 1440px)" });

  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 8; // Default to 1 item per page

  if (isTabletOrMobile2) {
    itemsPerPage = 8;
  } else if (isLaptop) {
    itemsPerPage = 9;
  } else if (isLaptop2) {
    itemsPerPage = 12;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:4000/api/category"
        );
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div
      className={`bg-[#111827] h-auto ssl:h-screen ${
        isTabletOrMobile ? "flex-col" : "flex"
      }`}
    >
      <div
        className="hidden lg:block"
        style={{ position: "fixed", left: 0, top: 0, bottom: 0 }}
      >
        <SideBar />
      </div>
      {!isTabletOrMobile && <SideBar />}
      {isTabletOrMobile && <HamburguerMenuAdmin />}
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-6xl text-white pb-4">Categories</h1>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
            onClick={handleClick}
          >
            <AddIcon /> Create Category
          </button>
        </div>
        <div
          className={`grid grid-cols-1 ssl:grid ssl:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-4 ${
            isMobile2 ? "w-[85%]" : "w-[90%]"
          }`}
        >
          {currentItems.map((category) => (
            <div
              key={category.id}
              className={`bg-gray-800 rounded-lg p-4 mb-4 ssl:ml-4 lg:ml-8 xl:ml-12 hover:bg-gray-700 ${
                isMobile ? "w-full" : "w-60 cursor-pointer"
              }`}
              onClick={() => router.push(`/admin/category/${category.id}`)}
            >
              <h2 className="text-xl text-[#60A5FA] font-bold">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-gray-300">{category.description && category.description.length > 20
                  ? category.description?.substring(0, 20) + "..."
                  : category.description}</p>
              )}
            </div>
          ))}
        </div>

        <div className="my-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(categories.length / itemsPerPage)}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Categories;
