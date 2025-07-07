import React from 'react';
import Benefits1 from "../../assets/Benifits/Benefits1.jpg"
import Benefits2 from "../../assets/Benifits/Benefits2.jpg"
import Benefits3 from "../../assets/Benifits/Benefits3.jpg"

const benefits = [
  {
    id: 1,
    title: 'Verified Listings',
    image: Benefits1,
    description: 'All properties go through strict verification by our admin team to ensure trust and transparency.',
  },
  {
    id: 2,
    title: 'Easy Offer System',
    image: Benefits2,
    description: 'Make offers directly to agents and track your property status from pending to purchased easily.',
  },
  {
    id: 3,
    title: 'Agent Transparency',
    image: Benefits3,
    description: 'See agent details, reviews, and avoid frauds. Only trusted agents can add properties.',
  },
];

const BenefitsSection = () => {
  return (
    <div data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      className="my-10 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Benefits for with us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map(({ id, title, image, description }) => (
          <div key={id} className="card bg-base-100 shadow-xl p-6">
            <img src={image} alt={title} className="w-24 h-24 mx-auto mb-4" />
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
