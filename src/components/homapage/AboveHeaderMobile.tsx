"use client";
import React from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Shop on the go, download our app.",
  "Get 20% off your first order..",
];

const AboveHeaderMobile = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      5000 // Change to 5000 milliseconds for 5 seconds interval
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="py-3 bg-[#6ca08e] text-white">
      <div className="flex justify-center font-thin">
        <h1 className="pl-4">
          <TextTransition springConfig={presets.molasses}>
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </h1>
      </div>
    </div>
  );
};

export default AboveHeaderMobile;
