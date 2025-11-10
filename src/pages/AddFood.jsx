import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const AddFood = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!image) {
      toast.error('Please upload an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setPreview(data.data?.thumb?.url);
        setUrl(data.data.url);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Upload failed');
      }
    } catch (err) {
      toast.error('Upload failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = e => {
    e.preventDefault();

    console.log();

    if (!image) {
      toast.error('Please upload the food Image');
      return;
    }

    const form = e.target;

    const newFood = {
      food_name: form.food_name.value,
      food_image: url,
      food_quantity: form.food_quantity.value,
      location: form.location.value,
      expired_date: form.expireDate.value,
      additinal_note: form.addionalNotes.value,
      food_addedBy: user?.email,
      owner_name: user?.displayName,
      owner_image: user?.photoURL,
      food_status: 'Available',
    };

    console.log(newFood);
  };

  return (
    <div className="py-15 container mx-auto ">
      <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-center">
        Add your <span className="text-primary">Food</span>
      </h2>
      <div className="bg-white max-w-2xl mx-3 md:mx-auto border border-neutral-300 rounded-md shadow-md my-8 p-4 md:p-6">
        <form onSubmit={handleAddFood} className="space-y-3">
          <div>
            <label>Food Name :</label>
            <input
              required
              name="food_name"
              type="text"
              className="input w-full mt-2"
              placeholder="Add food name"
            />
          </div>
          <div className="border gap-2 border-neutral-300 p-3 rounded-md flex">
            <div className="flex flex-col space-y-3">
              <label className="block">Upload Food Image :</label>
              <input
                required
                type="file"
                className=" file-input file-input-sm md:file-input-md file-input-warning"
                placeholder="Food Name"
                onChange={e => setImage(e.target.files[0])}
              />
              <button
                type="button"
                onClick={() => handleImageUpload()}
                className={`btn btn-sm md:btn-md btn-info ${
                  loading && 'btn-disabled'
                }`}
              >
                {loading ? 'Uploading..' : 'Upload'}
              </button>
            </div>
            <div className="border border-neutral-300 rounded-md p-2 max-w-40 h-30 flex-1 md:ml-20 overflow-hidden">
              {preview && (
                <img
                  src={preview}
                  alt="Image Preview"
                  className="object-cover"
                />
              )}
            </div>
          </div>
          <div>
            <label className="">Food Quantity :</label>
            <input
              required
              name="food_quantity"
              type="number"
              placeholder='(e.g., "Serves 2 people")'
              className="input w-full mt-2"
            />
          </div>
          <div>
            <label className="">Location :</label>
            <input
              required
              name="location"
              type="text"
              placeholder="Add your full location"
              className="input w-full mt-2"
            />
          </div>
          <div>
            <label className="">Expire Date :</label>
            <input
              required
              name="expireDate"
              type="date"
              placeholder="Expire date"
              className="input w-full mt-2"
            />
          </div>
          <div>
            <label className="">Additional Notes :</label>
            <textarea
              name="addionalNotes"
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
