import React, { useState } from 'react';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal 
  ? 'http://localhost:5100/api' 
  : 'https://plate-share-serv1.vercel.app/api';

const Login = () => {
  const [show, setShow] = useState(false);
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginWihEmail = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginWithEmail(email, password);
      Swal.fire({
        title: 'Welcome Back!',
        text: 'Login successful.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Invalid email or password');
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const res = await loginWithGoogle();
      const user = res.user;

      const newUser = {
        email: user?.email,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        createdAt: new Date(),
      };

      await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      Swal.fire({
        title: 'Logged In!',
        text: 'Access granted with Google.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  const autoFill = (email, password) => {
    const form = document.querySelector('form');
    form.email.value = email;
    form.password.value = password;
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-200 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-2">Welcome <span className="text-primary text-5xl">!</span></h2>
            <p className="text-base-content/60">Log in to your PlateShare account</p>
          </div>

          <form onSubmit={handleLoginWihEmail} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email Address</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-base-content/40 hover:text-primary transition-colors"
                >
                  {show ? <BiSolidHide size={20} /> : <BiSolidShow size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded" />
                <span className="label-text">Remember me</span>
              </label>
              <button type="button" className="text-primary font-semibold hover:underline">Forgot password?</button>
            </div>

            <button className="btn btn-primary w-full h-12 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all">
              Login
            </button>
          </form>

          <div className="divider my-8 opacity-50">OR</div>

          <div className="space-y-4">
            <button 
              onClick={handleLoginWithGoogle} 
              className="btn btn-outline w-full h-12 rounded-xl border-base-300 hover:bg-base-200 hover:border-base-400 group flex items-center justify-center gap-3"
            >
              <FcGoogle size={22} className="group-hover:scale-110 transition-transform" />
              <span className="text-base-content font-semibold">Sign in with Google</span>
            </button>

            {/* Demo Credentials Section */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => autoFill('user@test.com', 'User123')}
                className="btn btn-sm btn-ghost bg-secondary/10 hover:bg-secondary/20 text-secondary border-none rounded-lg"
              >
                Demo User
              </button>
              <button 
                onClick={() => autoFill('admin@test.com', 'Admin123')}
                className="btn btn-sm btn-ghost bg-accent/10 hover:bg-accent/20 text-accent border-none rounded-lg"
              >
                Demo Admin
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-base-content/60">
            New here?{' '}
            <Link to={'/register'} className="text-primary font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
