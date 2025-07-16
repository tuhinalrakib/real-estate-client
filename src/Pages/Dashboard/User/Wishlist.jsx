import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useUserRole from "../../../Hooks/useUserRole";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Wishlist = () => {
    const { user } = useAuth();
    const role = useUserRole()
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const {
        data: wishlist = [],
        isLoading,
    } = useQuery({
        queryKey: ["wishlist", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
            return res.data;
        },
    });

    const removeMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/wishlist/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["wishlist"]);
            Swal.fire("Removed!", "Property removed from wishlist.", "success");
        },
    });

    const { data: offers = [] } = useQuery({
        queryKey: ["offers", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers?email=${user?.email}`);
            return res.data;
        },
    });

    const offerMutation = useMutation({
        mutationFn: async (data) => {
            return axiosSecure.post("/offers", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["wishlist"]);
            Swal.fire("Offer submitted!", "Check your Property Bought section.", "success");
            setShowModal(false);
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const hasOffered = (propertyId) => {
        return offers.some((offer) => offer.propertyId === propertyId);
    };

    const handleMakeOffer = (property) => {
        if (role !== "user") {
            return Swal.fire("Access Denied", "Only users can make offers.", "error");
        }
        setSelectedProperty(property);
        setShowModal(true);
    };


    const onSubmit = (data) => {
        const price = parseFloat(data.offerAmount);
        const min = selectedProperty.priceMin;
        const max = selectedProperty.priceMax;

        if (price < min || price > max) {
            return Swal.fire(
                "Invalid Offer",
                `Offer must be between $${min} and $${max}`,
                "error"
            );
        }

        const offerData = {
            propertyId: selectedProperty.propertyId,
            title: selectedProperty.title,
            location: selectedProperty.location,
            agentName: selectedProperty.agentName,
            buyerEmail: user.email,
            buyerName: user.displayName,
            offerAmount: price,
            buyingDate: data.buyingDate,
            status: "pending",
            image: selectedProperty.image,
        };

        offerMutation.mutate(offerData);
        reset();
    };

    const handleRemove = (id) => {
        removeMutation.mutate(id);
    };

    if (isLoading) return <p>Loading wishlist...</p>;

    return (
        <div data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1500">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <p>No properties in wishlist.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                        <div key={item._id} className="card bg-base-100 shadow-md">
                            <figure>
                                <img src={item.image} alt={item.title} className="w-full h-60 object-cover" />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title">{item.title}</h3>
                                <p><strong>Location:</strong> {item.location}</p>
                                <p><strong>Price:</strong> ${item.priceMin} - ${item.priceMax}</p>
                                <p><strong>Verification:</strong>
                                    <span className="capitalize ml-1 text-blue-600">{item.verificationStatus}</span>
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <img
                                        src={item.agentImage}
                                        alt={item.agentName}
                                        className="w-10 h-10 rounded-full border"
                                    />
                                    <p className="text-sm">{item.agentName}</p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    {hasOffered(item.propertyId) ? (
                                        <button className="btn btn-sm btn-outline" disabled>
                                            Already Offered
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeOffer(item)}
                                            className="btn btn-sm btn-success"
                                        >
                                            Make an Offer
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Making Offer */}
            {showModal && selectedProperty && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500"
                            onClick={() => setShowModal(false)}
                        >
                            ✖
                        </button>
                        <h3 className="text-lg font-bold mb-4">Make an Offer</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input
                                type="text"
                                value={selectedProperty.title}
                                disabled
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                value={selectedProperty.location}
                                disabled
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                value={selectedProperty.agentName}
                                disabled
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                value={user?.displayName}
                                disabled
                                className="input input-bordered w-full"
                            />
                            <input
                                type="email"
                                value={user?.email}
                                disabled
                                className="input input-bordered w-full"
                            />
                            <input
                                {...register("offerAmount", { required: true })}
                                type="number"
                                step="0.01"
                                placeholder={`Offer Amount (Between $${selectedProperty.priceMin} - $${selectedProperty.priceMax})`}
                                className="input input-bordered w-full"
                            />
                            {errors.offerAmount && <p className="text-red-500 text-sm">Offer amount required</p>}

                            <input
                                {...register("buyingDate", { required: true })}
                                type="date"
                                className="input input-bordered w-full"
                            />
                            {errors.buyingDate && <p className="text-red-500 text-sm">Buying date required</p>}

                            <button type="submit" className="btn btn-primary w-full">
                                Submit Offer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
