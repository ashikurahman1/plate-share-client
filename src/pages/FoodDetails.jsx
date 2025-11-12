import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const FoodDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axiosSecure.get(`/foods/${id}`);
        setFood(res.data);
      } catch (error) {
        console.error('Error fetching food:', error);
      }
    };

    fetchFood();
  }, [axiosSecure, id]);

  const [requested, setRequested] = useState([]);
  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    location,
    expired_date,
    additional_note,
    donor_email,
    donor_name,
    donor_image,
    food_status,
  } = food;

  const my_modal = useRef(null);
  // Open Modal
  const handleOpenModal = () => {
    my_modal.current.showModal();
  };
  // Close Modal

  const handleModalClose = () => {
    my_modal.current.close();
  };

  // Handle  the food request

  const handleFoodRequest = async e => {
    e.preventDefault();
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
      food_id: _id,
      food_name,
      donor_email,
      donor_name,
      donor_image,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/food-req', reqFood);
      const result = res.data;
      if (result.acknowledged && result.insertedId) {
        toast.success('Thanks for requesting ');
      } else {
        toast.error('Failed to send req');
      }
    } catch (error) {
      toast.error('Internal Server error');
      console.error('Error posting food request:', error);
    }

    my_modal.current.close();
  };
  console.log(requested);

  useEffect(() => {
    if (!food._id) return;

    const fetchFoodReq = async () => {
      try {
        const res = await axiosSecure.get(`/food-req/${food._id}`);
        setRequested(res.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setRequested([]);
        } else {
          console.error('Error fetching food requests:', error);
        }
      }
    };

    fetchFoodReq();
  }, [axiosSecure, food]);

  const handleAccept = async (reqId, foodId) => {
    try {
      const res = await axiosSecure.patch(`/food-req/${reqId}`, {
        status: 'Accepted',
      });
      const result = res.data;

      if (result.success) {
        toast.success('Request accepted successfully');

        await axiosSecure.patch(`/foods/status/${foodId}`, {
          food_status: 'Donated',
        });

        const updatedRequests = await axiosSecure.get(`/food-req/${_id}`);
        setRequested(updatedRequests.data);
      } else {
        toast.error('Failed to accept request');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const handleReject = async reqId => {
    try {
      const res = await axiosSecure.patch(`/food-req/${reqId}`, {
        status: 'Rejected',
      });
      const result = res.data;

      if (result.success) {
        toast.success('Request rejected');

        const updatedRequests = await axiosSecure.get(`/food-req/${_id}`);
        setRequested(updatedRequests.data);
      } else {
        toast.error('Failed to reject request');
      }
    } catch (error) {
      console.error(error);
      toast.error('Internal Server Error');
    }
  };

  return (
    <section className="py-15 container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-10 p-5">
        {/* Left */}
        <div className="w-full lg:w-1/2 overflow-hidden shadow-md rounded-md p-5">
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-56 lg:h-80 object-cover rounded-md"
          />
          <div className="shadow-md rounded-md p-5 mt-10 flex flex-col md:flex-row items-center gap-5">
            <img
              src={donor_image}
              alt={donor_name}
              className="max-w-20 rounded-md min-h-20 object-cover"
            />
            <div className="">
              <h2 className="text-xl font-semibold">{donor_name}</h2>
              <p>{donor_email} </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-semibold">{food_name}</h2>
          <p className="badge badge-success my-3">{food_status} </p>

          <div className="shadow-lg p-5 ">
            <p className="font-semibold mt-2 text-xl">
              Serves {food_quantity} {food_quantity < 1 ? 'People' : "People's"}{' '}
            </p>
            <p className="text-xl font-semibold">
              Expired date: {expired_date}
            </p>
          </div>
          <div className="shadow-lg p-5 ">
            <p>
              <span className="font-semibold">Pickup Location: </span>{' '}
              {location}
            </p>
          </div>
          <div className="shadow-lg p-5 ">
            <p>Additional Note: {additional_note} </p>
          </div>

          <button
            onClick={handleOpenModal}
            className="btn btn-primary text-white  w-full text-lg mt-8"
          >
            Request Food
          </button>
        </div>
      </div>

      {/* Food Request Table */}
      {donor_email == user.email && (
        <div className="py-10 p-5">
          {requested && requested.length > 0 ? (
            <div className="overflow-x-auto">
              <h2 className="text-3xl font-semibold text-center mb-5">
                Total food request <span>({requested.length})</span>
              </h2>
              <table className="table">
                <thead>
                  <tr className="">
                    <td>SL</td>
                    <td>Name</td>
                    <td>email</td>
                    <td>Photo</td>
                    <td>Address</td>
                    <td>Contact</td>
                    <td>Why Need Food</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {requested.map((req, index) => (
                    <tr key={req._id}>
                      <td>{index + 1}</td>
                      <td>{req?.requester_name} </td>
                      <td>{req?.requester_email}</td>
                      <td>
                        <img
                          src={req?.requester_photo}
                          alt={req?.requester_name}
                          className="w-12"
                        />
                      </td>
                      <td>{req?.req_location}</td>
                      <td>{req?.req_contact}</td>
                      <td>{req?.why_need}</td>
                      <td className="flex flex-col md:flex-row gap-3">
                        {req.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => handleAccept(req._id, req.food_id)}
                              className="px-5 py-2 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() => handleReject(req._id)}
                              className="px-5 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              Reject
                            </button>
                          </>
                        ) : req.status === 'Accepted' ? (
                          <button
                            disabled
                            className="px-5 py-2 rounded-lg font-semibold bg-green-100 text-green-700 cursor-not-allowed border border-green-300"
                          >
                            Accepted
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-5 py-2 rounded-lg font-semibold bg-red-100 text-red-700 cursor-not-allowed border border-red-300"
                          >
                            Rejected
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No Request found for this Food</p>
          )}
        </div>
      )}

      {/* Modal */}
      <dialog
        ref={my_modal}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleFoodRequest} className="space-y-3">
            <input
              required
              name="req_location"
              type="text"
              placeholder="Your location"
              className="input w-full"
            />
            <textarea
              required
              name="why_need"
              rows={5}
              placeholder="Why need food ? give the reason"
              className="textarea w-full"
            />
            <input
              required
              name="req_contact"
              type="number"
              placeholder="Your contact number"
              className="input w-full"
            />
            <button type="submit" className="btn btn-primary text-white w-full">
              Submit Request
            </button>
          </form>
          <button
            onClick={handleModalClose}
            className="btn btn-error mt-5 w-full"
          >
            Close
          </button>
        </div>
      </dialog>
    </section>
  );
};

export default FoodDetails;
