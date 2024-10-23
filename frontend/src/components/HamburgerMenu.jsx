import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative mb-0">
      <div className="flex items-center justify-end">
        <div className="flex-shrink-0">
          <Hamburger
            toggled={isOpen}
            size={28}
            toggle={setIsOpen}
            duration={0.2}
          />
        </div>
      </div>
      {isOpen && (
        <div className="right-0 my-0 ml-4">
          <ul className="grid gap-2 p-4 mb-0 text-right">
            <Link
              to="/paintings"
              className="flex gap-1 font-bold text-md md:text-lg text-orange-700"
            >
              PAINTINGS
            </Link>
            <Link
              to="/photography"
              className="flex gap-1 font-bold text-md md:text-lg text-amber-300"
            >
              PHOTOGRAPHY
            </Link>
            <Link
              to="/watercolors"
              className="flex gap-1 font-bold text-md md:text-lg text-sky-700"
            >
              WATERCOLORS
            </Link>
            <Link
              to="/publications"
              className="flex gap-1 font-bold text-md md:text-lg text-[#E0662B]"
            >
              PUBLICATIONS
            </Link>
            <Link
              to="/about"
              className="flex gap-1 font-bold text-md md:text-lg text-teal-400"
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className="flex gap-1 font-bold text-md md:text-lg text-sky-700"
            >
              CONTACT
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
