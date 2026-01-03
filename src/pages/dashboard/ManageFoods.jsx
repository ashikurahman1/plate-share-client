import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEdit, FaTrashAlt, FaMapMarkerAlt, FaUsers, FaHistory } from 'react-icons/fa';
import TableSkeleton from '../../components/Skeleton/TableSkeleton';

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const my_modal = useRef(null);

  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/foods?email=${user.email}`).then(data => {
      setFoods(data.data);
    }).finally(() => setLoading(false));
  }, [user, axiosSecure]);

  const handleUpdate = async e => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      food_name: form.food_name.value,
      location: form.location.value,
      food_quantity: parseInt(form.quantity.value),
      food_status: form.status.value,
    };

    try {
      await axiosSecure.patch(`/foods/${selectedFood._id}`, updatedData);
      Swal.fire({ title: 'Updated!', icon: 'success' });
      setFoods(foods.map(food => food._id === selectedFood._id ? { ...food, ...updatedData } : food));
      my_modal.current.close();
    } catch (error) {
      Swal.fire('Error', 'Update failed', 'error');
    }
  };

  const handleDelete = async _id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This item will be removed from community listings.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#ff4d4d',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/foods/${_id}`);
          if (res.data.deletedCount) {
            Swal.fire({ title: 'Deleted!', icon: 'success' });
            setFoods(foods.filter(food => food._id !== _id));
          }
        } catch (error) {
          Swal.fire('Error', 'Deletion failed', 'error');
        }
      }
    });
  };

  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic mb-2">Manage <span className="text-primary italic">My Foods .</span></h1>
          <p className="text-base-content/60 font-medium">You have shared {foods.length} items with the community.</p>
        </div>
        <div className="flex bg-base-100 p-2 rounded-2xl border border-base-300 shadow-sm">
           <div className="px-4 py-2 border-r border-base-200 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-black uppercase">Active: {foods.filter(f => f.food_status === 'Available').length}</span>
           </div>
           <div className="px-4 py-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="text-xs font-black uppercase">Donated: {foods.filter(f => f.food_status === 'Donated').length}</span>
           </div>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : (
        <div className="bg-base-100 rounded-[3rem] shadow-xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-lg w-full">
              <thead>
                <tr className="bg-base-200/50 text-base-content/40 font-black uppercase text-[10px] tracking-[0.2em]">
                  <th className="pl-10">Food Details</th>
                  <th>Status</th>
                  <th>Pickup Details</th>
                  <th className="pr-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food._id} className="hover:bg-base-200/30 transition-colors">
                    <td className="pl-10 py-6">
                      <div className="flex items-center gap-4">
                          <div className="avatar">
                              <div className="w-16 h-16 rounded-2xl">
                                  <img src={food.food_img_thumb} alt="" />
                              </div>
                          </div>
                          <div>
                              <p className="font-black text-lg italic">{food.food_name}</p>
                              <p className="text-xs font-bold opacity-40 flex items-center gap-1"><FaUsers /> Serves {food.food_quantity}</p>
                          </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-md border-none font-black rounded-lg px-4 py-3 ${food.food_status === 'Available' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                        {food.food_status}
                      </span>
                    </td>
                    <td>
                      <div className="space-y-1">
                          <p className="text-sm font-bold flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> {food.location}</p>
                          <p className="text-[10px] font-black opacity-30 flex items-center gap-2 uppercase tracking-widest"><FaHistory /> Added on {new Date(food.createdAt || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="pr-10 text-right">
                      <div className="flex justify-end gap-2">
                          <button 
                              onClick={() => { setSelectedFood(food); my_modal.current.showModal(); }}
                              className="btn btn-ghost btn-circle hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                              <FaEdit size={18} />
                          </button>
                          <button 
                              onClick={() => handleDelete(food._id)}
                              className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-colors"
                          >
                              <FaTrashAlt size={18} />
                          </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {foods.length === 0 && (
              <div className="py-20 text-center opacity-20 italic">
                  <FaUsers size={64} className="mx-auto mb-4" />
                  <p className="text-xl font-black">No foods shared yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Update Modal */}
      <dialog ref={my_modal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[3rem] p-10 bg-base-100 border border-base-200">
          <h3 className="text-3xl font-black mb-8 italic">Update <span className="text-primary italic">Listing .</span></h3>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Food name</span></label>
              <input name="food_name" type="text" defaultValue={selectedFood?.food_name} className="input input-bordered rounded-2xl" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Location</span></label>
              <input name="location" type="text" defaultValue={selectedFood?.location} className="input input-bordered rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Quantity</span></label>
                    <input name="quantity" type="number" defaultValue={selectedFood?.food_quantity} className="input input-bordered rounded-2xl" />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Status</span></label>
                    <select name="status" defaultValue={selectedFood?.food_status} className="select hide-arrow select-bordered rounded-2xl font-bold">
                        <option value="Available">Available</option>
                        <option value="Donated">Donated</option>
                    </select>
                </div>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <button type="submit" className="btn btn-primary h-14 rounded-2xl text-white font-black">Save Changes</button>
              <button type="button" onClick={() => my_modal.current.close()} className="btn btn-ghost rounded-2xl opacity-60">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageFoods;
