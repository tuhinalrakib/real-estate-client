import React from 'react';
import { Helmet } from 'react-helmet';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../../components/Loader/Loader';
import { useQuery } from '@tanstack/react-query';

const SoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["sold-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agents/sold-properties?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  // ✅ Calculate total sold amount
  const totalSoldAmount = soldProperties.reduce((sum, prop) => sum + parseFloat(prop.offerAmount), 0);

  return (
    <div className="p-4">
      <Helmet>
        <title>Sold Properties - Agent Dashboard</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-2">Sold Properties</h2>

      {/* ✅ Total Sold Amount Summary */}
      {soldProperties.length > 0 && (
        <div className="bg-purple-100 border border-purple-300 text-purple-800 p-4 rounded-lg mb-6 shadow">
          <h3 className="text-lg font-semibold">Total Sold Amount</h3>
          <p className="text-xl font-bold">${totalSoldAmount.toFixed(2)}</p>
        </div>
      )}

      {soldProperties.length === 0 ? (
        <p>No properties have been sold yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soldProperties.map((offer) => (
            <div
              key={offer._id}
              className="border p-4 rounded-xl shadow-md space-y-2 bg-[#4c2c8c] text-white"
            >
              <img
                src={offer.image}
                alt={offer.propertyTitle}
                className="w-full h-48 object-cover rounded"
                loading='lazy'
              />
              <h3 className="text-xl font-bold">{offer.title}</h3>
              <p>
                <strong>Location:</strong> {offer.location}
              </p>
              <p>
                <strong>Buyer:</strong> {offer.buyerName} ({offer.buyerEmail})
              </p>
              <p>
                <strong>Sold Price:</strong> ${offer.offerAmount}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="text-green-400 font-semibold capitalize">
                  {offer.status}
                </span>
              </p>
              {offer.transactionId && (
                <p>
                  <strong>Transaction ID:</strong> {offer.transactionId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoldProperties;
