"use client";
import React, { useEffect, useState } from "react";
import HamburguerMenuAdmin from "@/components/admin/HamburguerMenuAdmin";
import { SideBar } from "@/components/admin/SideBar";
import { useMediaQuery } from "react-responsive";
import { Product } from "@/interfaces/interfaces";
import Pagination from "@/components/homapage/Pagination";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";

function AdminProduct() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/product/create");
  };

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTabletOrMobile2 = useMediaQuery({ query: "(max-width: 968px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 426px)" });
  const isMobile2 = useMediaQuery({ query: "(max-width: 444px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1224px)" });
  //const isLaptop1440 = useMediaQuery({ query: "(max-width: 1440px)" });

  const [prevSearchQuery, setPrevSearchQuery] = useState("");

  const [product, setProduct] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 1; // Default to 1 item per page

  if (isTabletOrMobile2) {
    itemsPerPage = 2; // 2 items per page for tablet or mobile
  } else if (isLaptop) {
    itemsPerPage = 3; // 3 items per page for laptops with a width between 768px and 1024px
  } else {
    itemsPerPage = 4;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<Product[]> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`
      );
      const productData: Product[] = await response.json();
      console.log(productData);
      setProduct(productData);
      return productData; // Return the fetched product data
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();

    if (searchQuery.trim() === "") {
      // If the search query is empty or its length is zero, reset the products state to its original state
      fetchData(); // Refetch all products
    } else if (searchQuery.length < prevSearchQuery.length) {
      // If a character is removed, refetch the data and then filter the records based on the new search query
      fetchData().then((products) => {
        const filteredProducts = products.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.category.name.toLowerCase().includes(searchQuery)
        );
        setProduct(filteredProducts);
      });
    } else {
      // If there is a search query, filter the records based on it
      const filteredProducts = product.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery) ||
          item.category.name.toLowerCase().includes(searchQuery)
      );
      setProduct(filteredProducts);
    }
    setPrevSearchQuery(searchQuery);
  };

  return (
    <div
      className={`bg-[#111827] h-auto md:h-[800px] lg:h-[700px] xl:h-screen ${
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
        <h1 className="text-3xl md:text-6xl text-white pb-4">Products</h1>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
            onClick={handleClick}
          >
            <AddIcon /> Create Product
          </button>
        </div>
        <div className="flex items-center justify-center w-[90%] md:w-[80%] mb-2">
          <label htmlFor="searchInput" className="text-white">
            Search product by name or category:
          </label>
          <input
            type="text"
            id="searchInput"
            onChange={handleChage}
            placeholder="Enter name"
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div
          className={`${
            isMobile2 ? "flex-col w-[85%]" : "flex justify-start w-[90%]"
          }`}
        >
          {currentItems.map((product) => (
            <div
              key={product.id}
              className={`bg-gray-800 rounded-lg p-4 mb-4 ssl:ml-4 lg:ml-8 xl:ml-12 hover:bg-gray-700 ${
                isMobile ? "w-full" : "w-60 cursor-pointer"
              }`}
              onClick={() => router.push(`/admin/product/${product.id}`)}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="w-40 h-auto mb-2 rounded-lg border-2"
              />
              <h2 className="text-xl text-[#60A5FA] font-bold">
                {product.name}
              </h2>
              <p className="text-gray-300">
                {product.description && product.description.length > 20
                  ? product.description?.substring(0, 20) + "..."
                  : product.description}
              </p>
              <p className="text-gray-300">
                Price:
                <span
                  style={{
                    textDecoration: product.discountActive
                      ? "line-through"
                      : "none",
                    color: product.discountActive ? "red" : "green",
                  }}
                >
                  ${product.price}
                </span>
                {product.discountActive && (
                  <span className="text-green-500 ml-2">
                    ${product.priceWithDiscount}
                  </span>
                )}
              </p>
              <p className="text-gray-300">
                {product.discountPercentage && (
                  <>Discount Percentage: {product.discountPercentage}%</>
                )}
              </p>
              <p className="text-gray-300">Category: {product.category.name}</p>
              <p className="text-gray-300">
                In Stock:{" "}
                <span style={{ color: product.inStock ? "green" : "red" }}>
                  {product.inStock.toString()}
                </span>
              </p>
              <p className="text-gray-300">
                Discount Active:{" "}
                <span
                  style={{ color: product.discountActive ? "green" : "red" }}
                >
                  {product.discountActive.toString()}
                </span>
              </p>
              <p className="text-gray-300">
                On Sale:{" "}
                <span style={{ color: product.sale ? "green" : "red" }}>
                  {product.sale.toString()}
                </span>
              </p>
              <p className="text-gray-300">
                New:{" "}
                <span style={{ color: product.new ? "green" : "red" }}>
                  {product.new.toString()}
                </span>
              </p>
              <p className="text-gray-300">
                Hot:{" "}
                <span style={{ color: product.hot ? "green" : "red" }}>
                  {product.hot.toString()}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="my-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(product.length / itemsPerPage)}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default AdminProduct;
