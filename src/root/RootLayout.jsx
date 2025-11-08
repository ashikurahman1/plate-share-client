import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
