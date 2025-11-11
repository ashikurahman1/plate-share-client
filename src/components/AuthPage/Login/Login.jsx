import React, { useState } from 'react';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { TbArrowBackUp } from 'react-icons/tb';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { loginWithEmail, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // login with email
  const handleLoginWihEmail = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setResetEmail(email);

    try {
      await loginWithEmail(email, password, remember);
      Swal.fire({
        title: 'Login Success',
        icon: 'success',
        draggable: true,
      });
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password'
      ) {
        toast.error('Invalid email or password');
      } else if (err.code === 'auth/user-not-found') {
        toast.error('No user found with this email');
      } else {
        toast.error('Login failed, please try again');
      }
    }
  };

  // login with google
  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({
        title: 'Login Success',
        icon: 'success',
        draggable: true,
      });
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Google login failed');
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast.error('Please enter your email first');
      return;
    }
    try {
      await resetPassword(resetEmail);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email');
      } else {
        toast.error('Failed to send reset email');
      }
    }
  };

  return (
    <section className="container mx-auto max-w-2xl min-h-screen py-10 px-4">
      <div className="p-7 md:p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
          Login
        </h2>

        <form onSubmit={handleLoginWihEmail} className="space-y-3">
          <div>
            <label>Email :</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input w-full mt-2 focus:outline-0 focus:border-primary"
              onChange={e => setResetEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password :</label>
            <div className="relative">
              <input
                name="password"
                type={show ? 'text' : 'password'}
                placeholder="Enter Password"
                className="input w-full mt-2 focus:outline-0 focus:border-primary"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute top-5 right-5 z-10 cursor-pointer"
              >
                {show ? <BiSolidHide /> : <BiSolidShow />}
              </span>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-primary hover:underline"
            >
              Forgot password?
            </button>
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
          Don't have an account?{' '}
          <Link to={'/auth/Register'} className="text-primary">
            Register
          </Link>
        </div>
      </div>

      <div className="text-center">
        <Link to="/" className="mt-3 btn">
          <TbArrowBackUp />
          Go to home
        </Link>
      </div>
    </section>
  );
};

export default Login;
