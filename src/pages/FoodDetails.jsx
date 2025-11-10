import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const FoodDetails = () => {
  const { user } = useState(null);
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
      _id: id,
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
    <section className="py-10 container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-10 border p-5">
        {/* Left */}
        <div className="border">
          <img src="hfssj" alt="Food Image" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-semibold">Food name</h2>
          <p className="badge badge-error">Status</p>

          <div className="shadow-lg p-5 border">
            <p className="text-xl font-semibold mb-3">Served {2} People</p>
            <p className="text-xl font-semibold">Expired Dates</p>
          </div>
          <div className="shadow-lg p-5 border">
            <p>
              <span className="font-semibold">Pickup Location: </span> Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Dolores, nisi
              aperiam saepe vero perferendis incidunt rerum laboriosam magni,
              accusamus sunt id earum provident alias fugit enim aliquid.
              Aperiam, minima deleniti.
            </p>
          </div>
          <div className="shadow-lg p-5 border">
            <p>Additional Note: </p>
          </div>

          <button
            onClick={handleOpenModal}
            className="btn btn-primary text-white  w-full text-lg"
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
