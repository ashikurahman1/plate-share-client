import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const MyFood = () => {
  const { user } = useAuth();

  useEffect(() => {
    try {
      fetch(`http://localhost:5100/api/foods?email=${user?.email}`)
        .then(res => res.json())
        .then(foods => console.log(foods));
    } catch (error) {
      console.error(error);
    }
  }, [user?.email]);
  console.log();

  return (
    <section className="py-15 mx-auto container">
      <h2>My food requests</h2>
      <div>{}</div>
    </section>
  );
};

export default MyFood;
