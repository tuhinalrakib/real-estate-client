import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loader from "../../components/Loader/Loader";
import { motion } from "framer-motion";

const Advertisement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/agents/verified");
        const all = res.data || [];

        const advertised = all.filter((item) => item.advertised === true);

        if (advertised.length >= 4) {
          setProperties(advertised.slice(0, 4));
        } else {
          const notAdvertised = all.filter((item) => !item.advertised);
          const remaining = 4 - advertised.length;
          const additional = notAdvertised.slice(0, remaining);
          setProperties([...advertised, ...additional]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [axiosInstance]);

  if (loading) return <Loader />;
  if (properties.length === 0) return null;

  return (
    <section className="my-14 px-4 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.h2
        className="text-4xl font-extrabold text-center mb-10 text-purple-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Featured Advertisements
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={property._id}
            className="bg-white/60 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Image */}
            <figure className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="h-52 w-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {property.status}
              </span>
            </figure>

            {/* Card Body */}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
                {property.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                📍 {property.location}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                💲 {property.priceMin} - {property.priceMax}
              </p>

              <div className="mt-4 flex justify-end">
                <Link to={`/property/${property._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold shadow-md hover:bg-purple-700 transition-all"
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Advertisement;
