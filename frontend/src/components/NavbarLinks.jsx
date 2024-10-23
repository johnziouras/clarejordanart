import { Link } from "react-router-dom";

const NavbarLinks = () => {
  return (
    <div className="flex-nowrap whitespace-nowrap mt-2">
      <Link
        to="/paintings"
        className="hover:text-blue text-xl font-bold pr-4 text-orange-700"
      >
        PAINTINGS
      </Link>
      <Link to="/photography" className="text-xl font-bold pr-4 text-amber-300">
        PHOTOGRAPHY
      </Link>
      <Link to="/watercolors" className="text-xl font-bold pr-4 text-sky-700">
        WATERCOLORS
      </Link>
      <Link
        to="/publications"
        className="text-xl font-bold pr-4 text-[#E0662B]"
      >
        PUBLICATIONS
      </Link>
      <Link to="/about" className="text-xl font-bold pr-4 text-teal-400">
        ABOUT
      </Link>
      <Link to="/contact" className="text-xl font-bold pr-4 text-sky-700">
        CONTACT
      </Link>
    </div>
  );
};

export default NavbarLinks;
