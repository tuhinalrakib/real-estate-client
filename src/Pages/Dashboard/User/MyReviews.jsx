import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/reviews?email=${user.email}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
            setReviews(reviews.filter((r) => r._id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven’t submitted any reviews yet.</p>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold">
                Property: {review.propertyTitle}
              </h3>
              <p className="mt-2">{review.reviewText}</p>
              <p className="text-sm text-gray-500 mt-1">
                Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-sm btn-error mt-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
