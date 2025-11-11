import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch(`http://localhost:5100/api/foods?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFoods(data);
      });
  }, [user.email]);

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
              <tr>
                <td>{index + 1} </td>
                <td className="">{food?.food_name} </td>
                <td>
                  <img
                    src={food?.food_img_thumb}
                    alt={food?.food_name}
                    className="w-15"
                  />
                </td>
                <td>{food?.food_quantity} </td>
                <td>{food?.location} </td>
                <td>{food?.food_status} </td>
                <td>
                  <button className="btn btn-sm btn-primary text-white">
                    Update
                  </button>
                  <button className="ml-3 btn btn-sm btn-error text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageFoods;
