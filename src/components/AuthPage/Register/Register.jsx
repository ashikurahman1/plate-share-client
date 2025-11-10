import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TbArrowBackUp } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';

import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
const Register = () => {
  const [show, setShow] = useState(false);
  const { setUser, createUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();

    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName,
        photoURL,
      });

      setUser({ ...user, displayName, photoURL });
      const newUser = {
        email: user?.email,
        photoURL: user?.photoURL,
        name: user?.displayName,
      };
      const res = await fetch(
        'https://plate-share-server-eight.vercel.app/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        }
      );
      const data = await res.json();
      if (data.acknowledged && data.insertedId) {
        Swal.fire({
          title: 'Registration Success',
          icon: 'success',
          draggable: true,
        });
        navigate('/');
      } else {
        toast.error('user cant added on database');
      }
    } catch (error) {
      toast.error('Registration failed');
      console.error(error);
    }
  };

  // Login with google
  const handleLoginWithGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      console.log(result);

      Swal.fire({
        title: 'Registration Success',
        icon: 'success',
        draggable: true,
      });
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto max-w-2xl min-h-screen py-10 px-4">
      <div className="py-5 px-4 md:p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-primary mb-5 lg:mb-8 text-center">
          Create your account
        </h2>
        <form onSubmit={handleRegister} className="space-y-3 lg:space-y-5">
          <div className="">
            <label className="">Name :</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="input w-full mt-2 focus:outline-0 focus:border-primary"
            />
          </div>
          <div className="">
            <label className="">Email :</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input w-full mt-2 focus:outline-0 focus:border-primary"
            />
          </div>
          <div className="">
            <label className="">Photo URL :</label>
            <input
              name="photoURL"
              type="url"
              placeholder="Enter photo URL"
              className="input w-full mt-2 focus:outline-0 focus:border-primary"
            />
          </div>
          <div className="">
            <label className="">Password</label>
            <div className="relative">
              <input
                name="password"
                type={show ? 'text' : 'password'}
                placeholder="Enter Password"
                className="input w-full mt-2 focus:outline-0 focus:border-primary"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute top-5 right-5 z-10"
              >
                {show ? <BiSolidHide /> : <BiSolidShow />}
              </span>
            </div>
            {/* <p className="text-red-500 text-sm mt-2">{error}</p> */}
          </div>
          <div>
            <button className="btn btn-primary w-full mt-5 text-base-100">
              Register
            </button>
          </div>
        </form>
        <div className="divider my-5">Or</div>
        <div className="flex justify-center">
          <button onClick={handleLoginWithGoogle} className="btn">
            <FcGoogle size={25} /> Login with Google
          </button>
        </div>
        <div className="mt-5 text-center">
          Have an account? Please{' '}
          <Link to={'/auth/login'} className="text-primary">
            Login
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

export default Register;
