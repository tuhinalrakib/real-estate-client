import React from "react";
import { motion } from "framer-motion";
import Benefits1 from "../../assets/Benifits/Benefits1.jpg";
import Benefits2 from "../../assets/Benifits/Benefits2.jpg";
import Benefits3 from "../../assets/Benifits/Benefits3.jpg";

const benefits = [
  {
    id: 1,
    title: "Verified Listings",
    image: Benefits1,
    description:
      "All properties go through strict verification by our admin team to ensure trust and transparency.",
  },
  {
    id: 2,
    title: "Easy Offer System",
    image: Benefits2,
    description:
      "Make offers directly to agents and track your property status from pending to purchased easily.",
  },
  {
    id: 3,
    title: "Agent Transparency",
    image: Benefits3,
    description:
      "See agent details, reviews, and avoid frauds. Only trusted agents can add properties.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="my-5 ">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-purple-700"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Benefits of Working With Us
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-3">
        {benefits.map(({ id, title, image, description }, index) => (
          <div
            data-aos ="flip-left"
            key={id}
            className="bg-white/50 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={image}
              alt={title}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-purple-200"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
