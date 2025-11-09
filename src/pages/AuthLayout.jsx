import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import authBackground from '../assets/Hero-Image.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
const AuthLayout = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);
  return (
    <div
      className=" min-h-screen relative"
      style={{
        background: `url(${authBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>

      <div data-aos="fade-up" data-aos-duration="2000">
        <Outlet></Outlet>
      </div>
      <Toaster />
    </div>
  );
};

export default AuthLayout;
