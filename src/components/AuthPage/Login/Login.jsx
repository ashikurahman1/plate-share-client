import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TbArrowBackUp } from 'react-icons/tb';
import { Link } from 'react-router';

const Login = () => {
  return (
    <section className="container mx-auto max-w-2xl min-h-screen py-10 px-4">
      <div className="p-7 md:p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
          Login
        </h2>
        <form className="space-y-5">
          <div className="">
            <label className="">Email :</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full mt-2 focus:outline-0 focus:border-primary"
            />
          </div>
          <div className="">
            <label className="">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input w-full mt-2 focus:outline-0 focus:border-primary"
            />
          </div>
          <div>
            <button className="btn btn-primary w-full mt-5 text-base-100">
              Login
            </button>
          </div>
        </form>
        <div className="divider my-5">Or</div>
        <div className="flex justify-center">
          <button className="btn">
            <FcGoogle /> Login with Google
          </button>
        </div>
        <div className="mt-5 text-center">
          Don't have an account? Please{' '}
          <Link to={'/auth/Register'} className="text-primary">
            Register
          </Link>
        </div>
      </div>
      <div className="text-center">
        <Link to="/" className="mt-10 btn">
          <TbArrowBackUp />
          Go to home
        </Link>
      </div>
    </section>
  );
};

export default Login;
