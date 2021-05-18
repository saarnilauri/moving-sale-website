import React from "react";
//import PortableText from "./portableText";
import SanityGatsbyImage from "./sanityGatsbyImage";

const ImageSection = ({ title, img, cta, color }) => {
  const textColor = {
    orange: "indigo",
    indigo: "orange",
    teel: "orange",
    red: "indigo",
    gray: "indigo",
    green: "indigo",
    blue: "orange",
  };
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 border-b-4 border-t-0 border-${color}-300`}
    >
      <div className="bg-white p-12 md:p-24 flex justify-start items-center">
        <SanityGatsbyImage node={img} className="w-full max-w-md" />
      </div>
      <div
        className={`md:order-first bg-${color}-200 p-12 md:p-24 flex justify-end items-center`}
      >
        <div className="max-w-md">
          <div className={`w-24 h-2 bg-${color}-600 mb-4`}></div>
          <h2
            className={`font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6 text-${textColor[color]}-500`}
          >
            {title}
          </h2>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            {cta && (
              <div
                className={`w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-${color}-600 hover:bg-${color}-700 md:py-4 md:text-lg md:px-10`}
              >
                {cta.title}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
