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
      const res = await axiosSecure.get(`/offers/bought?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading your bought properties...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Property Offers</h2>

      {bought.length === 0 ? (
        <p>No offers made yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Location</th>
                <th>Agent</th>
                <th>Offered Amount</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {bought.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.location}</td>
                  <td>{item.agentName || "N/A"}</td>
                  <td>${item.offerAmount}</td>
                  <td className="capitalize font-semibold text-blue-600">
                    {item.status}
                  </td>
                  <td>
                    {item.status === "accepted" && !item.transactionId ? (
                      <button
                        onClick={() =>
                          navigate(`/dashboard/user/payment/${item._id}`)
                        }
                        className="btn btn-sm btn-primary"
                      >
                        Pay
                      </button>
                    ) : item.status === "bought" ? (
                      <div className="text-green-600 text-sm">
                        Paid ✅
                        <br />
                        <span className="text-xs font-mono">
                          TXN: {item.transactionId}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">N/A</span>
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

export default BoughtProperties;
