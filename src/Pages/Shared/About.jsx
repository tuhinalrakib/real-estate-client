import React from 'react';
import { FaHome, FaUsers, FaAward } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import CountUp from 'react-countup';

const About = () => {
  const { theme } = useAuth()
  return (
    <section className="bg-secondary/5  py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">About Our Real Estate Agency</h2>
          <p className={`${theme === "dark" ? "text-white/70" : "text-black/50"} max-w-2xl mx-auto`}>
            We help people find their dream homes with trust, transparency, and top-notch services. 
            Our dedicated team ensures that every client finds the perfect property.
          </p>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div>
            <img 
              src="/real-estate-office.jpg" 
              alt="Real Estate Office" 
              className="rounded-lg shadow-lg w-full object-cover" 
              loading="lazy"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className={`${theme == "dark" ? "text-white/70" : "text-black/50"}`}>
              To provide seamless real estate experiences for buyers, sellers, and renters by 
              combining innovation, expertise, and personalized service.
            </p>

            <h3 className="text-2xl font-semibold">Why Choose Us</h3>
            <p className={`${theme === "dark" ? "text-white/70" : "text-black/50"}`}>
              We focus on client satisfaction, market knowledge, and reliable support from start 
              to finish. Your trust is our biggest achievement.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-md">
                <FaHome className="text-3xl text-primary mx-auto mb-2" />
                <h4 className="font-bold text-xl">
                <CountUp end={500} duration={4.5}/>+</h4>
                <p className={`${theme === "dark" ? "text-white/70" : "text-black/50"} text-sm`}>Properties Sold</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-md">
                <FaUsers className="text-3xl text-primary mx-auto mb-2" />
                <h4 className="font-bold text-xl"><CountUp end={300} duration={4.5}/>+</h4>
                <p className="text-black/50text-sm">Happy Clients</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-md">
                <FaAward className="text-3xl text-primary mx-auto mb-2" />
                <h4 className="font-bold text-xl"><CountUp end={10} duration={6.5}/></h4>
                <p className={`${theme === "dark" ? "text-white/70" : "text-black/50"} text-sm`}>Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
