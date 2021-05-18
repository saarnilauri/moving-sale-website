import React from "react";
import PortableText from "./portableText";

const TextSection = ({ title, text, ctas, color }) => {
  const links = ctas ? ctas : [];

  const bgColor = {
    orange: "bg-orange-500",
    indigo: "bg-indigo-500",
    teal: "bg-teal-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };
  const borderColor = {
    orange: "border-orange-700",
    indigo: "border-indigo-700",
    teal: "border-teal-700",
    red: "border-red-700",
    gray: "border-gray-700",
    green: "border-green-700",
    blue: "border-blue-700",
  };

  return (
    <section
      className={`${bgColor[color]} border-b-4 border-t-4 ${borderColor[color]} text-center`}
    >
      <div className="container mx-auto">
        <div className="">
          <main className="pt-10 px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="mb-5 text-center">
              <h1 className="text-3xl tracking-tight font-extrabold text-white sm:text-4xl md:text-6xl lg:text-4xl xl:text-5xl xl:leading-relaxed ">
                <span className="block text-white xl:inline">{title}</span>
              </h1>
            </div>
            <div className="text-white pb-10 lg:px-48">
              <PortableText blocks={text} />
            </div>
            {links && (
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {links.map((link) => (
                  <div key={link.url} className="rounded-md shadow">
                    {link}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default TextSection;
