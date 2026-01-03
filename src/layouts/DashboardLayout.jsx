import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { 
  FaHome, 
  FaPlusCircle, 
  FaList, 
  FaHandsHelping, 
  FaUser, 
  FaSignOutAlt, 
  FaBars,
  FaChartPie
} from 'react-icons/fa';
import logo from '../assets/PlateShare-Logo.png';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const { user, userLogout, dbUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userLogout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: <FaChartPie /> },
    { name: 'Add Food', path: '/dashboard/add-food', icon: <FaPlusCircle /> },
    { name: 'Manage My Foods', path: '/dashboard/manage-foods', icon: <FaList /> },
    { name: 'My Food Requests', path: '/dashboard/my-requests', icon: <FaHandsHelping /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <FaUser /> },
  ];

  // Admin specific items
  if (dbUser?.role === 'admin') {
    menuItems.splice(3, 0, { name: 'Admin Feed', path: '/dashboard/admin-manage', icon: <FaList className="text-accent" /> });
  }

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-base-100 border-r border-base-300 transition-all duration-300 hidden md:flex flex-col z-20`}>
        <div className="p-6 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1 rounded-xl">
              <img src={logo} alt="Logo" className="w-8 brightness-0 invert" />
            </div>
            {sidebarOpen && <h1 className="text-xl font-bold">Plate<span className="text-primary">Share</span></h1>}
          </Link>
        </div>

        <nav className="mt-10 px-4 flex-grow space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all
                ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-primary/5 opacity-60 hover:opacity-100'}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl font-bold text-error hover:bg-error/5 transition-all outline-none"
          >
            <FaSignOutAlt className="text-xl" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-base-100 border-b border-base-300 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-ghost btn-circle hidden md:flex"
            >
              <FaBars size={20} />
            </button>
            <Link to="/" className="flex items-center gap-2 md:hidden">
              <img src={logo} alt="Logo" className="w-8" />
              <h1 className="text-lg font-bold">PlateShare</h1>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="btn btn-ghost btn-circle hover:bg-primary/10 hover:text-primary transition-colors">
              <FaHome size={20} />
            </Link>
            <div className="hidden sm:block text-right">
              <p className="font-bold text-sm">{dbUser?.name || user?.displayName}</p>
              <p className="text-[10px] uppercase opacity-50 font-black tracking-tighter">{dbUser?.role || 'Community Member'}</p>
            </div>
            <div className="avatar ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full overflow-hidden">
              <div className="w-10">
                <img src={user?.photoURL || 'https://i.pravatar.cc/150'} alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-grow overflow-y-auto p-6 lg:p-10 bg-base-200/50">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer (Simplistic version) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-base-100 border-t border-base-300 h-20 px-4 flex items-center justify-around z-50">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `
              p-3 rounded-xl transition-all
              ${isActive ? 'text-primary scale-110' : 'opacity-40'}
            `}
          >
            <span className="text-2xl">{item.icon}</span>
          </NavLink>
        ))}
        <button onClick={handleLogout} className="p-3 text-error opacity-40">
          <FaSignOutAlt className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
