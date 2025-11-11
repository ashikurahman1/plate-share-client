import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyFood = () => {
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/food-req/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
            setRequests(prev => prev.filter(req => req._id !== id));
          } else {
            Swal.fire('Failed!', 'Request could not be deleted.', 'error');
          }
        } catch (err) {
          console.error('Error deleting request:', err);
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
    });
  };

  if (loading) {
    return (
      <p className="text-center py-10 text-lg">Loading your requests...</p>
    );
  }

  return (
    <section className="py-10 container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Food Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th>#</th>
                <th>Food Name</th>
                <th>Donor Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{req.food_name}</td>
                  <td>{req.donor_email}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        req.status === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : req.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyFood;
