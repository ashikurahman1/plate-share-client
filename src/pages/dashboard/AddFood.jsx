import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCloudUploadAlt, FaUtensils, FaMapMarkerAlt, FaCalendarPlus, FaStickyNote } from 'react-icons/fa';

const AddFood = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleImageUpload = async () => {
    if (!image) return toast.error('Please select an image');

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        { method: 'POST', body: formData }
      );

      const data = await res.json();
      if (data.success) {
        setUrl(data.data.url);
        setPreview(data.data.thumb?.url || data.data.display_url || data.data.url);
        toast.success('Image uploaded!');
      }
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = async e => {
    e.preventDefault();
    if (!url) return toast.error('Please upload image first');

    setSubmitting(true);
    const form = e.target;
    const newFood = {
      food_name: form.food_name.value,
      food_image: url,
      food_img_thumb: preview,
      food_quantity: parseInt(form.food_quantity.value),
      location: form.location.value,
      expired_date: form.expireDate.value,
      additional_note: form.additionalNote.value,
      donor_email: user?.email,
      donor_name: user?.displayName,
      donor_image: user?.photoURL,
      food_status: 'Available',
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/foods', newFood);
      if (res.data.acknowledged) {
        toast.success('Food added to community!');
        navigate('/dashboard/manage-foods');
      }
    } catch (err) {
      toast.error('Error adding food');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-black italic mb-2">Share <span className="text-primary tracking-tighter">New Food</span></h1>
        <p className="text-base-content/60 font-medium">Help reduce waste by sharing your surplus food with neighbors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleAddFood} className="lg:col-span-12 space-y-8">
          <div className="bg-base-100 p-8 md:p-12 rounded-[3rem] shadow-xl border border-base-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Upload Area */}
              <div className="md:col-span-2">
                 <label className="label text-xs uppercase font-black tracking-widest opacity-40 mb-2">Food Image</label>
                 <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-base-200/50 rounded-[2rem] border-2 border-dashed border-base-300">
                    <div className="relative w-40 h-40 bg-base-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center border border-base-300">
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <FaCloudUploadAlt size={48} className="opacity-10" />
                      )}
                    </div>
                    <div className="flex-grow space-y-4">
                       <input 
                         type="file" 
                         onChange={e => setImage(e.target.files[0])}
                         className="file-input file-input-bordered w-full rounded-xl bg-base-100" 
                       />
                       <button 
                         type="button" 
                         onClick={handleImageUpload}
                         disabled={loading || !image}
                         className={`btn btn-primary w-full md:w-auto rounded-xl px-10 ${loading ? 'loading' : ''}`}
                       >
                         {url ? 'Change Image' : 'Upload to Cloud'}
                       </button>
                    </div>
                 </div>
              </div>

              {/* Basic Info */}
              <div className="form-control">
                <label className="label text-xs uppercase font-black tracking-widest opacity-40"><FaUtensils className="mr-2" /> Food Name</label>
                <input name="food_name" type="text" placeholder="e.g. Fresh Homemade Pasta" required className="input input-bordered rounded-2xl h-14 bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20" />
              </div>

              <div className="form-control">
                <label className="label text-xs uppercase font-black tracking-widest opacity-40"><FaUtensils className="mr-2" /> Quantity (People)</label>
                <input name="food_quantity" type="number" placeholder="How many servings?" required className="input input-bordered rounded-2xl h-14 bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20" />
              </div>

              <div className="form-control">
                <label className="label text-xs uppercase font-black tracking-widest opacity-40"><FaMapMarkerAlt className="mr-2" /> Pickup Location</label>
                <input name="location" type="text" placeholder="Your street or area" required className="input input-bordered rounded-2xl h-14 bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20" />
              </div>

              <div className="form-control">
                <label className="label text-xs uppercase font-black tracking-widest opacity-40"><FaCalendarPlus className="mr-2" /> Expiry Date</label>
                <input name="expireDate" type="date" required className="input input-bordered rounded-2xl h-14 bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20" />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label text-xs uppercase font-black tracking-widest opacity-40"><FaStickyNote className="mr-2" /> Additional Notes</label>
                <textarea name="additionalNote" rows={4} placeholder="Anything else the recipient should know?" className="textarea textarea-bordered rounded-[2rem] bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20 p-6" />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-base-200 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                 <div className="avatar">
                    <div className="w-12 h-12 rounded-2xl ring ring-primary/20 ring-offset-2 overflow-hidden">
                      <img src={user?.photoURL} alt="" />
                    </div>
                 </div>
                 <div>
                    <p className="text-sm font-black italic">Posting as {user?.displayName}</p>
                    <p className="text-[10px] uppercase opacity-40 font-bold">Community Member</p>
                 </div>
               </div>
               <button 
                type="submit" 
                disabled={!url || submitting}
                className="btn btn-primary btn-lg rounded-2xl px-12 text-white font-black shadow-xl shadow-primary/30 w-full md:w-auto"
               >
                 {submitting ? 'Sharing...' : 'Share with Community'}
               </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
