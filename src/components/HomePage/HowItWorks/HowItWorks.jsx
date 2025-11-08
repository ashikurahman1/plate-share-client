import { FaUtensils, FaSearch, FaHandHoldingHeart } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);
  const steps = [
    {
      id: 1,
      icon: <FaUtensils className="text-primary size-15 lg:size-20" />,
      title: 'Post Food',
      description:
        'Have extra meals or groceries? Simply post the details — name, description, quantity, and pickup location. Your shared food can make someone’s day!',
    },
    {
      id: 2,
      icon: <FaSearch className="text-primary size-15 lg:size-20" />,
      title: 'Find Food',
      description:
        'Browse available food shared by others in your community. Filter by location or food type to find what suits you best — all in a few clicks.',
    },
    {
      id: 3,
      icon: <FaHandHoldingHeart className="text-primary size-15 lg:size-20" />,
      title: 'Collect Food',
      description:
        'Once you’ve found what you need, contact the donor and arrange pickup. It’s safe, simple, and helps reduce food waste together.',
    },
  ];

  return (
    <section className="py-10 md:py-20">
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="container mx-auto px-4 text-center"
      >
        {/* Heading */}
        <div className="mb-15 flex flex-col items-center">
          <h2 className=" text-3xl md:text-5xl font-semibold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-neutral-500 italic max-w-xl mx-auto">
            PlateShare makes it easy to share food and connect with your
            community. Follow these simple steps to start helping and receiving
            today.
          </p>
        </div>

        <div className="grid gap-15 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {steps.map(step => (
            <div
              key={step.id}
              className="card bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-xl p-6  flex flex-col items-center text-center hover:scale-105"
            >
              <div className="mb-8">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-neutral-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
