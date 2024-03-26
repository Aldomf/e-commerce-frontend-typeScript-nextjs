import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

// Define the type for form values
type FormValues = {
  country: string;
  city: string;
  state: string;
  postal_code: string;
  street: string;
  mobile: string;
};

// Define Zod schema for form values
const shippingAddressSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  street: z.string().min(1, 'Street address is required'),
  mobile: z.string().min(1, 'Mobile number is required'),
});

function ShippingAddressForm() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormValues>(); // Specify the FormValues type here
  const [submitting, setSubmitting] = useState(false);

  // Define the type for the onSubmit function
  const onSubmit: SubmitHandler<FormValues> = async (data) => { // Use SubmitHandler<FormValues> to match the expected signature
    try {
      setSubmitting(true);
      // Validate input data against schema
      await shippingAddressSchema.parseAsync(data);
      // If validation passes, you can proceed with form submission or further processing
      console.log('Form submitted:', data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // If Zod validation fails, extract error messages and update form errors state
        error.errors.forEach(err => {
          const path = err.path.join('.');
          setError(path as keyof FormValues, { message: err.message });
        });
      }
      console.error('Validation error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          id="country"
          placeholder="Enter your country"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register('country')}
        />
        {errors.country && <span className="text-red-500">{errors.country.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          id="city"
          placeholder="Enter your city"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register('city')}
        />
        {errors.city && <span className="text-red-500">{errors.city.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          type="text"
          id="state"
          placeholder="Enter your state"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register('state')}
        />
        {errors.state && <span className="text-red-500">{errors.state.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
          Postal Code
        </label>
        <input
          type="text"
          id="postal_code"
          placeholder="Enter your postal code"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register('postal_code')}
        />
        {errors.postal_code && <span className="text-red-500">{errors.postal_code.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Street
        </label>
        <input
          type="text"
          id="street"
          placeholder="Enter your street address"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register('street')}
        />
        {errors.street && <span className="text-red-500">{errors.street.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
          Mobile
        </label>
        <input
          type="text"
          id="mobile"
          placeholder="Enter your mobile number"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register('mobile')}
        />
        {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
      </div>
      <div className='py-2 px-4 text-[#EC1C1C] border border-[#EC1C1C] w-fit'>
        <input type="submit" value="Save" disabled={submitting} />
      </div>
    </form>
  );
}

export default ShippingAddressForm;

