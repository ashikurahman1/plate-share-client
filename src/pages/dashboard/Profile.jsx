import React, { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEdit, FaEnvelope, FaUserTag, FaCalendarAlt, FaPhone, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, dbUser, fetchDbUser } = useAuth();
  console.log(dbUser);
  
  const axiosSecure = useAxiosSecure();
  const edit_modal = useRef(null);
  const [updating, setUpdating] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;

    try {
      await axiosSecure.patch(`/users/${user.email}`, { displayName: name, phone });
      await fetchDbUser(user);
      toast.success('Profile updated successfully!');
      edit_modal.current.close();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="relative h-60 bg-gradient-to-r from-primary to-secondary rounded-[3rem] shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -bottom-12 left-12">
          <div className="avatar ring ring-base-100 ring-offset-base-100 ring-offset-2 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="w-40 h-40">
              <img src={user?.photoURL || 'https://i.pravatar.cc/150'} alt="Profile" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-12 px-12 bg-base-100 rounded-[3rem] shadow-xl border border-base-200">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black italic mb-2">{dbUser?.name || user?.displayName}</h1>
            <p className="badge badge-primary badge-lg font-bold rounded-xl px-4 py-3 shadow-lg shadow-primary/20 italic uppercase">
              {dbUser?.role || 'Member'}
            </p>
          </div>
          <button onClick={() => edit_modal.current.showModal()} className="btn btn-outline border-base-300 rounded-2xl gap-2 font-bold px-6">
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-base-200/50 rounded-3xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black opacity-40">Email Address</p>
                <p className="font-bold">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-sm">
                <FaPhone />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black opacity-40">Phone Number</p>
                <p className="font-bold">{dbUser?.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                <FaCalendarAlt />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black opacity-40">Member Since</p>
                <p className="font-bold">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-primary/5 rounded-3xl flex flex-col justify-center items-center text-center space-y-4">
            <div className="text-6xl font-black text-primary">
              {dbUser?.role === 'admin' ? '🛡️' : '0'}
            </div>
            <h4 className="text-xl font-bold italic">
              {dbUser?.role === 'admin' ? 'Admin Access' : 'Impact Badges'}
            </h4>
            <p className="text-sm opacity-60 max-w-[200px]">
              {dbUser?.role === 'admin' ? 'Full platform control enabled.' : 'Keep sharing food to earn your first community badge!'}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <dialog ref={edit_modal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[3rem] p-10 bg-base-100 border border-base-200">
          <h3 className="text-3xl font-black mb-8 italic">Edit <span className="text-primary italic">Profile .</span></h3>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Display Name</span></label>
              <input name="name" type="text" defaultValue={dbUser?.displayName || user?.displayName} className="input input-bordered rounded-2xl h-14 bg-base-200/30 border-none px-6" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Phone Number</span></label>
              <input name="phone" type="tel" defaultValue={dbUser?.phone} placeholder="e.g. +1 234 567 890" className="input input-bordered rounded-2xl h-14 bg-base-200/30 border-none px-6" />
            </div>
            
            <div className="pt-4 flex flex-col gap-3">
              <button type="submit" disabled={updating} className="btn btn-primary h-14 rounded-2xl text-white font-black">
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => edit_modal.current.close()} className="btn btn-ghost rounded-2xl opacity-60">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
