import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import { NavLink, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';
import { Helmet } from 'react-helmet';

const DashboardLayout = () => {
  const { user } = useAuth(); 
  const role = useUserRole(); // assume it returns 'user', 'agent', or 'admin'
  
  const activeClass = "bg-base-200 font-semibold rounded-md";

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Helmet>
          <title>Dashboard</title>
      </Helmet>
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Top bar */}
        <div className="w-full navbar bg-base-100 shadow px-4">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" 
                 strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </label>
          <div className="ml-4 text-lg font-bold">Dashboard</div>
        </div>

        {/* Main content */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-72 bg-base-200 text-base-content min-h-screen">
          <div className="p-4 border-b text-center">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h2 className="mt-2 font-semibold">{user?.displayName}</h2>
            <p className="text-sm text-gray-500">{role.toUpperCase()}</p>
          </div>

          <ul className="menu p-4 text-base space-y-1">
            {/* User Routes */}
            {role === "user" && (
              <>
                <li><NavLink to="/dashboard/user/profile" className={({ isActive }) => isActive ? activeClass : ""}>My Profile</NavLink></li>
                <li><NavLink to="/dashboard/user/wishlist" className={({ isActive }) => isActive ? activeClass : ""}>Wishlist</NavLink></li>
                <li><NavLink to="/dashboard/user/bought" className={({ isActive }) => isActive ? activeClass : ""}>Property Bought</NavLink></li>
                <li><NavLink to="/dashboard/user/myReviews" className={({ isActive }) => isActive ? activeClass : ""}>My Reviews</NavLink></li>
              </>
            )}

            {/* Agent Routes */}
            {role === "agent" && (
              <>
                <li><NavLink to="/dashboard/agent/profile" className={({ isActive }) => isActive ? activeClass : ""}>Agent Profile</NavLink></li>
                <li><NavLink to="/dashboard/agent/addProperty" className={({ isActive }) => isActive ? activeClass : ""}>Add Property</NavLink></li>
                <li><NavLink to="/dashboard/agent/myProperties" className={({ isActive }) => isActive ? activeClass : ""}>My Properties</NavLink></li>
                <li><NavLink to="/dashboard/sold-properties" className={({ isActive }) => isActive ? activeClass : ""}>Sold Properties</NavLink></li>
                <li><NavLink to="/dashboard/requests" className={({ isActive }) => isActive ? activeClass : ""}>Requested Offers</NavLink></li>
              </>
            )}

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <li><NavLink to="/dashboard/admin/profile" className={({ isActive }) => isActive ? activeClass : ""}>Admin Profile</NavLink></li>
                <li><NavLink to="/dashboard/admin/makeAdmin" className={({ isActive }) => isActive ? activeClass : ""}>Manage Users</NavLink></li>
                <li><NavLink to="/dashboard/admin/managementProperties" className={({ isActive }) => isActive ? activeClass : ""}>Manage Properties</NavLink></li>
                <li><NavLink to="/dashboard/admin/manageReviews" className={({ isActive }) => isActive ? activeClass : ""}>Manage Reviews</NavLink></li>
              </>
            )}

            <div className="divider"></div>
            <li><NavLink to="/" className={({ isActive }) => isActive ? activeClass : ""}>Back to Home</NavLink></li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
