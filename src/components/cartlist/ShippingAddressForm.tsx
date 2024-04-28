import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ShippingAddress } from "@/interfaces/interfaces";
import { z } from "zod";
import { useShippingAddress } from "@/context/ShippingAddresContext";
import { useAuth } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

// Define Zod schema for form values
const shippingAddressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  street: z.string().min(1, "Street address is required"),
  // mobile: z
  //   .string()
  //   .min(1, "Mobile number is required")
  //   .regex(/^\+[1-9]\d{1,14}$/, "Invalid mobile number format"),
});

function ShippingAddressForm() {
  // Use the useShippingAddress hook to access the addShippingAddress and getShippingAddress functions
  const {
    addShippingAddress,
    getShippingAddress,
    updateShippingAddress,
    shippingAddress,
    setShippingAddress,
    shippingAddressError,
  } = useShippingAddress();
  const { token, user } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm<ShippingAddress>(); // Specify the FormValues type here
  const [submitting, setSubmitting] = useState(false);

  // Define the type for the onSubmit function
  const onSubmit: SubmitHandler<ShippingAddress> = async (data) => {
    // Use SubmitHandler<FormValues> to match the expected signature
    try {
      setSubmitting(true);
      // Validate input data against schema
      await shippingAddressSchema.parseAsync(data);
      // If validation passes, you can proceed with form submission or further processing
      console.log("Form submitted:", data);
      // Call the addShippingAddress function from the context to add the shipping address
      if (!shippingAddress) {
        // If shippingAddress is null, it means the form is in create mode
        await addShippingAddress(data);
      } else {
        // If shippingAddress exists, it means the form is in update mode
        await updateShippingAddress(data);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // If Zod validation fails, extract error messages and update form errors state
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          setError(path as keyof ShippingAddress, { message: err.message });
        });
      }
      console.error("Validation error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch the current shipping address when the component mounts
  useEffect(() => {
    if (token && user?.id) {
      // Call getShippingAddress only if the token exists
      getShippingAddress().then((address) => {
        setShippingAddress(address);
        // Set form field values if shipping address exists
        if (address) {
          Object.entries(address).forEach(([key, value]) => {
            setValue(key as keyof ShippingAddress, value);
          });
        }
      });
    }
  }, [token, setValue, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <input
          type="text"
          id="country"
          placeholder="Enter your country"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register("country")}
        />
        {errors.country && (
          <span className="text-red-500">{errors.country.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <input
          type="text"
          id="city"
          placeholder="Enter your city"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register("city")}
        />
        {errors.city && (
          <span className="text-red-500">{errors.city.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700"
        >
          State
        </label>
        <input
          type="text"
          id="state"
          placeholder="Enter your state"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register("state")}
        />
        {errors.state && (
          <span className="text-red-500">{errors.state.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="postal_code"
          className="block text-sm font-medium text-gray-700"
        >
          Postal Code
        </label>
        <input
          type="text"
          id="postal_code"
          placeholder="Enter your postal code"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register("postalCode")}
        />
        {errors.postalCode && (
          <span className="text-red-500">{errors.postalCode.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700"
        >
          Street
        </label>
        <input
          type="text"
          id="street"
          placeholder="Enter your street address"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register("street")}
        />
        {errors.street && (
          <span className="text-red-500">{errors.street.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile
        </label>
        <input
          type="text"
          id="mobile"
          placeholder="Enter your mobile number"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register("mobile")}
        />
        {/* {errors.mobile && (
          <span className="text-red-500">{errors.mobile.message}</span>
        )} */}
        {shippingAddressError && (
          <div className="error-message text-red-500">
            {shippingAddressError}
          </div>
        )}
      </div>

      <input
        type="submit"
        className="cursor-pointer py-2 px-4 text-[#EC1C1C] border border-[#EC1C1C] w-fit"
        value={!shippingAddress ? "Save" : "Update"}
        disabled={submitting}
      />

      <Toaster />
    </form>
  );
}

export default ShippingAddressForm;
