import React from "react";
import { FaUserPlus, FaSearch, FaUserTie, FaHandshake, FaKey } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  { icon: <FaUserPlus size={28} className="text-white" />, title: "Sign Up" },
  { icon: <FaSearch size={28} className="text-white" />, title: "Search" },
  { icon: <FaUserTie size={28} className="text-white" />, title: "House Visit" },
  { icon: <FaHandshake size={28} className="text-white" />, title: "Contract Deal" },
  { icon: <FaKey size={28} className="text-white" />, title: "Key Hand Over" },
];

const HowItWorks = () => {
  return (
    <section className="my-16 px-4 py-12 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>

      <div className="flex flex-wrap justify-center items-start gap-8 md:gap-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            {/* Icon Circle */}
            <div className="bg-green-500 w-20 h-20 flex items-center justify-center rounded-full shadow-lg hover:shadow-2xl transition-all duration-300">
              {step.icon}
            </div>

            {/* Title */}
            <p className="mt-3 font-medium text-gray-800 text-center">{step.title}</p>

            {/* Dashed connector line */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute right-[-8rem] top-1/2 w-32 h-0 border-t-2 border-dashed border-green-500"></div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile Connector Lines */}
      <div className="flex md:hidden justify-center items-center mt-8 gap-4">
        {steps.slice(0, steps.length - 1).map((_, index) => (
          <div
            key={index}
            className="w-12 h-0.5 bg-green-500 rounded-full"
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
