import React, { useState } from 'react';
import logo from '../../assets/PlateShare-Logo.png';
import { Link, NavLink } from 'react-router';
import { TiThMenu } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <nav className="bg-base-300 shadow-lg py-3 lg:py-2">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to={'/'} className="flex items-center">
            <img
              src={logo}
              alt="PlateShare Logo"
              className="w-22 hidden md:block"
            />
            <h1 className="text-2xl md:text-3xl font-bold ">
              Plate<span className="text-primary">Share</span>
            </h1>
          </Link>

          {/* Menu */}
          <div className="items-center gap-10 hidden md:flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/available-foods">Available Foods</NavLink>
            <button className="btn bg-primary ml-10">Login</button>

            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="avatar cursor-pointer"
              >
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                  <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                </div>
              </div>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-3 w-60 text-center bg-white shadow-xl rounded-lg p-5 z-50 space-y-5">
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
                    <button className="btn btn-neutral w-full">Logout</button>
                  </li>
                </ul>
              )}
            </div>
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
              <button className="btn bg-primary">Login</button>
              <div className="avatar cursor-pointer absolute top-5">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                  <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                </div>
              </div>
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
                    <button className="btn btn-neutral w-full">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 
      Website Logo &amp; Name
■ Home
■ Available Foods
■ Login (Button) */}
    </nav>
  );
};

export default Navbar;
