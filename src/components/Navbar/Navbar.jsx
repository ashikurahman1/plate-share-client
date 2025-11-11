import React, { useState } from 'react';
import logo from '../../assets/PlateShare-Logo.png';
import { Link, NavLink, useNavigate } from 'react-router';
import { TiThMenu } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, loading, userLogout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

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

  if (loading) return <span className="">..</span>;
  return (
    <nav className="bg-base-200 shadow py-2 lg:py-4">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to={'/'} className="flex items-center">
            <img
              src={logo}
              alt="PlateShare Logo"
              className="w-15 hidden md:block"
            />
            <h1 className="text-2xl font-bold ">
              Plate<span className="text-primary">Share</span>
            </h1>
          </Link>

          {/* Menu */}
          <div className="items-center gap-10 hidden md:flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/available-foods">Available Foods</NavLink>

            {user ? (
              <div className="relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="avatar cursor-pointer"
                >
                  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'
                      }
                    />
                  </div>
                </div>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-3 w-60 text-center bg-white shadow-xl rounded-lg p-5 z-50 space-y-5">
                    <li>{user?.displayName}</li>
                    <div className="divider"></div>
                    <li onClick={() => setDropdownOpen(false)}>
                      <Link to={'/add-food'}>Add Food</Link>
                    </li>
                    <li onClick={() => setDropdownOpen(false)}>
                      <Link to={'/manage-foods'}>Manage My Foods</Link>
                    </li>
                    <li onClick={() => setDropdownOpen(false)}>
                      <Link to={'/my-food-requests'}>My Food Requests</Link>
                    </li>
                    <li className="mt-8">
                      <button
                        onClick={handleLogout}
                        className="btn btn-neutral w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="btn btn-primary text-white ml-10"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className="btn btn-ghost md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <TiThMenu size={26} />
          </div>

          {mobileMenu && (
            <div className="md:hidden absolute top-0 right-0 w-full h-full bg-white flex flex-col z-30 p-10 pt-20 space-y-6 text-center">
              <button
                onClick={() => setMobileMenu(false)}
                className="btn btn-error absolute top-5 right-5"
              >
                <IoClose />
              </button>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/available-foods">Available Foods</NavLink>

              {user ? (
                <div className="avatar cursor-pointer absolute top-5">
                  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'
                      }
                    />
                  </div>
                </div>
              ) : (
                <Link to="/auth/login" className="btn btn-primary text-white">
                  Login
                </Link>
              )}

              <div className="">
                <ul className="space-y-5">
                  <li>
                    <Link to={'/add-food'}>Add Food</Link>
                  </li>
                  <li>
                    <Link to={'/manage-foods'}>Manage My Foods</Link>
                  </li>
                  <li>
                    <Link to={'/my-food-requests'}>My Food Requests</Link>
                  </li>
                  <li className="mt-8">
                    <button
                      onClick={handleLogout}
                      className="btn btn-neutral w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
