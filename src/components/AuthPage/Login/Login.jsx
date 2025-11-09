import React, { useState } from 'react';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { TbArrowBackUp } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const [show, setShow] = useState(false);
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLoginWihEmail = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      loginWithEmail(email, password)
        .then(() => {
          Swal.fire({
            title: 'Login Success',
            icon: 'success',
            draggable: true,
          });
          navigate('/');
        })
        .catch(err => {
          toast.error('Failed', err.message);
        });
    } catch (error) {
      toast.error('Login Failed');
      console.error(error);
    }
  };
  // Login with google
  const handleLoginWithGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      console.log(result);

      Swal.fire({
        title: 'Login Success',
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
      <div className="p-7 md:p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
          Login
        </h2>
        <form onSubmit={handleLoginWihEmail} className="space-y-5">
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
          </div>
          <div>
            <button className="btn btn-primary w-full mt-5 text-base-100">
              Login
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
