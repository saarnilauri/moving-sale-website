import React from "react";
import SanityGatsbyImage from "./sanityGatsbyImage";
import PortableText from "./portableText";

const Hero = ({ title, img, text, ctas, color }) => {
  const links = ctas ? ctas : [];

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
    <div className={`relative bg-${color}-200 overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative z-10 pb-8 bg-${color}-200 sm:pb-16 md:pb-20 lg:max-w-lg lg:w-full lg:pb-28 xl:max-w-2xl xl:pb-32`}
        >
          <svg
            className={`hidden lg:block absolute right-0 inset-y-0 h-full w-80 text-${color}-200 transform translate-x-1/2`}
            fill="rgba(226, 224, 240, var(--tw-bg-opacity))"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 70,0 50,100 0,100" />
          </svg>
          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className={`w-24 h-2 bg-${color}-600 mb-4`}></div>
            <div className="text-center lg:text-left">
              <h1 className="pt-5 text-3xl tracking-tight font-extrabold sm:text-4xl md:text-6xl lg:text-4xl xl:text-6xl">
                <span className={`block text-${color}-600 xl:inline`}>
                  {title}
                </span>
              </h1>
            </div>
            {text && (
              <div
                className={`text-center lg:text-left text-${textColor[color]}-500 text-xl`}
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
