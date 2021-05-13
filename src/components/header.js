import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import SanityGatsbyImage from "./sanityGatsbyImage";
import { cn } from "../lib/helpers";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle, logo }) => (
  <div className="relative z-50">
    <div className="container mx-auto flex p-5">
      <div className="font-bold text-xl flex-1">
        <Link to="/">
          <SanityGatsbyImage node={logo} alt={siteTitle} />
        </Link>
      </div>

      <button
        className="appearance-none font-2xl border-none bg-none m-0 outline-none hidden md:inline"
        onClick={showNav ? onHideNav : onShowNav}
      >
        <Icon className="block" symbol="hamburger" />
      </button>

      <nav className={cn("hidden", showNav && "block")}>
        <ul>
          <li>
            <Link className="block hover:text-green-500" to="/">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
