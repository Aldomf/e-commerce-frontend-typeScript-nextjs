import React from "react";
import { useMediaQuery } from "react-responsive";

function SectionThree() {
  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });
  const isMobile1 = useMediaQuery({
    query: "(min-width: 401px) and (max-width: 599px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 600px) and (max-width: 1023px)",
  });
  const isLaptop = useMediaQuery({ query: "(min-width: 1024px)" });

  let backgroundImageUrl = "back-12.png";

  if (isMobile) {
    backgroundImageUrl = "back-12.png";
  } else if (isMobile1) {
    backgroundImageUrl = "back-8.png";
  } else if (isTablet) {
    backgroundImageUrl = "back-14.png";
  } else {
    backgroundImageUrl = "back-6.png";
  }

  return (
    <>
      <div
        className="bg-cover bg-center h-[650px] lg:h-[690px] xl:h-[650px] w-full border-2 border-red-600"
        style={{ backgroundImage: `url("${backgroundImageUrl}")` }}
      >
        {/* Content for mobile */}
      </div>
    </>
  );
}

export default SectionThree;
