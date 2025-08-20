import Loader from "../../components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import useAxios from "../../Hooks/useAxios";

const LatestReviews = () => {
  const axiosInstance = useAxios()

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/reviews/latestReviews?sort=latest&limit=6"
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  if (reviews.length === 0)
    return (
      <p className="text-center text-gray-500 py-10">
        No reviews available at the moment.
      </p>
    );

  return (
    <section className="py-5 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-12">
          Latest Reviews
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3500}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.reviewerImage || "/default-avatar.png"}
                    alt={review.reviewerName || "Reviewer"}
                    className="w-12 h-12 rounded-full object-cover border shadow-sm"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {review.reviewerName}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {review.propertyTitle}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {review.description.length > 120
                    ? review.description.slice(0, 120) + "..."
                    : review.description}
                </p>

                {/* Stars */}
                {review.rating && (
                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.38 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestReviews;
