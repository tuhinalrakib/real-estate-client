import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Offers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch offers made to this agent
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["agentOffers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agents/offers?email=${user?.email}`);
      return res.data;
    },
  });

  // Mutation for accepting an offer
  const acceptMutation = useMutation({
    mutationFn: async (offer) => {
      return axiosSecure.patch(`/agent/offers/accept/${offer._id}`, {
        propertyId: offer.propertyId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["agentOffers"]);
      Swal.fire("Accepted!", "Offer has been accepted.", "success");
    },
  });

  // Mutation for rejecting an offer
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/agent/offers/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["agentOffers"]);
      Swal.fire("Rejected!", "Offer has been rejected.", "info");
    },
  });

  const handleAccept = (offer) => {
    Swal.fire({
      title: "Accept this offer?",
      text: "This will reject all other offers for this property.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        acceptMutation.mutate(offer);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading offers...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Requested / Offered Properties</h2>
      {offers.length === 0 ? (
        <p className="text-gray-500">No offers yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Location</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Offer ($)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={offer._id}>
                  <td>{index + 1}</td>
                  <td>{offer.title}</td>
                  <td>{offer.location}</td>
                  <td>{offer.buyerName}</td>
                  <td>{offer.buyerEmail}</td>
                  <td>${offer.offerAmount}</td>
                  <td>
                    <span
                      className={`capitalize font-semibold ${
                        offer.status === "accepted"
                          ? "text-green-600"
                          : offer.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="space-x-2">
                    {offer.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAccept(offer)}
                          className="btn btn-xs btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(offer._id)}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">No actions</span>
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

export default Offers;
