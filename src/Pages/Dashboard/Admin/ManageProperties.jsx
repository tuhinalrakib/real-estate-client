import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/properties");
      return res.data;
    },
  });
  console.log(properties)

  // Mutation for verifying/rejecting property
  const statusMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      return axiosSecure.patch(`/admin/properties/${id}`, { action });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-properties"]);
    },
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

  if (isLoading) return <p>Loading properties...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage All Properties</h2>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Location</th>
                <th>Agent</th>
                <th>Price Range</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td>{p.title}</td>
                  <td>{p.location}</td>
                  <td>
                    <p>{p.agentName}</p>
                    <p className="text-xs text-gray-500">{p.agentEmail}</p>
                  </td>
                  <td>${p.priceMin} - ${p.priceMax}</td>
                  <td className="capitalize">
                    <span
                      className={
                        p.status === "verified"
                          ? "text-green-600"
                          : p.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-500"
                      }
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="space-x-2 text-center">
                    {p.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(p._id, "verified")}
                          className="btn btn-xs btn-success"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleAction(p._id, "rejected")}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {p.status !== "pending" && (
                      <span className="font-semibold">{p.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
