import React from "react";
import SanityGatsbyImage from "./sanityGatsbyImage";
import PortableText from "./portableText";

function NewlineText(props) {
  const text = props.text;

  return text.split("\\n").map((str) => (
    <span key={str} className="block">
      {str}
    </span>
  ));
}

const Hero = ({ title, img, text, ctas, color }) => {
  const links = ctas ? ctas : [];

  const bgColor = {
    orange: "bg-orange-200",
    indigo: "bg-indigo-200",
    teal: "bg-teal-200",
    red: "bg-red-200",
    gray: "bg-gray-200",
    green: "bg-green-200",
    blue: "bg-blue-200",
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
    orange: "text-orange-500",
    indigo: "text-indigo-500",
    teal: "text-orange-500",
    red: "text-indigo-500",
    gray: "text-indigo-500",
    green: "text-indigo-500",
    blue: "text-orange-500",
  };

  const rgbColor = {
    orange: "254, 227, 208",
    indigo: "226, 224, 240",
    teal: "217, 239, 242",
    red: "249, 221, 219",
    gray: "228, 228, 231",
    green: "229, 244, 201",
    blue: "210, 237, 249",
  };

  return (
    <div className={`relative ${bgColor[color]} overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative z-10 pb-8 ${bgColor[color]} sm:pb-16 md:pb-20 lg:max-w-lg lg:w-full lg:pb-28 xl:max-w-2xl xl:pb-32`}
        >
          <svg
            className={`hidden lg:block absolute right-0 inset-y-0 h-full w-80 text-${color}-200 transform translate-x-1/2`}
            fill={`rgba(${rgbColor[color]}, var(--tw-bg-opacity))`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 70,0 50,100 0,100" />
          </svg>
          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className={`w-24 h-2 ${lineColor[color]} mb-4`}></div>
            <div className="text-center lg:text-left">
              <h1 className="pt-5 text-3xl tracking-tight sm:text-4xl md:text-6xl lg:text-4xl xl:text-6xl">
                <span
                  className={`block ${textColor[color]} xl:inline leading-normal`}
                >
                  <NewlineText text={title} />
                </span>
              </h1>
            </div>
            {text && (
              <div
                className={`text-center lg:text-left ${textColor[color]} text-xl`}
              >
                <PortableText blocks={text} />
              </div>
            )}
            {links && (
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {links.map((link) => (
                  <div key={link.link} className="rounded-md shadow">
                    {link.title}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <SanityGatsbyImage
          node={img}
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        />
      </div>
    </div>
  );
};

export default Hero;
