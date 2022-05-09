import React from "react";
import { Link } from "gatsby";

import SanityGatsbyImage from "./sanityGatsbyImage";

const debug = false;

const GroupCard = ({ group }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 p-4">
      <Link
        to={`/group/${group.slug.current}`}
        className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden hover:no-underline"
      >
        <div className="relative overflow-hidden">
          <SanityGatsbyImage
            node={group.coverImage}
            className="inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="mt-2 mb-2 text-lg xl:text-2xl font-bold">
            {group.title}
          </h2>
          <p className="text-sm">{group.description}</p>
        </div>
        {debug && <pre>{JSON.stringify(group, null, 2)}</pre>}
      </Link>
    </div>
  );
};

export default GroupCard;
//${group.slug.current}
