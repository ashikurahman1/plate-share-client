import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLeaf, FaHandsHelping, FaRecycle } from 'react-icons/fa';

const OurMission = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  const missions = [
    {
      id: 1,
      icon: <FaHandsHelping className="text-primary size-15 lg:size-20" />,
      title: 'Building Compassion',
      description:
        'We believe no food should go to waste while someone goes hungry. PlateShare connects generous donors with those in need — creating a circle of care within every community.',
    },
    {
      id: 2,
      icon: <FaRecycle className="text-primary size-15 lg:size-20" />,
      title: 'Reducing Food Waste',
      description:
        'Our goal is to minimize food waste by making it easy to donate surplus meals responsibly. Every shared plate contributes to a cleaner, more sustainable planet.',
    },
    {
      id: 3,
      icon: <FaLeaf className="text-primary size-15 lg:size-20" />,
      title: 'Empowering Communities',
      description:
        'PlateShare empowers individuals and local groups to make an impact together — fostering kindness, responsibility, and hope through food sharing.',
    },
  ];

  return (
    <section className="bg-base-200 py-10 md:py-20">
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="container mx-auto px-4 text-center"
      >
        {/* Heading */}
        <div className="mb-15 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Our <span className="text-primary">Mission</span>
          </h2>
          <p className="text-neutral-500 italic max-w-xl mx-auto">
            Together, we’re changing the way communities think about food — from
            waste to generosity, from hunger to hope.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-15 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {missions.map(mission => (
            <div
              key={mission.id}
              data-aos="zoom-in"
              className="card bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-xl p-6 flex flex-col items-center text-center hover:scale-105"
            >
              <div className="mb-8">{mission.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{mission.title}</h3>
              <p className="text-neutral-700">{mission.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
