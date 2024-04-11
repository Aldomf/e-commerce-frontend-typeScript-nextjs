"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SideBar } from "@/components/admin/SideBar";
import { useMediaQuery } from "react-responsive";
import HamburguerMenuAdmin from "@/components/admin/HamburguerMenuAdmin";
import { Toaster, toast } from "react-hot-toast";
import { z, object, string, number, boolean } from "zod";
import { useAuth } from "@/context/AuthContext";

// Define the schema for the form data using Zod
const productSchema = object({
  name: string()
    .min(1, { message: "Product name must be at least 1 character long" })
    .max(50, { message: "Product name must be at most 50 characters long" }),
  description: string()
    .min(1, {
      message: "Product description must be at least 1 character long",
    })
    .max(1000, {
      message: "Product description must be at most 1000 characters long",
    }),
  price: number().min(1, { message: "Price must be at least 1" }),
  category: string()
    .min(1, { message: "Select a category" })
    .max(255, { message: "Category must be at most 255 characters long" }),
  discountPercentage: string()
    .max(2, { message: "Discount percentage must be at most 99" })
    .optional(),
  discountActive: boolean().optional(),
  inStock: boolean().optional(),
  hot: boolean().optional(),
  sale: boolean().optional(),
  new: boolean().optional(),
});

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  discountPercentage?: string;
  discountActive: boolean;
  imageFile: File | null;
  imageUrl: string | null;
  inStock: boolean;
  hot: boolean;
  sale: boolean;
  new: boolean;
}

const CreateProduct: React.FC = () => {
  const { token } = useAuth();
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    description: "",
    price: "",
    category: "",
    discountPercentage: "",
    discountActive: false,
    imageFile: null,
    imageUrl: "",
    inStock: true,
    hot: false,
    sale: false,
    new: false,
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  // Define a function to validate the form data against the schema
  const validateProduct = (data: ProductData) => {
    try {
      productSchema.parse(data);
      return { isValid: true, errors: {} };
    } catch (error: any) {
      const errors: { [key: string]: string } = {};
      error.errors.forEach((err: any) => {
        // Convert Zod error format to { fieldName: errorMessage } format
        const field = err.path.join(".");
        errors[field] = err.message;
      });
      return { isValid: false, errors };
    }
  };

  const router = useRouter();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletOrMobile2 = useMediaQuery({ query: "(max-width: 968px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 426px)" });
  const isLaptopSmall = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1224px)" });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:4000/api/category"
        );
        setCategories(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    const newValue = name === "price" ? parseFloat(value) : value;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === "imageFile" ? (files ? files[0] : null) : newValue,
    }));

    // If the name of the select element is 'category', set the selected category name
    if (name === "category") {
      setSelectedCategory(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form:", productData);
    // Log the value of productData.category
    console.log("Product category:", productData.category);

    const validationResult = validateProduct(productData);
    if (!validationResult.isValid) {
      console.error("Validation errors:", validationResult.errors);
      setValidationErrors(validationResult.errors); // Set validation errors state
      return;
    }

    try {
      // Find the category name based on the selected category ID
      const selectedCategoryObject = categories.find(
        (category) => category.name === productData.category
      );

      if (!selectedCategoryObject) {
        console.error("Selected category not found");
        return;
      }

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", parseFloat(productData.price).toString()); // Convert to number and then to string
      formData.append("category", productData.category);
      if (productData.discountPercentage) {
        // Check if discountPercentage is defined
        formData.append(
          "discountPercentage",
          parseFloat(productData.discountPercentage).toString()
        );
      }
      if (typeof productData.discountActive === "boolean") {
        // Check if discountActive is defined and a boolean
        formData.append(
          "discountActive",
          productData.discountActive.toString()
        );
      }
      if (typeof productData.inStock === "boolean") {
        // Check if inStock is defined and a boolean
        formData.append("inStock", productData.inStock.toString());
      }
      if (typeof productData.hot === "boolean") {
        // Check if hot is defined and a boolean
        formData.append("hot", productData.hot.toString());
      }
      if (typeof productData.sale === "boolean") {
        // Check if sale is defined and a boolean
        formData.append("sale", productData.sale.toString());
      }
      if (typeof productData.new === "boolean") {
        // Check if new is defined and a boolean
        formData.append("new", productData.new.toString());
      }
      formData.append("image", productData.imageFile as Blob);

      console.log("Form data:", formData);

      const response = await axios.post(
        "http://localhost:4000/api/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product created:", response.data);
      setValidationErrors({});
      toast.success("Product created successfully!", {
        duration: 3000,
      });
      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      console.error("Error creating product:", error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProductData((prevProductData) => ({
        ...prevProductData,
        imageFile: file,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div
      className={`bg-[#111827] h-auto md:h-[850px] xl:h-screen ${
        isTabletOrMobile ? "flex-col" : "flex"
      }`}
    >
      {!isTabletOrMobile && <SideBar />}
      {isTabletOrMobile && <HamburguerMenuAdmin />}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="bg-gray-800 my-4 lg:mt-0 text-white p-2 py-4 md:px-4 xl:px-10 rounded-lg shadow-md w-[90%] sm:w-[50%] md:w-[90%] lg:w-[70%]">
          <h1 className="text-2xl font-bold mb-4 md:text-center">
            Create Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex md:flex-row md:flex-wrap">
              <div className="flex flex-col mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-500 text-black rounded-md px-4 py-2 md:mr-4"
                />
                {validationErrors.name && (
                  <span className="text-red-500 text-sm md:mb-0">
                    {validationErrors.name}
                  </span>
                )}
                {errorMessage && (
                  <div className="text-red-500 text-sm mb-4 md:mb-0">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={productData.description}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-500 text-black rounded-md px-4 py-2 md:mr-4"
                ></textarea>
                {validationErrors.description && (
                  <span className="text-red-500 text-sm mb-4 md:mb-0">
                    {validationErrors.description}
                  </span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={productData.price}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-500 text-black rounded-md px-4 py-2 md:mr-4"
                />
                {validationErrors.price && (
                  <span className="text-red-500 text-sm mb-4 md:mb-0">
                    {validationErrors.price}
                  </span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <input
                  type="number"
                  name="discountPercentage"
                  placeholder="Discount Percentage"
                  value={productData.discountPercentage}
                  onChange={handleChange}
                  className="border-2 border-gray-500 text-black rounded-md px-4 py-2 md:mr-4"
                />
                {validationErrors.discountPercentage && (
                  <span className="text-red-500 text-sm mb-4 md:mb-0">
                    {validationErrors.discountPercentage}
                  </span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <select
                  name="category"
                  value={productData.category} // Set selected category value
                  onChange={handleChange}
                  className="border-2 border-gray-500 text-black rounded-md px-4 py-2"
                >
                  <option value="">Choose a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {validationErrors.category && (
                  <span className="text-red-500 text-sm">
                    {validationErrors.category}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap">
              <input
                type="checkbox"
                name="inStock"
                checked={productData.inStock}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    inStock: e.target.checked,
                  }))
                }
                className="rounded-md"
              />
              <label
                htmlFor="inStock"
                className="flex items-center space-x-2 mr-4 ml-2"
              >
                In Stock
              </label>

              <input
                type="checkbox"
                name="hot"
                checked={productData.hot}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    hot: e.target.checked,
                  }))
                }
                className="rounded-md"
              />
              <label
                htmlFor="hot"
                className="flex items-center space-x-2 mr-4 ml-2"
              >
                Hot
              </label>

              <input
                type="checkbox"
                name="sale"
                checked={productData.sale}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    sale: e.target.checked,
                  }))
                }
                className="rounded-md"
              />
              <label
                htmlFor="sale"
                className="flex items-center space-x-2 mr-4 ml-2"
              >
                Sale
              </label>

              <input
                type="checkbox"
                name="new"
                checked={productData.new}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    new: e.target.checked,
                  }))
                }
                className="rounded-md"
              />
              <label
                htmlFor="new"
                className="flex items-center space-x-2 mr-4 ml-2"
              >
                New
              </label>
              <input
                type="checkbox"
                name="discountActive"
                checked={productData.discountActive}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    discountActive: e.target.checked,
                  }))
                }
                className="rounded-md"
              />
              <label
                htmlFor="discountActive"
                className="flex items-center space-x-2 mr-4 ml-2"
              >
                Discount Active
              </label>
            </div>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={(e) => {
                handleChange(e);
                handleImageChange(e);
                console.log('error');
              }}
              required
              className="rounded-md p-2 w-full"
            />
            {productData.imageUrl && (
              <img
                src={productData.imageUrl} // Set the src to the current image URL
                alt="Current Image"
                className="mt-2"
                style={{ maxWidth: "200px" }} // Adjust the width as needed
              />
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateProduct;
