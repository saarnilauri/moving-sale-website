import React, { useState } from "react";
import { Link, StaticQuery, graphql } from "gatsby";

import Icon from "./icon";
import SanityGatsbyImage from "./sanityGatsbyImage";

const showMenu = false;

const Header = ({ siteTitle, logo }) => {
  const [showNav, setNav] = useState(false);

  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          groups: allSanityGroup(sort: { fields: title, order: ASC }) {
            edges {
              node {
                id
                title
                slug {
                  current
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        
        return (
          <div className="relative z-50 border-b-8 border-gray-100">
            <div className="container mx-auto flex p-5 items-center">
              <div className="flex-1">
                <Link to="/">
                  <SanityGatsbyImage node={logo} alt={siteTitle} />
                </Link>
              </div>

              {showMenu && (
                <>
                  <button
                    className="appearance-none font-2xl border-none bg-green-200 m-0 h-10 px-5 outline-none inline md:inline"
                    onClick={() => setNav(!showNav)}
                  >
                    {showNav ? "Close" : "Open"} Menu
                  </button>

                  <nav className={showNav ? "block" : "hidden"}>
                    <div class="w-60 shadow-md bg-green-200 px-1 absolute right-0 top-24" onClick={() => setNav(!showNav)}>
                      <ul class="relative">
                        {data.groups.edges.map(group => (
                      <li class="relative">
                        <Link
                          className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap  hover:text-gray-900 hover:bg-teal-300 transition duration-300 ease-in-out"
                          activeClassName="flex bg-teal-700 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-100 text-ellipsis whitespace-nowrap  hover:text-gray-100 hover:bg-teal-700 transition duration-300 ease-in-out"
                          
                          to={`/group/${group.node.slug.current}`}
                        >
                          {group.node.title}
                        </Link>
                      </li>
                      ))}
                      <li className="text-center">------------------</li>
                        <li class="relative">
                          <Link
                            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap  hover:text-gray-900 hover:bg-teal-300 transition duration-300 ease-in-out"
                            activeClassName="flex bg-teal-700 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-100 text-ellipsis whitespace-nowrap  hover:text-gray-100 hover:bg-teal-700 transition duration-300 ease-in-out"
                            to="/about"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="dark"
                          >
                            About us
                          </Link>
                        </li>
                        <li class="relative">
                        <Link
                            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap  hover:text-gray-900 hover:bg-teal-300 transition duration-300 ease-in-out"
                            activeClassName="flex bg-teal-700 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-100 text-ellipsis whitespace-nowrap  hover:text-gray-100 hover:bg-teal-700 transition duration-300 ease-in-out"
                            to="/"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="dark"
                          >
                            Home page
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default Header;
