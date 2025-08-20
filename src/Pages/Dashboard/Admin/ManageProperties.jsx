import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {theme} = useAuth()

  // Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/properties");
      return res.data;
    },
  });

  // Mutation for verifying/rejecting property
  const statusMutation = useMutation({
    mutationFn: async ({ id, action }) =>
      axiosSecure.patch(`/admin/properties/${id}`, { action }),
    onSuccess: () => queryClient.invalidateQueries(["all-properties"]),
  });

  const handleAction = (id, action) => {
    Swal.fire({
      title: `Confirm ${action}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ id, action });
      }
    });
  };

  if (isLoading)
    return <p className="text-center mt-10 font-semibold">Loading properties...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Manage All Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="card bg-white/20 shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition duration-300"
            >
              <div className="card-body">
                {/* Property Title */}
                <h3 className={`card-title text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  {p.title}
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-white/70" : "text-gray-500"}`}>{p.location}</p>

                {/* Agent Info */}
                <div className="mt-3">
                  <p className="font-medium">{p.agentName}</p>
                  <p className={`text-xs ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>{p.agentEmail}</p>
                </div>

                {/* Price Range */}
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-semibold">Price:</span> ${p.priceMin} - $
                  {p.priceMax}
                </div>

                {/* Status */}
                <div className="mt-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${
                      p.status === "verified"
                        ? "bg-green-100 text-green-600"
                        : p.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="card-actions mt-4 flex flex-wrap gap-2">
                  {p.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(p._id, "verified")}
                        className="btn btn-sm btn-success"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleAction(p._id, "rejected")}
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="font-semibold text-gray-700">
                      {""}
                    </span>
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

export default ManageProperties;
