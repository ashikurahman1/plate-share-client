import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal 
  ? 'http://localhost:5100/api' 
  : 'https://plate-share-serv1.vercel.app/api';

const Register = () => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setUser, createUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError('Min 6 characters');
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError('One uppercase letter');
    } else if (!/[a-z]/.test(value)) {
      setPasswordError('One lowercase letter');
    } else {
      setPasswordError('');
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    if (passwordError) return toast.error(passwordError);

    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, { displayName, photoURL });
      setUser({ ...user, displayName, photoURL });

      const newUser = {
        email: user?.email,
        photoURL,
        name: displayName,
        createdAt: new Date(),
      };

      await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      Swal.fire({
        title: 'Success!',
        text: 'Account created successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (error) {
      toast.error(error.message);
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
        title: 'Success!',
        text: 'Authenticated with Google.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-lg w-full bg-base-100 p-8 md:p-10 rounded-3xl shadow-2xl border border-base-200 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-2">Join Us <span className="text-primary text-5xl">.</span></h2>
            <p className="text-base-content/60">Create your PlateShare account today</p>
          </div>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control md:col-span-1">
              <label className="label"><span className="label-text font-bold">Full Name</span></label>
              <input name="name" type="text" placeholder="John Doe" required className="input input-bordered w-full rounded-xl focus:border-primary" />
            </div>

            <div className="form-control md:col-span-1">
              <label className="label"><span className="label-text font-bold">Email</span></label>
              <input name="email" type="email" placeholder="john@example.com" required className="input input-bordered w-full rounded-xl focus:border-primary" />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label"><span className="label-text font-bold">Photo URL</span></label>
              <input name="photoURL" type="url" placeholder="https://example.com/photo.jpg" required className="input input-bordered w-full rounded-xl focus:border-primary" />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label"><span className="label-text font-bold">Password</span></label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={`input input-bordered w-full rounded-xl focus:border-primary ${passwordError ? 'border-error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-base-content/40 hover:text-primary transition-colors"
                >
                  {show ? <BiSolidHide size={20} /> : <BiSolidShow size={20} />}
                </button>
              </div>
              {passwordError && <p className="text-error text-xs mt-1 ml-1">{passwordError}</p>}
            </div>

            <div className="md:col-span-2 mt-4">
              <button className="btn btn-primary w-full h-12 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all">
                Create Account
              </button>
            </div>
          </form>

          <div className="divider my-8 opacity-50">OR</div>

          <button 
            onClick={handleLoginWithGoogle} 
            className="btn btn-outline w-full h-12 rounded-xl border-base-300 hover:bg-base-200 group flex items-center justify-center gap-3"
          >
            <FcGoogle size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-base-content font-semibold">Sign up with Google</span>
          </button>

          <p className="mt-8 text-center text-base-content/60">
            Already have an account?{' '}
            <Link to={'/login'} className="text-primary font-bold hover:underline">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
