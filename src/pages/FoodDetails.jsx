import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Card from '../components/Card/Card';

const DetailsSkeleton = () => (
  <div className="min-h-screen pt-28 pb-20 animate-pulse bg-base-200/30">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-base-300 h-[500px] rounded-[3rem]"></div>
          <div className="bg-base-100 p-8 rounded-[3rem] space-y-6">
            <div className="h-16 bg-base-300 rounded-2xl w-3/4"></div>
            <div className="flex gap-4">
              <div className="h-12 bg-base-300 rounded-2xl w-32"></div>
              <div className="h-12 bg-base-300 rounded-2xl w-32"></div>
              <div className="h-12 bg-base-300 rounded-2xl w-32"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-base-100 p-8 rounded-[3rem] h-[300px] space-y-6">
            <div className="h-4 bg-base-300 rounded w-1/4"></div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-base-300 rounded-3xl"></div>
              <div className="space-y-2 flex-grow">
                <div className="h-6 bg-base-300 rounded w-1/2"></div>
                <div className="h-4 bg-base-300 rounded w-3/4"></div>
              </div>
            </div>
            <div className="h-16 bg-base-300 rounded-2xl w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FoodDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [food, setFood] = useState(null);
  const [relatedFoods, setRelatedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const my_modal = useRef(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axiosSecure.get(`/foods/${id}`);
        setFood(res.data);
        
        // Fetch related foods (same location or just other available)
        const allFoodsRes = await axiosSecure.get('/foods/availables');
        const related = allFoodsRes.data
          .filter(f => f._id !== id)
          .slice(0, 3);
        setRelatedFoods(related);
      } catch (error) {
        console.error('Error fetching food:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
    window.scrollTo(0, 0);
  }, [axiosSecure, id]);

  if (loading) return <DetailsSkeleton />;

  if (!food) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <FaExclamationTriangle size={64} className="text-error opacity-20" />
      <h2 className="text-3xl font-black">Food item not found</h2>
      <Link to="/available-foods" className="btn btn-primary">Back to Explore</Link>
    </div>
  );

  const handleFoodRequest = async e => {
    e.preventDefault();
    if (!user) return toast.error('Please login to request food');

    const req_location = e.target.req_location.value;
    const why_need = e.target.why_need.value;
    const req_contact = e.target.req_contact.value;

    const reqFood = {
      req_location,
      why_need,
      req_contact,
      requester_email: user?.email,
      requester_name: user?.displayName,
      requester_photo: user?.photoURL,
      status: 'Pending',
      food_id: food._id,
      food_name: food.food_name,
      donor_email: food.donor_email,
      donor_name: food.donor_name,
      donor_image: food.donor_image,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/food-req', reqFood);
      if (res.data.acknowledged) {
        toast.success('Food requested successfully!');
        my_modal.current.close();
      }
    } catch (error) {
      toast.error('Failed to send request');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-base-200/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header & Image */}
            <div className="bg-base-100 rounded-[3rem] overflow-hidden shadow-2xl border border-base-200">
              <div className="relative h-[400px] md:h-[500px]">
                <img src={food.food_image} alt={food.food_name} className="w-full h-full object-cover" />
                <div className="absolute top-8 right-8">
                  <span className="badge badge-lg bg-primary border-none text-white font-black px-6 py-5 rounded-2xl shadow-xl">
                    {food.food_status}
                  </span>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight italic">{food.food_name} <span className="text-primary">.</span></h1>
                
                <div className="flex flex-wrap gap-6 mb-10">
                  <div className="flex items-center gap-3 bg-base-200/50 px-5 py-3 rounded-2xl">
                    <FaMapMarkerAlt className="text-primary text-xl" />
                    <span className="font-bold">{food.location}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-base-200/50 px-5 py-3 rounded-2xl">
                    <FaClock className="text-secondary text-xl" />
                    <span className="font-bold">Serves {food.food_quantity} People</span>
                  </div>
                  <div className="flex items-center gap-3 bg-base-200/50 px-5 py-3 rounded-2xl">
                    <FaCalendarAlt className="text-accent text-xl" />
                    <span className="font-bold">Expires: {food.expired_date}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-base-content/70">
                  <h3 className="text-2xl font-black text-base-content mb-4 italic">Description</h3>
                  <p className="leading-relaxed font-medium">
                    {food.additional_note || "No additional notes provided for this item."}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Items */}
            <div>
              <h3 className="text-3xl font-black mb-8 italic px-4">Suggested Items <span className="text-primary italic">.</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedFoods.map(f => (
                  <Card key={f._id} food={f} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Donor Card */}
            <div className="bg-base-100 p-8 rounded-[3rem] shadow-xl border border-base-200">
              <h4 className="text-xs uppercase font-black tracking-widest opacity-40 mb-6">Food Donor</h4>
              <div className="flex items-center gap-4 mb-8">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-3xl ring ring-primary ring-offset-base-100 ring-offset-4">
                    <img src={food.donor_image} alt={food.donor_name} />
                  </div>
                </div>
                <div>
                  <h5 className="text-xl font-black">{food.donor_name}</h5>
                  <p className="text-sm opacity-60 font-medium">{food.donor_email}</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-base-200">
                {user ? (
                   food.donor_email === user.email ? (
                    <Link to="/dashboard/manage-foods" className="btn btn-neutral w-full rounded-2xl text-lg font-bold">Manage This Listing</Link>
                  ) : (
                    <button onClick={() => my_modal.current.showModal()} className="btn btn-primary w-full h-16 rounded-2xl text-lg text-white font-black shadow-lg shadow-primary/20">
                      Request This Food
                    </button>
                  )
                ) : (
                  <Link to="/login" className="btn btn-primary w-full h-16 rounded-2xl text-lg text-white font-black">Login to Request</Link>
                )}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-neutral text-neutral-content p-8 rounded-[3rem] shadow-xl">
              <h4 className="text-xl font-black mb-4 italic">Safety First <span className="text-primary italic">!</span></h4>
              <ul className="space-y-4 opacity-70 font-medium text-sm leading-relaxed">
                <li className="flex gap-3"><FaCheckCircle className="text-primary shrink-0 mt-1" /> Inspect food quality on arrival</li>
                <li className="flex gap-3"><FaCheckCircle className="text-primary shrink-0 mt-1" /> Check for any unusual smells</li>
                <li className="flex gap-3"><FaCheckCircle className="text-primary shrink-0 mt-1" /> Coordinate in a public place</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      <dialog ref={my_modal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[3rem] p-10 bg-base-100 border border-base-200">
          <h3 className="text-3xl font-black mb-8 italic">Request <span className="text-primary italic">Food .</span></h3>
          <form onSubmit={handleFoodRequest} className="space-y-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Your Location</span></label>
              <input name="req_location" type="text" placeholder="e.g. 123 Street, City" required className="input input-bordered w-full rounded-2xl" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Why do you need this?</span></label>
              <textarea name="why_need" rows={4} placeholder="Briefly explain the reason..." required className="textarea textarea-bordered w-full rounded-2xl" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Contact Number</span></label>
              <input name="req_contact" type="tel" placeholder="Your direct phone" required className="input input-bordered w-full rounded-2xl" />
            </div>
            
            <div className="pt-4 flex flex-col gap-3">
              <button type="submit" className="btn btn-primary h-14 rounded-2xl text-white font-black">Submit Request</button>
              <button type="button" onClick={() => my_modal.current.close()} className="btn btn-ghost rounded-2xl opacity-60">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default FoodDetails;
