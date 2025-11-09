import React from 'react';
import useAuth from '../hooks/useAuth';

const AddFood = () => {
  const { user } = useAuth();
  return (
    <div className="py-15 container mx-auto ">
      <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-center">
        Add your <span className="text-primary">Food</span>
      </h2>
      <div className="bg-white max-w-2xl mx-3 md:mx-auto border border-neutral-300 rounded-md shadow-md my-8 p-4 md:p-6">
        <form className="space-y-3">
          <div>
            <label>Food Name :</label>
            <input
              type="text"
              className="input w-full mt-2"
              placeholder="Add food name"
            />
          </div>
          <div className="border gap-2 border-neutral-300 p-3 rounded-md flex">
            <div className="flex flex-col space-y-3">
              <label className="block">Upload Food Image :</label>
              <input
                type="file"
                className=" file-input file-input-sm md:file-input-md file-input-warning"
                placeholder="Food Name"
              />
              <button className="btn btn-sm md:btn-md btn-info">
                Upload Image
              </button>
            </div>
            <div className="border border-neutral-300 rounded-md p-2 max-w-40 h-30 flex-1 md:ml-20 ">
              <img src="" alt="Image Preview" className="object-cover" />
            </div>
          </div>
          <div>
            <label className="">Food Quantity :</label>
            <input
              type="number"
              placeholder='(e.g., "Serves 2 people")'
              className="input w-full mt-2"
            />
          </div>
          <div>
            <label className="">Location :</label>
            <input
              type="text"
              placeholder="Add your full location"
              className="input w-full mt-2"
            />
          </div>
          <div>
            <label className="">Expire Date :</label>
            <input
              type="date"
              placeholder="Expire date"
              className="input w-full mt-2"
            />
          </div>
          <div>
            <label className="">Additional Notes :</label>
            <textarea
              rows={5}
              placeholder="Additional notes"
              className="textarea w-full mt-2"
            />
          </div>
          <div className="bg-gray-200 p-3">
            <h3 className="text-lg font-semibold mb-3">Donator's Info</h3>
            <div className="flex justify-between gap-3">
              <div className="flex-1">
                <input
                  disabled
                  type="text"
                  defaultValue={user?.displayName}
                  className="input w-full mb-3"
                />
                <input
                  disabled
                  type="email"
                  defaultValue={user?.email}
                  className="input w-full mb-3"
                />
              </div>
              <div>
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>

          <button className="btn btn-primary text-white w-full mt-5">
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
