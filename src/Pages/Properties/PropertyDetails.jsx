import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../components/Loader/Loader";

// Sub-component for displaying individual review
const ReviewCard = ({ review }) => (
  <div className="bg-base-200 p-4 rounded shadow-sm">
    <div className="flex items-center gap-3 mb-2">
      <img
        src={review.reviewerImage}
        alt={review.reviewerName}
        className="w-10 h-10 rounded-full object-cover"
      />
      <p className="font-semibold">{review.reviewerName}</p>
    </div>
    <p className="text-gray-700 text-sm">{review.description}</p>
    <p className="text-xs text-gray-400 mt-1">
      {new Date(review.createdAt).toLocaleString()}
    </p>
  </div>
);

// Sub-component for Add Review Modal
const ReviewModal = ({ show, onClose, onSubmit, register, errors, isSubmitting }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-lg hover:text-gray-800"
        >
          ✖
        </button>
        <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <textarea
            {...register("description", { required: true })}
            placeholder="Write your review"
            className="textarea textarea-bordered w-full resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">Review is required</p>
          )}
          <button
            type="submit"
            className={`btn btn-success w-full ${isSubmitting ? "loading" : ""}`}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/properties/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const { data: isWishlisted = false, isLoading: wishlistLoading } = useQuery({
    queryKey: ["wishlist", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/wishlist/check?userEmail=${user.email}&propertyId=${id}`
      );
      return res.data.exists;
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/wishlist", {
        propertyId: property._id,
        userEmail: user.email,
        title: property.title,
        location: property.location,
        priceMin: property.priceMin,
        priceMax: property.priceMax,
        agentName: property.agentName,
        agentEmail: property.agentEmail,
        agentImage: property.agentImage,
        image: property.image,
        verificationStatus: property.status,
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "Added to wishlist", "success");
      queryClient.invalidateQueries(["wishlist", user?.email, id]);
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => axiosSecure.post("/reviews", reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      Swal.fire("Review submitted!", "", "success");
      reset();
      setShowModal(false);
    },
  });

  const onSubmitReview = (data) => {
    const review = {
      propertyId: id,
      agentName: property.agentName,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      reviewerImage: user.photoURL,
      description: data.description,
      propertyTitle: property.title,
      createdAt: new Date(),
    };
    reviewMutation.mutate(review);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Property Card */}
      <div className="card bg-base-100 shadow-xl overflow-hidden rounded-lg">
        <figure>
          <img
            src={property?.image}
            alt={property?.title}
            className="w-full h-72 object-cover"
            loading="lazy"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{property?.title}</h2>
          <p className="text-gray-600">{property?.description}</p>
          <div className="mt-2 text-sm space-y-1">
            <p><strong>Location:</strong> {property?.location}</p>
            <p><strong>Price:</strong> ${property?.priceMin} - ${property?.priceMax}</p>
            <p><strong>Agent:</strong> {property?.agentName}</p>
          </div>
          {wishlistLoading ? (
            <button className="btn btn-primary mt-4 w-fit" disabled>Loading...</button>
          ) : isWishlisted ? (
            <button className="btn btn-success mt-4 w-fit" disabled>Wishlist Added</button>
          ) : (
            <button
              onClick={() => wishlistMutation.mutate()}
              className="btn btn-primary mt-4 w-fit"
            >
              Add to Wishlist
            </button>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Reviews</h3>
          <button
            className="btn btn-sm btn-info"
            onClick={() => setShowModal(true)}
          >
            Add a Review
          </button>
        </div>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      <ReviewModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit(onSubmitReview)}
        register={register}
        errors={errors}
        isSubmitting={reviewMutation.isLoading}
      />
    </div>
  );
};

export default PropertyDetails;
