import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

const NavbarLinks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="flex-nowrap whitespace-nowrap mt-2">
      <Link
        to="/artwork"
        className="hover:text-blue text-xl font-bold pr-4 text-orange-700"
      >
        ARTWORK
      </Link>
      <Link
        to="/albums"
        className="hover:text-blue text-xl font-bold pr-4 text-[#C175FF]"
      >
        ALBUMS
      </Link>
      <Link to="/photography" className="text-xl font-bold pr-4 text-[#2596BE]">
        PHOTOGRAPHY
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
      <Link to="/contact" className="text-xl font-bold pr-4 text-amber-300">
        CONTACT
      </Link>
      {user && (
        <button className="text-xl font-bold pr-4" onClick={onLogout}>
          LOGOUT
        </button>
      )}
    </div>
  );
};

export default NavbarLinks;
