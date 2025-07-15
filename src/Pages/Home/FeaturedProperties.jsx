import React from "react";
import { Link } from "react-router";

const FeaturedProperties = () => {
  const featured = [
    {
      _id: "1",
      title: "Modern Family House",
      image: "https://i.ibb.co/X7ZzvcN/house1.jpg",
      location: "Gulshan, Dhaka",
      priceMin: 120000,
      priceMax: 150000,
      status: "verified",
    },
    {
      _id: "2",
      title: "Luxury Villa",
      image: "https://i.ibb.co/7jG6Fs6/house2.jpg",
      location: "Banani, Dhaka",
      priceMin: 250000,
      priceMax: 300000,
      status: "verified",
    },
    {
      _id: "3",
      title: "Cozy Apartment",
      image: "https://i.ibb.co/L5qKLbD/house3.jpg",
      location: "Dhanmondi, Dhaka",
      priceMin: 80000,
      priceMax: 95000,
      status: "verified",
    },
    {
      _id: "4",
      title: "Elegant Penthouse",
      image: "https://i.ibb.co/dW7fKV6/house4.jpg",
      location: "Baridhara, Dhaka",
      priceMin: 320000,
      priceMax: 360000,
      status: "verified",
    },
  ];

  return (
    <div className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Properties</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((property) => (
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

export default FeaturedProperties;
