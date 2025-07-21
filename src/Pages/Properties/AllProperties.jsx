import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router"; // Fixed import

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents/verified");
      return res.data;
    },
  });

  const filtered = properties.filter((p) =>
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p className="text-center py-10">Loading properties...</p>;

  return (
    <div
      data-aos="flip-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1500"
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">All Verified Properties</h2>

      {/* 🔍 Search input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No properties found for "{search}"</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <div key={property._id} className="card bg-base-100 shadow-lg">
              <figure>
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-52 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{property.title}</h2>
                <p className="text-gray-600 text-sm">{property.location}</p>

                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={property.agentImage || "/default-avatar.png"}
                    alt="Agent"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm">{property.agentName}</p>
                </div>

                <div className="mt-2 text-sm">
                  <p>
                    <strong>Price:</strong> ${property.priceMin} - ${property.priceMax}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600 font-semibold">Verified</span>
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link to={`/property/${property._id}`} className="btn btn-sm btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;
