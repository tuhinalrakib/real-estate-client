import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loader from "../../components/Loader/Loader";

const Advertisement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/agents/verified");
        const all = res.data || [];

        const advertised = all.filter(item => item.advertised === true);
        
        // যদি ৪ বা তার বেশি advertised থাকে, শুধু ওগুলো দেখাও
        if (advertised.length >= 4) {
          setProperties(advertised.slice(0, 4));
        } else {
          // যদি কম থাকে, তাহলে বাকি verified থেকে মেশাও
          const notAdvertised = all.filter(item => !item.advertised);
          const remaining = 4 - advertised.length;
          const additional = notAdvertised.slice(0, remaining);
          setProperties([...advertised, ...additional]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [axiosInstance]);

  if (loading) return <Loader />;
  if (properties.length === 0) return null;

  return (
    <div className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">
        Advertisement Properties
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={property.image}
                alt={property.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="font-semibold text-lg">{property.title}</h3>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {property.location}
              </p>
              <p className="text-sm">
                <strong>Price:</strong> ${property.priceMin} - ${property.priceMax}
              </p>
              <p className="text-sm">
                <strong>Status:</strong>{" "}
                <span className="capitalize text-green-600">{property.status}</span>
              </p>
              <div className="card-actions justify-end mt-2">
                <Link to={`/property/${property._id}`}>
                  <button className="btn btn-sm btn-primary">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
