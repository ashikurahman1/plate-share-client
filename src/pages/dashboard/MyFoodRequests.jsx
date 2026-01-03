import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrashAlt, FaCalendarCheck, FaUserCircle, FaStore } from 'react-icons/fa';
import TableSkeleton from '../../components/Skeleton/TableSkeleton';

const MyFoodRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyRequests = async () => {
      try {
        const res = await axiosSecure.get(`/my-requests?email=${user.email}`);
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching my requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, [user?.email, axiosSecure]);

  const handleDelete = id => {
    // ... rest of handleDelete remains same
    Swal.fire({
      title: 'Cancel Request?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4d4d',
      confirmButtonText: 'Yes, cancel it!',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/food-req/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Cancelled!', 'Your request has been removed.', 'success');
            setRequests(prev => prev.filter(req => req._id !== id));
          }
        } catch (err) {
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
    });
  };

  return (
    <div className="animate-fade-in space-y-10">
      <div>
        <h1 className="text-4xl font-black italic mb-2">My Food <span className="text-primary italic">Requests .</span></h1>
        <p className="text-base-content/60 font-medium">Tracking the meals you've requested from the community.</p>
      </div>

      {loading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : (
        <div className="bg-base-100 rounded-[3rem] shadow-xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-lg w-full">
              <thead>
                <tr className="bg-base-200/50 text-base-content/40 font-black uppercase text-[10px] tracking-[0.2em]">
                  <th className="pl-10">Food & Status</th>
                  <th>Donor Information</th>
                  <th>Request Date</th>
                  <th className="pr-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-base-200/30 transition-colors">
                    <td className="pl-10 py-6">
                      <div className="flex flex-col gap-2">
                          <p className="font-black text-xl italic">{req.food_name}</p>
                          <div className="flex items-center gap-2">
                              <span className={`badge badge-sm border-none font-black rounded-lg px-3 py-2 ${
                                  req.status === 'Accepted' ? 'bg-green-500 text-white' : 
                                  req.status === 'Rejected' ? 'bg-error text-white' : 
                                  'bg-warning text-white'
                              }`}>
                                  {req.status}
                              </span>
                          </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                          <div className="avatar">
                              <div className="w-10 h-10 rounded-xl">
                                  <img src={req.donor_image} alt="" />
                              </div>
                          </div>
                          <div>
                              <p className="text-sm font-bold flex items-center gap-1"><FaUserCircle className="opacity-30" /> {req.donor_name}</p>
                              <p className="text-[10px] font-medium opacity-40">{req.donor_email}</p>
                          </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                          <p className="text-sm font-bold flex items-center gap-2"><FaCalendarCheck className="text-primary" /> {new Date(req.createdAt).toLocaleDateString()}</p>
                          <p className="text-[10px] font-black opacity-30 flex items-center gap-2 uppercase tracking-widest"><FaStore /> {req.req_location}</p>
                      </div>
                    </td>
                    <td className="pr-10 text-right">
                      <button 
                          onClick={() => handleDelete(req._id)}
                          className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-colors"
                          title="Cancel Request"
                      >
                          <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {requests.length === 0 && (
              <div className="py-20 text-center opacity-20 italic">
                  <FaStore size={64} className="mx-auto mb-4" />
                  <p className="text-xl font-black">No active requests</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequests;
