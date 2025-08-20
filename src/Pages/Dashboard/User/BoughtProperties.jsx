import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const BoughtProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: bought = [], isLoading } = useQuery({
    queryKey: ["bought", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading your bought properties...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Property Offers</h2>

      {bought.length === 0 ? (
        <p>No offers made yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bought.map((item) => (
            <div key={item._id} className="card bg-white/70 shadow-md rounded-xl overflow-hidden">
              <figure>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-black card-title text-lg">{item.title}</h3>
                <p className="text-gray-600">📍 {item.location}</p>
                <p className="text-gray-600">Agent: {item.agentName || "N/A"}</p>
                <p className="text-gray-800 font-semibold">
                  Offered: {item.offerAmount}$
                </p>
                <p
                  className={`font-bold capitalize ${
                    item.status === "accepted"
                      ? "text-green-600"
                      : item.status === "pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  Status: {item.status}
                </p>

                {/* Payment Logic */}
                <div className="mt-3">
                  {item.status === "accepted" && !item.transactionId ? (
                    <button
                      onClick={() =>
                        navigate(`/dashboard/user/payment/${item._id}`)
                      }
                      className="btn btn-sm btn-primary w-full"
                    >
                      Pay Now
                    </button>
                  ) : item.status === "bought" ? (
                    <div className="text-green-600 text-sm">
                      <p>✅ Paid</p>
                      <p className="text-xs font-mono break-all">
                        TXN: {item.transactionId}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Waiting...</span>
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

export default BoughtProperties;
