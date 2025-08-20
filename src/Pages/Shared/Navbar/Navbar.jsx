import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";
import { FcAbout } from "react-icons/fc";
import { GrContactInfo } from "react-icons/gr";
import { CiLogin } from "react-icons/ci";
import { GiArchiveRegister } from "react-icons/gi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()
      navigate("/")
      ;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Public routes (always visible)
  const publicLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 flex items-center transition duration-300 ${isActive ? "bg-white/20 text-teal-300" : "hover:bg-white/10"
            }`
          }
        >
          <FaHome size={20} className="mr-1" />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition duration-300 ${isActive ? "bg-white/20 text-teal-300" : "hover:bg-white/10"
            }`
          }
        >
          <FcAbout size={24} className="mr-1" />
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition duration-300 ${isActive ? "bg-white/20 text-teal-300" : "hover:bg-white/10"
            }`
          }
        >
          <GrContactInfo size={24} className="mr-1" />
          Contact
        </NavLink>
      </li>
    </>
  );

  // Protected routes (only when logged in)
  const privateLinks = (
    <>
      <li>
        <NavLink
          to="/allProperties"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 flex items-center transition duration-300 ${isActive ? "bg-white/20 text-teal-300" : "hover:bg-white/10"
            }`
          }
        >
          <TbHomeSearch size={20} className="mr-1" />
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 flex items-center transition duration-300 ${isActive ? "bg-white/20 text-teal-300" : "hover:bg-white/10"
            }`
          }
        >
          <MdDashboard size={20} className="mr-1" />
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-primary/70 backdrop-blur-lg shadow-lg">
      {/* Container keeps navbar content aligned */}
      <div className="container mx-auto px-4">
        <div className="navbar py-2">
          {/* Left Logo */}
          <div className="navbar-start">
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white"
            >
              <FaHome size={26} className="text-teal-400" />
              <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                Habikon
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal space-x-1.5 px-1 font-medium text-white">
              {publicLinks}
              {user && privateLinks}
            </ul>
          </div>

          {/* Right Side */}
          <div className="navbar-end flex items-center gap-1 md:gap-2">
            {user ? (
              <>
                {/* User Dropdown */}
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring ring-white/30">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="User"
                        loading="lazy"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-3 shadow-lg menu menu-sm dropdown-content rounded-xl bg-white/20 backdrop-blur-lg border border-white/20 text-white w-52"
                  >
                    <li>
                      <span className="font-semibold">{user.displayName}</span>
                    </li>
                  </ul>
                </div>
                <button
              onClick={handleLogout}
              className="bg-white/20 text-white btn btn-sm btn-info transition"
            >
              Logout
            </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 transition"
                >
                  <CiLogin className="w-4"/>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm hidden md:flex md:btn-sm rounded-xl bg-secondary/80 text-white hover:bg-secondary transition"
                >
                  <GiArchiveRegister className="w-3"/>
                  Register
                </Link>
              </>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 rounded-xl bg-primary/80 backdrop-blur-lg border border-white/20 shadow-lg w-52 text-white"
            >
              {publicLinks}
              {user && privateLinks}
              {user ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
