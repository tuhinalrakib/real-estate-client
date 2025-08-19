import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Loader from "../../components/Loader/Loader";
import useUserRole from "../../Hooks/useUserRole";
import { motion } from "framer-motion";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const role = useUserRole();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents/verified");
      return res.data;
    },
  });

  // Filter by search
  const filtered = useMemo(
    () =>
      properties.filter((p) =>
        p.location.toLowerCase().includes(search.toLowerCase())
      ),
    [properties, search]
  );

  // Sort by priceMin
  const sortedProperties = useMemo(() => {
    return [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.priceMin - b.priceMin : b.priceMin - a.priceMin
    );
  }, [filtered, sortOrder]);

  if (isLoading) return <Loader />;

  return (
    <section
      data-aos="flip-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1500"
      className="max-w-7xl mx-auto px-4 py-12"
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl font-extrabold mb-10 text-center text-purple-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        All Verified Properties
      </motion.h2>

      {/* 🔍 Search & Sorting */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:max-w-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Sort by Price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {sortedProperties.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ❌ No properties found for "
          <span className="font-semibold">{search}</span>"
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((property, index) => (
            <motion.div
              key={property._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image */}
              <figure className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Verified
                </span>
              </figure>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-1 text-gray-800 line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">📍 {property.location}</p>

                {/* Agent info */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={property.agentImage || "/default-avatar.png"}
                    alt="Agent"
                    className="w-9 h-9 rounded-full border"
                  />
                  <p className="text-sm text-gray-700 font-medium">
                    {property.agentName}
                  </p>
                </div>

                {/* Price & status */}
                <div className="mt-2 text-sm space-y-1">
                  <p>
                    💲 <strong>{property.priceMin}</strong> -{" "}
                    <strong>{property.priceMax}</strong>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600 font-semibold">
                      {property.status}
                    </span>
                  </p>
                </div>

                {/* Button */}
                <div className="mt-5 flex justify-end">
                  <Link to={`/property/${property._id}`} className="mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-5 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold shadow-md hover:bg-purple-700 transition-all"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProperties;
