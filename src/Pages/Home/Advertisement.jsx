import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";

const Advertisement = () => {
  const [properties,setProperties] = useState([])
  const axiosInstance = useAxios()

  useEffect(() => {
  axiosInstance.get("/agents/verified?limit=4")
    .then(res => setProperties(res.data))
    .catch(err => console.error(err));
}, []);


  return (
    <div className="my-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties?.map((property) => (
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
