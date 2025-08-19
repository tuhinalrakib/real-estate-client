import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Loader from "../../components/Loader/Loader";

const LatestReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(
          "/reviews/latestReviews?sort=latest&limit=3"
        );
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [axiosSecure]);

  if (loading) return <Loader />;

  if (reviews.length === 0)
    return (
      <p className="text-center text-gray-500 py-10">
        No reviews available at the moment.
      </p>
    );

  return (
    <section className="py-14 bg-gray-50 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-10">
          Latest Reviews
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.reviewerImage || "/default-avatar.png"}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {review.reviewerName}
                  </h4>
                  <p className="text-sm text-gray-500">{review.propertyTitle}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {review.description.length > 120
                  ? review.description.slice(0, 120) + "..."
                  : review.description}
              </p>

              {/* Optional: Stars */}
              {review.rating && (
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.38 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReviews;
