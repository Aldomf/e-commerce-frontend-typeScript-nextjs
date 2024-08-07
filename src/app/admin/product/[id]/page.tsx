"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { SideBar } from "@/components/admin/SideBar";
import { useMediaQuery } from "react-responsive";
import HamburguerMenuAdmin from "@/components/admin/HamburguerMenuAdmin";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { z, object, string, number, boolean, union } from "zod";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

// Custom refinement to check if the value is a valid number
const isNumberString = (val: string) => !isNaN(Number(val));

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
  price: string().min(1, { message: "Price must be at least 1" }),
  // category: string()
  //   .min(1, { message: "Category a category" })
  //   .max(255, { message: "Category must be at most 255 characters long" }),
  discountPercentage: union([
    number().max(99), // If discountPercentage is a number <= 99
    string()
      .max(2, { message: "Discount percentage must be at most 99" })
      .refine(isNumberString), // If discountPercentage is a string representing a number
  ]).optional(),
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
  id?: number;
  name: string;
  description: string;
  price: string;
  category: Category;
  discountPercentage: string;
  discountActive: boolean;
  imageFiles: File[]; // Update to array of files
  imageUrls: string[];
  images: FileList | null;
  inStock: boolean;
  hot: boolean;
  sale: boolean;
  new: boolean;
  priceWithDiscount?: string;
  createdAt?: string; // Add createdAt field
  updatedAt?: string;
}

const UpdateProductForm = () => {
  const { token } = useAuth();
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const router = useRouter();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTabletOrMobile2 = useMediaQuery({ query: "(max-width: 968px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 426px)" });
  const isLaptopSmall = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1224px)" });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [currentCategoryName, setCurrentCategoryName] = useState<string>("");

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [imageIndicesToDelete, setImageIndicesToDelete] = useState<number[]>(
    []
  );

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

  const [productData, setProductData] = useState<ProductData>({
    name: "",
    description: "",
    price: "",
    category: {} as Category,
    discountPercentage: "",
    discountActive: false,
    imageFiles: [], // Initialize as an empty array
    imageUrls: [], // Initialize as an empty array
    images: null,
    inStock: true,
    hot: false,
    sale: false,
    new: false,
  });

  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = [...productData.imageUrls];
    updatedImageUrls.splice(index, 1); // Remove image from state
    setProductData({ ...productData, imageUrls: updatedImageUrls });
    setImageIndicesToDelete((prevIndices) => [...prevIndices, index]); // Track the index of the image to delete
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get<ProductData>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${productId}`
        );
        const product = response.data;
        setProductData({
          ...product,
          imageFiles: [] // Ensure imageFiles is initialized as an empty array
        });
        setCurrentCategoryName(product.category.name);
        console.log(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`
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

  useEffect(() => {
    if (
      typeof productData.category === "object" &&
      productData.category !== null
    ) {
      setSelectedCategoryId(productData.category.id);
    }
  }, [productData.category]);

  const handleDelete = async () => {
    // Display a confirmation dialog before deleting the product
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Product deleted:", response.data);
        toast.success("Product deleted successfully!", {
          duration: 3000,
        });
        router.push("/admin/products");
        router.refresh();
      } catch (error: any) {
        console.error("Error deleting product:", error.response.data);
        toast.error("Error deleting product");
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
  
    setProductData((prevData) => {
      if (type === "file") {
        if (files && files.length > 0) {
          const newFilesArray = Array.from(files);
          const newUrlsArray = newFilesArray.map((file) => URL.createObjectURL(file));
  
          const existingFileNames = new Set((prevData.imageFiles || []).map((file) => file.name));
          const existingUrls = new Set(prevData.imageUrls || []);
  
          const uniqueFiles = newFilesArray.filter((file) => !existingFileNames.has(file.name));
          const uniqueUrls = newUrlsArray.filter((url) => !existingUrls.has(url));
  
          e.target.value = "";
  
          return {
            ...prevData,
            imageFiles: [...(prevData.imageFiles || []), ...uniqueFiles],
            imageUrls: [...(prevData.imageUrls || []), ...uniqueUrls],
          };
        }
      }
  
      let newValue: string | boolean = value;
  
      if (type === "checkbox") {
        newValue = (e.target as HTMLInputElement).checked;
      }
  
      if (name === "category" && newValue === currentCategoryName) {
        return {
          ...prevData,
          [name]: prevData.category,
        };
      }
  
      return {
        ...prevData,
        [name]: newValue,
      };
    });
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form:", productData);
    console.log(productData.category.name);

    // Validate product data
    const validationResult = validateProduct(productData);
    if (!validationResult.isValid) {
      console.error("Validation errors:", validationResult.errors);
      setValidationErrors(validationResult.errors);
      return;
    }

    try {
      const formData = new FormData();

      // Destructure productData and exclude unnecessary fields
      const {
        imageFiles, // Handle imageFiles separately
        imageUrls, // Remove if not required
        id,
        priceWithDiscount,
        createdAt,
        updatedAt,
        ...relevantData // Other relevant fields
      } = productData;

      // Append imageFiles to formData
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append("images", file); // Append each file as 'images'
        });
      }

      // Append other relevant data to formData
      Object.entries(relevantData).forEach(([key, value]) => {
        // Convert boolean to string and append
        const formattedValue = typeof value === "boolean" ? value.toString() : value;
        // Append only if the value is not an object (like category)
        if (typeof formattedValue !== "object") {
          formData.append(key, formattedValue);
        }
      });

      // Append imageIndicesToDelete if needed
      if (imageIndicesToDelete.length > 0) {
        // Append each index as a separate form data entry
        imageIndicesToDelete.forEach((index) => {
          formData.append("imageIndicesToDelete[]", index.toString());
        });
      }

      // Append imageUrls if needed
      if (imageUrls && Array.isArray(imageUrls)) {
        imageUrls.forEach((url, index) => {
          formData.append(`imageUrls[${index}]`, url); // Adjust if necessary for your backend
        });
      }

      console.log("Form data:", formData);

      // Make the PATCH request
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update imageUrls state to remove deleted images
      const updatedImageUrls = productData.imageUrls.filter(
        (_, index) => !imageIndicesToDelete.includes(index)
      );
      setProductData((prevState) => ({
        ...prevState,
        imageUrls: updatedImageUrls,
      }));

      console.log("Product updated:", response.data);
      toast.success("Product updated successfully!", {
        duration: 3000,
      });
      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating product:", error.response.data);
      setErrorMessage(error.response.data.message);
      toast.error("Error updating product");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const urlsArray = filesArray.map((file) => URL.createObjectURL(file));
      setProductData((prevProductData) => ({
        ...prevProductData,
        imageFiles: [...(prevProductData.imageFiles || []), ...filesArray],
        imageUrls: [...(prevProductData.imageUrls || []), ...urlsArray],
      }));
    }
  };


  return (
    <div
      className={`bg-[#111827] ${
        isTabletOrMobile ? "flex-col" : "flex h-screen"
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
        <div className="bg-gray-800 my-4 lg:mt-0 text-white p-2 py-4 md:px-4 xl:px-10 rounded-lg shadow-md w-[90%] sm:w-[60%] md:w-[90%] lg:w-[70%]">
          <h1 className="text-2xl font-bold mb-4 md:text-center">
            Update Product
          </h1>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4 md:mb-0">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex md:flex-row md:flex-wrap">
              <div className="flex flex-col mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productData.name}
                  onChange={handleChange}
                  className="border-2 border-gray-500 text-black rounded-md px-4 py-2 md:mr-4"
                />
                {validationErrors.name && (
                  <span className="text-red-500 text-sm md:mb-0">
                    {validationErrors.name}
                  </span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={productData.description}
                  onChange={handleChange}
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
                  value={productData.category.name}
                  onChange={handleChange}
                  className="border-2 border-gray-500 text-black rounded-md px-4 py-2"
                >
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.name}
                        selected={productData.category.name === category.name}
                      >
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
                {validationErrors.category && (
                  <span className="text-red-500 text-sm mb-4 md:mb-0">
                    {validationErrors.category}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap">
              <label className="flex items-center space-x-2 mr-4">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={productData.inStock}
                  onChange={handleChange}
                  className="rounded-md"
                />
                <span>In Stock</span>
              </label>
              <label className="flex items-center space-x-2 mr-4">
                <input
                  type="checkbox"
                  name="hot"
                  checked={productData.hot}
                  onChange={handleChange}
                  className="rounded-md"
                />
                <span>Hot</span>
              </label>
              <label className="flex items-center space-x-2 mr-4">
                <input
                  type="checkbox"
                  name="sale"
                  checked={productData.sale}
                  onChange={handleChange}
                  className="rounded-md"
                />
                <span>Sale</span>
              </label>
              <label className="flex items-center space-x-2 mr-4">
                <input
                  type="checkbox"
                  name="new"
                  checked={productData.new}
                  onChange={handleChange}
                  className="rounded-md"
                />
                <span>New</span>
              </label>
              <label className="flex items-center space-x-2 mr-4">
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
                <span>Discount Active</span>
              </label>
            </div>
            <input
              type="file"
              name="imageFiles"
              accept="image/*"
              multiple
              onChange={(e) => {
                handleChange(e);
                handleImageChange(e);
              }}
              className="rounded-md p-2 w-full"
            />
            <div className="flex flex-wrap">
            {productData.imageUrls &&
              productData.imageUrls.map((url, index) => (
                <div key={index} className="relative w-24 h-24 m-1">
                <Image
                  key={index}
                  src={url}
                  alt={`Product Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                  style={{ maxWidth: "200px" }}
                />
                <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col ssm:flex-row ssm:justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white mb-4 ssm:mb-0 py-2 px-4 w-44 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-between"
              >
                <EditIcon />
                Update Product
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 w-44 rounded-md hover:bg-red-600 transition duration-200 flex items-center justify-between"
              >
                <DeleteForeverIcon />
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateProductForm;
