import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  const { user } = useAuth();
  useEffect(() => {
    fetch(`http://localhost:5100/api/foods?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFoods(data);
      });
  }, [user.email]);

  // Update

  const my_modal = useRef(null);
  // Open Modal
  const handleOpenModal = () => {
    my_modal.current.showModal();
  };
  // Close Modal

  const handleModalClose = () => {
    my_modal.current.close();
  };

  // Update
  const handleUpdate = async e => {
    e.preventDefault();

    const form = e.target;
    const updatedData = {
      food_name: form.food_name.value,
      location: form.location.value,
      food_quantity: form.quantity.value,
      food_status: form.status.value,
    };

    try {
      const res = await fetch(
        `http://localhost:5100/api/foods/${selectedFood._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'Updated!',
          text: 'Food details have been updated.',
          icon: 'success',
        });

        // Update foods state locally
        setFoods(
          foods.map(food =>
            food._id === selectedFood._id ? { ...food, ...updatedData } : food
          )
        );
        handleModalClose();
      } else {
        Swal.fire('Error', data.message, 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  // Delete
  const handleDelete = async _id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fea51c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5100/api/foods/${_id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your bid has been deleted.',
                icon: 'success',
              });

              //
              const remainingBids = foods.filter(food => food._id !== _id);
              setFoods(remainingBids);
            }
          });
      }
    });
  };
  return (
    <section className="py-15 px-4 container mx-auto">
      <h2 className="text-3xl lg:text-5xl font-semibold text-center mb-5">
        Manage my <span className="text-primary">foods</span>{' '}
        <span className="text-sm text-primary">({foods.length})</span>
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table min-w-[800px]">
          <thead>
            <tr>
              <th>SL</th>
              <th>Food name</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={index} className="">
                <td>{index + 1} </td>
                <td className="">{food?.food_name} </td>
                <td>
                  <img
                    src={food?.food_img_thumb}
                    alt={food?.food_name}
                    className="w-12 rounded-md"
                  />
                </td>
                <td>{food?.food_quantity} </td>
                <td>{food?.location} </td>
                <td className="">
                  <p
                    className={`badge badge-sm ${
                      food.food_status === 'Available'
                        ? 'badge-success'
                        : 'badge-info'
                    }`}
                  >
                    {food?.food_status}
                  </p>
                </td>
                <td className="md:space-x-2 lg:space-y-0 space-y-2">
                  <button
                    onClick={() => {
                      setSelectedFood(food);
                      handleOpenModal();
                    }}
                    className="btn btn-sm btn-primary text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(food?._id)}
                    className=" btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  */}
      <dialog
        ref={my_modal}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleUpdate} className="space-y-3">
            <div>
              <label>Food name: </label>
              <input
                name="food_name"
                type="text"
                placeholder="Name"
                defaultValue={selectedFood?.food_name || ''}
                className="input w-full mt-2"
              />
            </div>
            <div>
              <label>Pickup location:</label>
              <input
                name="location"
                type="text"
                placeholder="Location"
                defaultValue={selectedFood?.location || ''}
                className="input w-full mt-2"
              />
            </div>
            <div>
              <label>Food quantity:</label>
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                defaultValue={selectedFood?.food_quantity || ''}
                className="input w-full mt-2"
              />
            </div>
            <div>
              <label>Status</label>
              <select
                name="status"
                defaultValue={selectedFood?.food_status || 'Available'}
                className="select w-full"
              >
                <option value="Available">Available</option>
                <option value="Donated">Donated</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary text-white w-full">
              Update
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

export default ManageFoods;
