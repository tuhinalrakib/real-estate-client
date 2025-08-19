// src/components/SalesPromotion.jsx
import React from "react";
import { motion } from "framer-motion";

const promotions = [
  {
    id: 1,
    title: "Summer Discount Offer",
    description: "Get up to 20% off on selected properties this summer!",
    image: "/images/promo1.jpg",
    cta: "Explore Now",
  },
  {
    id: 2,
    title: "Luxury Homes Sale",
    description: "Premium properties with exclusive deals for limited time.",
    image: "/images/promo2.jpg",
    cta: "View Deals",
  },
  {
    id: 3,
    title: "New Listings Alert",
    description: "Be the first to book your dream property with special prices.",
    image: "/images/promo3.jpg",
    cta: "Check Now",
  },
];

const SalesPromotion = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <motion.h2
        className="text-4xl font-extrabold text-center mb-10 text-purple-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hot Sales & Promotions
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {promotions.map((promo, index) => (
          <motion.div
            key={promo.id}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Background Image */}
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-64 object-cover brightness-90 group-hover:brightness-75 transition-all"
              
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {promo.title}
              </h3>
              <p className="text-sm md:text-base text-gray-200 mb-4">
                {promo.description}
              </p>
              <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 transition">
                {promo.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SalesPromotion;
