import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Offers = () => {
  const { user, theme } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["agentOffers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agents/offers?email=${user?.email}`);
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (offer) => {
      return axiosSecure.patch(`/agents/offers/accept/${offer._id}`, {
        propertyId: offer.propertyId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["agentOffers"]);
      Swal.fire("Accepted!", "Offer has been accepted.", "success");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/agents/offers/reject/${id}`);
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
    <div className="px-4 py-6">
      <Helmet>
        <title>Offers For Agents</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6">Requested / Offered Properties</h2>

      {offers.length === 0 ? (
        <p className="text-gray-500">No offers yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div
              key={offer._id}
              className="bg-white border rounded-lg shadow-md p-6 transition hover:shadow-lg"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-purple-700 mb-1">
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-600">{offer.location}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Buyer:</span>{" "}
                  {offer.buyerName}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium ">Email:</span>{" "}
                  {offer.buyerEmail}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Offer:</span>{" "}
                  <span className="text-green-600 font-semibold">${offer.offerAmount}</span>
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      offer.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : offer.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {offer.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                {offer.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleAccept(offer)}
                      className="px-3 py-1 text-sm rounded bg-green-600 hover:bg-green-700 text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(offer._id)}
                      className="px-3 py-1 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400 text-sm italic">No actions available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
