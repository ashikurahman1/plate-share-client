import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import Loader from '../components/Loader/Loader';
import Card from '../components/Card/Card';

const AvailableFoods = () => {
  const loaderData = useLoaderData();
  const [availableFoods, setAvailableFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loaderData) {
      setAvailableFoods(loaderData);
      setLoading(false);
    }
  }, [loaderData]);

  if (loading) return <Loader />;
  return (
    <section className="py-15 container px-4 mx-auto">
      <h2 className="text-3xl md:text-5xl font-semibold text-center">
        Available <span className="text-primary">Foods</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-15 mt-10">
        {availableFoods.map(food => (
          <Card key={food?._id} food={food} />
        ))}
      </div>
    </section>
  );
};

export default AvailableFoods;
