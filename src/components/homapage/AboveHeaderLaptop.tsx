import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextTransition, { presets } from "react-text-transition";
import Link from "next/link";
import UserAccount from "../login-signup-forms/UserAccount";
import { useAuth } from "@/context/AuthContext";

const TEXTS = [
  "Shop on the go, download our app.",
  "Get 20% off your first order..",
];

function AboveHeaderLaptop() {
  const [index, setIndex] = React.useState(0);

  const { token } = useAuth();

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      5000 // Change to 5000 milliseconds for 5 seconds interval
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="py-3 px-4 lg:px-10 xl:px-16 bg-[#6ca08e] text-white flex justify-between font-light">
      <div className="flex items-center">
        <Link
          href=""
          className="mr-10 hover:text-[#363F46] transition duration-500 ease-in-out"
        >
          About Us
        </Link>
        <Link
          href="/customer-support"
          className="hover:text-[#363F46] transition duration-500 ease-in-out"
        >
          Customer Support
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <TextTransition springConfig={presets.molasses}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </div>
      <div>
        {token ? (
          <UserAccount />
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center hover:text-[#363F46] transition duration-300 ease-in-out"
          >
            <AccountCircleIcon className="mr-2 w-8 h-8" /> Log in
          </Link>
        )}
      </div>
    </div>
  );
}

export default AboveHeaderLaptop;
