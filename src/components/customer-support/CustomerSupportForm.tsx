import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

function CustomerSupportForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    // Prevent the default form submission behavior
    event?.preventDefault();

    // Handle form submission here
    console.log(data);
    toast.success("Form submitted successfully!", {
      duration: 3000,
    });

    reset();
  };

  return (
    <div className="mb-8 lg:border lg:border-black lg:flex lg:mx-20 xl:mx-36 lg:mb-28">
      <div
        className="bg-cover bg-center w-full h-60 md:h-96 mb-6 lg:mb-0 lg:h-[760px] lg:w-[50%] xl:h-[735px]"
        style={{ backgroundImage: 'url("customerSupport.jpg")' }}
      ></div>
      <div className="lg:w-[50%]">
        <div className="mb-6 mx-6 md:mx-28 lg:mx-10 lg:mt-10">
          <h3 className="text-2xl font-bold mb-3">We&apos;re Here to Help!</h3>
          <p className="font-semibold">
            Fill out the form with any query on your mind and we&apos;ll get
            back to you as soon as possible
          </p>
        </div>
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-6 md:mx-28 lg:mx-10"
          >
            <div className="lg:flex">
              <div className="mb-4 lg:w-[50%]">
                <label htmlFor="firstName" className="block text-lg font-light">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: true })}
                  className="mt-1 p-2 block w-full border border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.firstName && (
                  <span className="text-red-500">First name is required</span>
                )}
              </div>
              <div className="mb-4 lg:w-[50%]">
                <label htmlFor="lastName" className="block text-lg font-light">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: true })}
                  className="mt-1 p-2 block w-full border border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.lastName && (
                  <span className="text-red-500">Last name is required</span>
                )}
              </div>
            </div>
            <div className="lg:flex">
              <div className="mb-4 lg:w-[50%]">
                <label htmlFor="email" className="block text-lg font-light">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="mt-1 p-2 block w-full border border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="mb-4 lg:w-[50%]">
                <label htmlFor="phone" className="block text-lg font-light">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", { required: true })}
                  className="mt-1 p-2 block w-full border border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.phone && (
                  <span className="text-red-500">Phone is required</span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-light">
                Leave us a message...
              </label>
              <textarea
                rows={3}
                id="message"
                {...register("message", { required: true })}
                className="mt-1 p-2 block w-full border border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.message && (
                <span className="text-red-500">Message is required</span>
              )}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-[#6CA08E] lg:hover:bg-[#A3C9BC] text-white py-2 w-36 font-bold rounded-full"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-10 py-10 px-6 md:px-28 lg:px-10 bg-[#F6F6F6]">
            <h3 className="font-bold text-lg mb-3">
              Chat with Our Support Team
            </h3>
            <p className="mb-4">
              I&apos;m a paragraph. Click here to add your own text and edit me.
            </p>
            <button className="bg-black border border-black lg:hover:bg-transparent lg:hover:text-black text-white py-2 w-36 font-bold rounded-full">
              Message Us
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default CustomerSupportForm;
