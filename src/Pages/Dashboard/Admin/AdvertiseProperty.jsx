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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Advertise Property</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Agent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop, index) => (
              <tr key={prop._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{prop.title}</td>
                <td>${prop.priceMin} - ${prop.priceMax}</td>
                <td>{prop.agentName}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperty;
