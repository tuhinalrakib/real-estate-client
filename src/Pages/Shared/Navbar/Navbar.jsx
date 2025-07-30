import { Link, NavLink } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { FaHome } from 'react-icons/fa';
import ThemeToggle from '../../../components/ThemeToggle/ThemeToggle';

const Navbar = () => {
  const { user, logOut } = useAuth()

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const links =
    <>
      <li><NavLink to="/" className="rounded-lg" >Home</NavLink></li>
      {user && <li><NavLink to="/allProperties" className="rounded-lg">All Properties</NavLink></li>}
      {user && <li><NavLink to="/dashboard" className="rounded-lg">Dashboard</NavLink></li>}
    </>

  return (
    <div className="bg-base-100 shadow sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center gap-2">
            <FaHome size={26} color='#2ae1ce' />
            <span className='text-sm md:text-xl'>REastatePro</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>

        <div className="navbar-end space-x-2">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL || "/default-avatar.png"} alt="User" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><span>{user.displayName}</span></li>
                </ul>
              </div>
              <button onClick={handleLogout} className='btn btn-accent btn-sm'>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
          )}
          <ThemeToggle></ThemeToggle>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-20 -right-1">
            {links}
            {user
              ? <li><button onClick={handleLogout}>Logout</button></li>
              : <li><Link to="/login">Login</Link></li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
