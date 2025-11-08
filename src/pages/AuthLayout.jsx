import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import authBackground from '../assets/authBackground.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
const AuthLayout = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);
  return (
    <div
      className="bg-no-repeat bg-cover min-h-screen"
      style={{ background: `url(${authBackground}), #dddddd` }}
    >
      <div data-aos="fade-up" data-aos-duration="2000">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
