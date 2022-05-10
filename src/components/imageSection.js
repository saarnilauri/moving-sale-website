import React from "react";
import PortableText from "./portableText";
import SanityGatsbyImage from "./sanityGatsbyImage";

const ImageSection = ({ title, img, cta, color, text }) => {
  const bgColor = {
    orange: "bg-orange-200",
    indigo: "bg-indigo-200",
    teal: "bg-teal-200",
    red: "bg-red-200",
    gray: "bg-gray-200",
    green: "bg-green-200",
    blue: "bg-blue-200",
  };
  const borderColor = {
    orange: "bg-orange-300",
    indigo: "bg-indigo-300",
    teal: "bg-teal-300",
    red: "bg-red-300",
    gray: "bg-gray-300",
    green: "bg-green-300",
    blue: "bg-blue-300",
  };
  const lineColor = {
    orange: "bg-orange-600",
    indigo: "bg-indigo-600",
    teal: "bg-teal-600",
    red: "bg-red-600",
    gray: "bg-gray-600",
    green: "bg-green-600",
    blue: "bg-blue-600",
  };
  const textColor = {
    orange: "text-indigo-500",
    indigo: "text-orange-500",
    teal: "text-orange-500",
    red: "text-indigo-500",
    gray: "text-indigo-500",
    green: "text-indigo-500",
    blue: "text-orange-500",
  };
  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 border-b-4 border-t-0 ${borderColor[color]}`}
      >
        <div className="bg-white p-12 md:p-24 flex justify-start items-center">
          <SanityGatsbyImage node={img} className="w-full max-w-md" />
        </div>
        <div
          className={`md:order-first ${bgColor[color]} p-12 md:p-24 flex justify-end items-center`}
        >
          <div className="max-w-md">
            <div className={`w-24 h-2 ${lineColor[color]} mb-4`}></div>
            <h2
              className={`font-display text-2xl md:text-3xl lg:text-4xl mb-6 ${textColor[color]}`}
            >
              {title}
            </h2>

            <div className="w-64">
          <PortableText blocks={text} />
        </div>

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
    </>
  );
};

export default ImageSection;
