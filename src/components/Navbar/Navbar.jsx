import React, { useState, useEffect } from 'react';
import logo from '../../assets/PlateShare-Logo.png';
import { Link, NavLink, useNavigate } from 'react-router';
import { TiThMenu } from 'react-icons/ti';
import { IoClose, IoMoon, IoSunny } from 'react-icons/io5';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await userLogout();
      setDropdownOpen(false);
      toast.success('Logout success');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = (
    <>
      <NavLink to="/" className="hover:text-primary transition-colors">Home</NavLink>
      <NavLink to="/available-foods" className="hover:text-primary transition-colors">Available Foods</NavLink>
      <NavLink to="/about" className="hover:text-primary transition-colors">About</NavLink>
      <NavLink to="/contact" className="hover:text-primary transition-colors">Contact</NavLink>
      {user && (
        <>
          <NavLink to="/dashboard" className="hover:text-primary transition-colors font-bold text-primary">Dashboard</NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-base-100/90 backdrop-blur-md shadow-md py-2' : 'bg-base-100/50 py-4 text-black'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to={'/'} className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <img
                src={logo}
                alt="PlateShare Logo"
                className="w-8 h-8 object-contain brightness-0 invert"
              />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Plate<span className="text-primary">Share</span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 isActive">
            <div className="flex items-center gap-6 font-medium">
              {navLinks}
            </div>

            <div className="flex items-center gap-4 border-l border-base-300 pl-6 ml-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle btn-sm md:btn-md"
              >
                {theme === 'light' ? <IoMoon size={20} /> : <IoSunny size={20} className="text-yellow-400" />}
              </button>

              {user ? (
                <div className="relative">
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="avatar cursor-pointer"
                  >
                    <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2 overflow-hidden">
                      <img
                        src={user?.photoURL || 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'}
                        alt="User"
                      />
                    </div>
                  </div>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-base-100 shadow-2xl rounded-2xl p-4 border border-base-200 z-50 transform origin-top-right transition-all duration-200">
                      <div className="flex items-center gap-3 px-2 pb-4 border-b border-base-200">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img src={user?.photoURL || 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'} alt="" />
                          </div>
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold truncate text-sm">{user?.displayName}</p>
                          <p className="text-xs opacity-60 truncate">{user?.email}</p>
                        </div>
                      </div>
                      <ul className="py-2 space-y-1">
                        <li>
                          <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors text-sm font-medium">
                            Overview
                          </Link>
                        </li>
                        <li>
                          <Link to="/dashboard/add-food" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors text-sm font-medium">
                            Add Food
                          </Link>
                        </li>
                        <li>
                          <Link to="/dashboard/manage-foods" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors text-sm font-medium">
                            Manage My Foods
                          </Link>
                        </li>
                        <li>
                          <Link to="/dashboard/my-requests" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors text-sm font-medium">
                            My Requests
                          </Link>
                        </li>
                      </ul>
                      <div className="pt-2 mt-2 border-t border-base-200">
                        <button
                          onClick={handleLogout}
                          className="btn btn-error btn-sm btn-outline w-full rounded-xl"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary btn-md px-8 rounded-xl text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle btn-sm"
              >
                {theme === 'light' ? <IoMoon size={18} /> : <IoSunny size={18} className="text-yellow-400" />}
            </button>
            <button
              className="btn btn-ghost btn-circle btn-sm"
              onClick={() => setMobileMenu(true)}
            >
              <TiThMenu size={24} />
            </button>
          </div>

          {/* Mobile Menu Backdrop */}
          {mobileMenu && (
            <div className="fixed inset-0 bg-base-300/50 backdrop-blur-sm z-[100] md:hidden" onClick={() => setMobileMenu(false)}>
              <div
                className="absolute top-0 right-0 w-[80%] h-full bg-base-100 p-6 flex flex-col shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button
                    onClick={() => setMobileMenu(false)}
                    className="btn btn-ghost btn-circle btn-sm"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-4 text-lg font-medium">
                  <NavLink to="/" onClick={() => setMobileMenu(false)}>Home</NavLink>
                  <NavLink to="/available-foods" onClick={() => setMobileMenu(false)}>Available Foods</NavLink>
                  {user && <NavLink to="/dashboard" onClick={() => setMobileMenu(false)}>Dashboard</NavLink>}
                </div>

                <div className="mt-auto border-t border-base-200 pt-6">
                  {user ? (
                    <div className="flex items-center gap-4 mb-6">
                      <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={user?.photoURL || 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'} alt="" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{user?.displayName}</p>
                        <button onClick={handleLogout} className="text-error text-sm font-semibold">Logout</button>
                      </div>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setMobileMenu(false)} className="btn btn-primary w-full rounded-xl text-white">
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
