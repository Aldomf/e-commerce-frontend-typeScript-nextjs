import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextTransition, { presets } from "react-text-transition";
import Link from "next/link";

const TEXTS = [
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor eee eee  ee.",
];

function AboveHeaderLaptop() {
  const [index, setIndex] = React.useState(0);

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
        <Link href="" className="mr-10">About Us</Link>
        <Link href="">Customer Support</Link>
      </div>
      <div className="flex items-center justify-center">
        <TextTransition springConfig={presets.molasses}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </div>
      <div>
        <Link href="" className="flex items-center justify-center">
          <AccountCircleIcon className="mr-2 w-8 h-8" /> Log in
        </Link>
      </div>
    </div>
  );
}

export default AboveHeaderLaptop;
