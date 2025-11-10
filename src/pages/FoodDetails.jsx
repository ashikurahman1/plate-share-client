import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router';
import useAuth from '../hooks/useAuth';

const FoodDetails = () => {
  const food = useLoaderData();
  console.log(food);

  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    location,
    expired_date,
    additinal_note,
    donor_email,
    donor_name,
    donor_image,
    food_status,
  } = food;

  const { user } = useAuth();
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

  const handleFoodRequest = e => {
    e.preventDefault();
    const req_location = e.target.req_location.value;
    const why_need = e.target.why_need.value;
    const req_contact = e.target.req_contact.value;

    const reqFood = {
      req_location,
      why_need,
      req_contact,
      user_email: user?.email,
      user_name: user?.displayName,
      user_photoURL: user?.photoURL,
      status: 'Pending',
      // _id: id,
    };

    try {
      toast.success('Thanks for requesting ');
      console.log(reqFood);
    } catch (error) {
      toast.error('Send request failed');
      console.error(error);
    }

    my_modal.current.close();
  };

  return (
    <section className="py-15 container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-10 p-5">
        {/* Left */}
        <div className="w-full lg:w-1/2 overflow-hidden shadow-md rounded-md p-5">
          <img
            src={food_image}
            alt={food_name}
            className="w-full min-h-80 object-cover rounded-md"
          />
          <div className="shadow-md rounded-md p-5 mt-10 flex items-center gap-5">
            <img
              src={donor_image}
              alt={donor_name}
              className="max-w-20 rounded-md h-20 object-cover"
            />
            <div className="">
              <h2 className="text-xl font-semibold">{donor_name}</h2>
              <p>{donor_email} </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-semibold">{food_name}</h2>
          <p className="badge badge-error my-3">{food_status} </p>

          <div className="shadow-lg p-5 ">
            <p className="font-semibold mt-2 text-xl">
              Serves {food_quantity} {food_quantity < 1 ? 'People' : "People's"}{' '}
            </p>
            <p className="text-xl font-semibold">{expired_date}</p>
          </div>
          <div className="shadow-lg p-5 ">
            <p>
              <span className="font-semibold">Pickup Location: </span>{' '}
              {location}
            </p>
          </div>
          <div className="shadow-lg p-5 ">
            <p>Additional Note: {additinal_note} </p>
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

      {/* Food.addedBy == user এর ইমেইল মিললে এখানে টেবল টা দেখাবো  */}

      {/* Modal */}

      <dialog
        ref={my_modal}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleFoodRequest} className="space-y-3">
            <input
              name="req_location"
              type="text"
              placeholder="Your location"
              className="input w-full"
            />
            <textarea
              name="why_need"
              rows={5}
              placeholder="Why need food ? give the reason"
              className="textarea w-full"
            />
            <input
              name="req_contact"
              type="number"
              placeholder="Your contact number"
              className="input w-full"
            />
            <button type="submit" className="btn btn-primary text-white w-full">
              Submit Request
            </button>
          </form>
          <button onClick={handleModalClose} className="btn btn-error mt-5">
            Close
          </button>
        </div>
      </dialog>
    </section>
  );
};

export default FoodDetails;
