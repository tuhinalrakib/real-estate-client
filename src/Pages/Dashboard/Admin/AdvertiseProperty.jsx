import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["admin-verified-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents/verified");
      return res.data;
    },
  });

  const advertiseMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/admin/advertise/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-verified-properties"]);
      Swal.fire("Success!", "Property advertised successfully!", "success");
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 font-semibold">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Advertise Property
      </h2>

      {properties.length === 0 ? (
        <p className="text-gray-500">No verified properties available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="card bg-white/20 shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition duration-300"
            >
              {/* Property Image */}
              <figure>
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                  loading="lazy"
                />
              </figure>

              {/* Card Content */}
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold ">
                  {prop.title}
                </h3>
                <p className="text-sm ">
                  Price: <span className="font-bold">{prop.priceMin}$</span> – <span className="font-bold">{prop.priceMax}$</span>
                </p>

                <p className="text-xs  mt-1">
                  Agent: <span className="font-medium">{prop.agentName}</span>
                </p>

                <div className="card-actions mt-4">
                  {prop.advertised ? (
                    <button className="btn btn-sm btn-success" disabled>
                      Advertised
                    </button>
                  ) : (
                    <button
                      onClick={() => advertiseMutation.mutate(prop._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Advertise
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertiseProperty;
