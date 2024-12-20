import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1100);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <header className="w-full relative">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-start px-6 py-2">
        <Link
          to="/"
          className="w-32 h-16 relative flex-shrink-0 pl-2 flex space-x-2 items-center"
        >
          <img src="logo.png" alt="Logo" className="h-2/3" />
          <p className="text-3xl font-bold mt-2 mb-0 leading-6">
            CLARE
            <br />
            JORDAN
          </p>
        </Link>
        {isDesktop ? <NavbarLinks /> : <HamburgerMenu />}
      </nav>
    </header>
  );
};

export default Navbar;
