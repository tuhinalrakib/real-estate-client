import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const PropertyDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, axios]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!property) {
    return <div className="text-center py-20 text-red-500">Property not found.</div>;
  }

  const {
    title,
    description,
    price,
    location,
    image,
    bedrooms,
    bathrooms,
    area,
    agentName,
    contact,
  } = property;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <img src={image} alt={title} className="w-full h-96 object-cover rounded-xl shadow" />
      <div className="mt-6 space-y-4">
        <p className="text-gray-700">{description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><strong>Location:</strong> {location}</div>
          <div><strong>Price:</strong> ${price}</div>
          <div><strong>Bedrooms:</strong> {bedrooms}</div>
          <div><strong>Bathrooms:</strong> {bathrooms}</div>
          <div><strong>Area:</strong> {area} sqft</div>
          <div><strong>Agent:</strong> {agentName}</div>
          <div><strong>Contact:</strong> {contact}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
