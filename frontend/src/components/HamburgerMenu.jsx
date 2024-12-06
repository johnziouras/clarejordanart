import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
              to="/artwork"
              className="flex gap-1 font-bold text-md md:text-lg text-orange-700"
            >
              ARTWORK
            </Link>
            <Link
              to="/albums"
              className="flex gap-1 font-bold text-md md:text-lg text-[#C175FF]"
            >
              ALBUMS
            </Link>
            <Link
              to="/photography"
              className="flex gap-1 font-bold text-md md:text-lg  text-[#2596BE]"
            >
              PHOTOGRAPHY
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
              className="flex gap-1 font-bold text-md md:text-lg text-amber-300"
            >
              CONTACT
            </Link>
            {user && (
              <button
                className="flex gap-1 font-bold text-md md:text-lg"
                onClick={onLogout}
              >
                LOGOUT
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
