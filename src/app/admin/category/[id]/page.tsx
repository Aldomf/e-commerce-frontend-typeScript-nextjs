"use client";
import React, { useEffect, useState } from "react";
import HamburguerMenuAdmin from "@/components/admin/HamburguerMenuAdmin";
import { SideBar } from "@/components/admin/SideBar";
import { useMediaQuery } from "react-responsive";
import { useRouter, useParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { z, object, string } from "zod";
import { useAuth } from "@/context/AuthContext";

const productSchema = object({
  name: string()
    .min(1, { message: "Category name must be at least 1 character long" })
    .max(50, { message: "Category name must be at most 50 characters long" })
    .transform((value) => {
      // Transform the first character to uppercase and the rest to lowercase
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }),
  description: string()
    .min(0)
    .max(1000, {
      message: "Category description must be at most 1000 characters long",
    })
    .nullable(),
});

function UpdateCategory() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const categoryId = params.id;

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [validationErrors, setValidationErrors] = useState<any>({});

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Fetch current category information
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/category/${categoryId}`
        );
        const { name, description } = response.data;
        setName(name);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        });
        toast.success("Category deleted successfully!", {
          duration: 3000,
        });
        router.push("/admin/categories");
        router.refresh();
      } catch (error) {
        console.error("Error deleting category:", error);
        // Handle error
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validationResult = productSchema.parse({ name, description });
      const response = await axios.patch(
        `http://localhost:4000/api/category/${categoryId}`,
        {
          name: validationResult.name,
          description: validationResult.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
      );
      console.log(response.data);
      toast.success("Category updated successfully!", {
        duration: 3000,
      });
      router.push("/admin/categories");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating category:", error);
      if (error instanceof z.ZodError) {
        // If it's a Zod error, set validation errors state
        setValidationErrors(error.errors);
      } else {
        // Otherwise, handle other errors
        setErrorMessage(error.response.data.message);
        toast.error(error.message || "An error occurred");
      }
    }
  };

  return (
    <div
      className={`bg-[#111827] h-screen ${
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
      <div className="w-full flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl md:text-6xl text-white pb-4">
          Update Category
        </h1>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 md:mb-0">
            {errorMessage}
          </div>
        )}
        {Object.keys(validationErrors).length > 0 && (
          <div className="text-red-500 text-sm mb-4 md:mb-0">
            {Object.values(validationErrors).map((error: any) => (
              <div key={error.path}>{error.message}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md py-2 px-3 text-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md py-2 px-3 text-gray-900"
            />
          </div>
          <div className="flex flex-col ssm:flex-row ssm:justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white mb-4 ssm:mb-0 py-2 px-4 w-44 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-between"
            >
              <EditIcon />
              Update Category
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 w-44 rounded-md hover:bg-red-600 transition duration-200 flex items-center justify-between"
            >
              <DeleteForeverIcon />
              Delete Category
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default UpdateCategory;
