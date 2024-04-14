import React from "react";

function OurHistory() {
  return (
    <div className="mb-8 lg:border lg:border-black lg:flex lg:mx-20 xl:mx-36 lg:mb-28">
      <div
        className="bg-cover bg-center w-full h-60 md:h-96 mb-6 lg:mb-0 lg:h-[536px] lg:w-[50%] xl:h-[600px]"
        style={{ backgroundImage: 'url("aboutUs.jpg")' }}
      ></div>
      <div className="lg:w-[50%]">
        <div className="mb-6 mx-6 md:mx-28 lg:mx-10 lg:mt-10">
          <h3 className="text-2xl font-bold mb-6 lg:text-4xl">Our Story</h3>
          <p className="font-light mb-6">
            I&apos;m a paragraph. Click here to add your own text and edit me.
            It’s easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. Feel free to drag and drop me
            anywhere you like on your page. I’m a great place for you to tell a
            story and let your users know a little more about you.
          </p>
          <p className="font-light">
            This is a great space to write a long text about your company and
            your services. You can use this space to go into a little more
            detail about your company. Talk about your team and what services
            you provide. Tell your visitors the story of how you came up with
            the idea for your business and what makes you different from your
            competitors. Make your company stand out and show your visitors who
            you are.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurHistory;
