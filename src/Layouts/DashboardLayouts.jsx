import React from "react";
import useUserRole from "../Hooks/useUserRole";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
import { FaHome, FaUser, FaHeart, FaStar, FaPlusSquare, FaList, FaCheckCircle, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const role = useUserRole(); 
  const navigate = useNavigate()

  const activeClass = "bg-primary/20 text-primary font-semibold rounded-lg";

  const handleLogout = async () => {
    try {
      await logOut()
      navigate("/")
      ;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div data-theme="mytheme" className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Topbar */}
        <div className="w-full navbar bg-base-100 border-b shadow-sm px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <span className="text-lg font-bold">Dashboard</span>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline font-medium">{user?.displayName}</span>
            <div className="avatar space-x-1.5">
              <div className="w-10 rounded-full border">
                <img 
                src={user?.photoURL || "/default-avatar.png"} 
                alt="User" 
                loading="lazy"
                />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6 bg-secondary/20 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-72 bg-base-100 border-r shadow-lg min-h-screen flex flex-col">
          {/* User Info */}
          <div className="p-6 border-b text-center">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mx-auto border shadow"
            />
            <h2 className="mt-3 font-semibold">{user?.displayName}</h2>
            <p className="text-xs text-gray-500 tracking-wide uppercase">{role}</p>
          </div>

          {/* Nav Links */}
          <ul className="menu px-4 py-6 flex-1 text-base space-y-2">
            {role === "user" && (
              <>
                <li>
                  <NavLink to="/dashboard/user/profile" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaUser className="mr-2" /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/user/wishlist" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaHeart className="mr-2" /> Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/user/bought" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaCheckCircle className="mr-2" /> Property Bought
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/user/myReviews" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaStar className="mr-2" /> My Reviews
                  </NavLink>
                </li>
              </>
            )}

            {role === "agent" && (
              <>
                <li>
                  <NavLink to="/dashboard/agent/profile" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaUser className="mr-2" /> Agent Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agent/addProperty" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaPlusSquare className="mr-2" /> Add Property
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agent/myProperties" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaList className="mr-2" /> My Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agent/soldProperties" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaCheckCircle className="mr-2" /> Sold Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agent/requests" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaUsers className="mr-2" /> Requested Offers
                  </NavLink>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/admin/profile" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaUser className="mr-2" /> Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/makeAdmin" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaUsers className="mr-2" /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/managementProperties" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaList className="mr-2" /> Manage Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/manageReviews" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaStar className="mr-2" /> Manage Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/advertise" className={({ isActive }) => isActive ? activeClass : ""}>
                    <FaCog className="mr-2" /> Advertise Property
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? activeClass : ""}>
                <FaHome className="mr-2" /> Back to Home
              </NavLink>
            </li>
            <li>
              <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
