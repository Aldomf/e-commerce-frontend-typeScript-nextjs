import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

function SignUpForm() {
  const { signup, signupError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const { username, email, password } = data;
    await signup(username, email, password);
  };

  return (
    <div className="bg-grey-lighter min-h-44 flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {Array.isArray(signupError) ? (
              signupError.map((error, index) => <p key={index} className="text-red-500 mb-2">{error}</p>)
            ) : (
              <p className="text-red-500">{signupError}</p>
            )}
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              {...register("username", { required: true })}
              placeholder="Username"
            />
            {errors.username && <span className="text-red-500">This field is required</span>}

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && <span className="text-red-500">This field is required</span>}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="block border border-grey-light w-full p-3 rounded mb-4 pr-10"
                {...register("password", { required: true })}
                placeholder="Password"
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
            {errors.password && <span className="text-red-500">This field is required</span>}

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="block border border-grey-light w-full p-3 rounded mb-4 pr-10"
                {...register("confirm_password", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") ||
                    "The passwords do not match",
                })}
                placeholder="Confirm Password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="h-6 w-6 text-gray-400 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="h-6 w-6 text-gray-400 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                )}
              </div>
            </div>
            {errors.confirm_password && (
              <span className="text-red-600">
                {errors.confirm_password.message}
              </span>
            )}

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-[#6CA08E] text-white hover:bg-[#A3C9BC] focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <Link
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="/terms-conditions"
            >
              Terms of Service
            </Link>{" "}
            and
            <Link
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="/terms-conditions"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            href="/login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SignUpForm;
