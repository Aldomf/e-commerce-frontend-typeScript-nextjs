import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { login, loginError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    await login(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 md:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
              <div className="text-red-500 text-sm">{loginError}</div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CA08E] sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <Link href="/forgot-password" className="text-[#6CA08E]">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CA08E] sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  {showPassword ? (
                    <FaEyeSlash
                      className="h-6 w-6 text-gray-400 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      className="h-6 w-6 text-gray-400 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#6CA08E] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#A3C9BC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6CA08E]"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            You do not have an account?
            <Link
              href="/signup"
              className="font-semibold leading-6 text-[#6CA08E] hover:text-[#A3C9BC] ml-2"
            >
              Sign up here!
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
}
