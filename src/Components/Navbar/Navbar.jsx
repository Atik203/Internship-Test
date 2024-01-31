import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#FF444A] underline" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-shows"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#FF444A] underline" : ""
          }
        >
          All Shows
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-11/12 mx-auto rounded-xl">
      <div className="navbar p-5 bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu font-medium menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="text-xl md:text-3xl font-bold text-red-500">
            <img
              width="48"
              height="48"
              src="https://i.ibb.co/3mpm7Mg/cinema.png"
              alt="filled-like--v1"
              className="inline"
            />{" "}
            ShowFlim
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-medium menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <button>
            <Link
              to={"my-booking"}
              className="btn btn-primary text-white border-none hover:text-black hover:bg-gray-300 bg-red-500"
            >
              My Booking
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
