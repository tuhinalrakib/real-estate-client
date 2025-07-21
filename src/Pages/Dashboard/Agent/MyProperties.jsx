import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Loader from "../../../components/Loader/Loader";

const MyProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch agent's properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["my-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents/my-properties");
      return res.data;
    },
  });

  // Delete property
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/agents/properties/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Your property has been deleted.", "success");
      queryClient.invalidateQueries(["my-properties"]);
    },
  });

  // Update property
  const updateMutation = useMutation({
    mutationFn: async (updatedProperty) =>
      axiosSecure.patch(`/agents/properties/${updatedProperty._id}`, updatedProperty),
    onSuccess: () => {
      Swal.fire("Updated!", "Property updated successfully.", "success");
      queryClient.invalidateQueries(["my-properties"]);
      closeModal();
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

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProperty = {
      _id: selectedProperty._id,
      title: form.title.value,
      location: form.location.value,
      image: form.image.value,
      priceMin: parseFloat(form.priceMin.value),
      priceMax: parseFloat(form.priceMax.value),
    };
    updateMutation.mutate(updatedProperty);
  };

  if (isLoading) return <Loader></Loader>;
  
  return (
    <div>
      <Helmet>
        <title>My Added Properties</title>
      </Helmet>
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
                <div className="flex items-center gap-2 mt-2">
                  <img src={property.agentImage} alt="agent" className="w-8 h-8 rounded-full" />
                  <span className="text-sm">{property.agentName}</span>
                </div>
                <p className="text-sm font-bold text-gray-500">
                  Price Range: {property.priceMin}৳ - {property.priceMax}৳
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
                    <button
                      onClick={() => openModal(property)}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </button>
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

      {/* Update Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute cursor-pointer top-2 right-2 text-xl text-gray-500"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Update Property</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                defaultValue={selectedProperty.title}
                placeholder="Property Title"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="location"
                defaultValue={selectedProperty.location}
                placeholder="Location"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="image"
                defaultValue={selectedProperty.image}
                placeholder="Image URL"
                className="input input-bordered w-full"
                required
              />
              <div className="flex gap-4">
                <input
                  type="number"
                  name="priceMin"
                  defaultValue={selectedProperty.priceMin}
                  placeholder="Min Price"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="number"
                  name="priceMax"
                  defaultValue={selectedProperty.priceMax}
                  placeholder="Max Price"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="agentName"
                  defaultValue={selectedProperty.agentName}
                  placeholder="Agent Image"
                  className="input input-bordered w-full"
                  readOnly
                />
                <input
                  type="email"
                  name="agentEmail"
                  defaultValue={selectedProperty.agentEmail}
                  placeholder="Agent Email"
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Update Property
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProperties;

/**
 * 
 * 
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
                <div className="flex items-center gap-2 mt-2">
                  <img src={property.agentImage} alt="agent" className="w-8 h-8 rounded-full" />
                  <span className="text-sm">{property.agentName}</span>
                </div>
                <div className="mt-2 text-sm font-semibold">
                  <p>Min Price: {property.priceMin}৳</p>
                  <p>Max Price: {property.priceMax}৳</p>
                </div>
                <p className="mt-2 text-sm">
                  Verification Status:{" "}
                  <span
                    className={
                      property.status === "verified"
                        ? "text-green-500 font-semibold"
                        : property.status === "pending"
                        ? "text-yellow-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {property.status}
                  </span>
                </p>

                <div className="card-actions justify-end mt-4">
                  {property.status !== "rejected" && (
                    <button
                      onClick={() => navigate(`/dashboard/update-property/${property._id}`)}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </button>
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

 */
