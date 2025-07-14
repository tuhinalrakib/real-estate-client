import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const MyProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch properties added by this agent
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["my-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents/my-properties");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/agents/properties/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your property has been deleted.", "success");
      queryClient.invalidateQueries(["my-properties"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this property?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading your properties...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Added Properties</h2>

      {properties.length === 0 ? (
        <p>You haven't added any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="card bg-base-100 shadow-md">
              <figure>
                <img src={property.image} alt={property.title} className="w-full h-52 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{property.title}</h2>
                <p className="text-sm text-gray-600">{property.location}</p>
                <p className="text-sm font-bold text-gray-500">
                  Price Range: {property.priceMin}<span className="text-[14px] font-extrabold">৳</span> - {property.priceMax}<span className="text-[14px] font-extrabold">৳</span>
                </p>
                <p className="badge mt-2 capitalize">
                  Status:{" "}
                  <span
                    className={
                      property.status === "verified"
                        ? "text-green-500"
                        : property.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }
                  >
                    {property.status}
                  </span>
                </p>

                <div className="card-actions justify-end mt-4">
                  {property.status !== "rejected" && (
                    <Link
                      to={`/dashboard/update-property/${property._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;