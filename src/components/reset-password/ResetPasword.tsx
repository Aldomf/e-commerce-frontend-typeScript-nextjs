"use client";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios"; // Import axios to make HTTP requests
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPasword() {

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const [success, setSuccess] = useState(""); // State to hold success messages

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Send a POST request to your backend API endpoint for resetting the password
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password`,
        {
          newPassword: password,
          token,
        }
      );

      setPassword("");
      setConfirmPassword("");
      setSuccess("Password reset successfully!"); // Set success message
      setError(""); // Clear error message
    } catch (error: any) {
      // Handle error
      setSuccess(""); // Clear success message
      setError(error.response.data.message);
      console.error("Error resetting password:", error);
    }
  };
  return (
    <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[250px] flex flex-col items-center px-6 pb-6 ssm:px-10">
          <h1 className="text-2xl my-6 md:text-3xl lg:text-4xl">
            Reset Your Password
          </h1>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message */}
          {success && <p className="text-green-500">{success}</p>}{" "}
          {/* Display success message */}
          <form onSubmit={handleSubmit}>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="block border border-grey-light w-full p-3 rounded mb-4 pr-10"
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
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="block border border-grey-light w-full p-3 rounded mb-4 pr-10"
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
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#6CA08E] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#A3C9BC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6CA08E] mt-4"
            >
              Reset Password
            </button>
          </form>
        </div>
  )
}

export default ResetPasword