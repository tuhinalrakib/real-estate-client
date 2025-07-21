import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  // Delete review
  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-reviews"]);
      Swal.fire("Deleted!", "Review has been deleted.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this review.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReviewMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage All Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-[#4c2c8c] text-white shadow-md">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{review.reviewerName}</p>
                    <p className="text-xs text-gray-500">{review.reviewerEmail}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400">
                  <strong>Property:</strong> {review.propertyTitle}
                </p>
                <p className="mt-2">{review.description}</p>
                <p className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleString()}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
