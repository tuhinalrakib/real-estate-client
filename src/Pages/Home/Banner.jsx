import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { motion } from "framer-motion"; // smooth animation
import BannerImage1 from "../../assets/Banner/BannerImage1.jpg";
import BannerImage2 from "../../assets/Banner/BannerImage2.jpg";
import BannerImage3 from "../../assets/Banner/BannerImage3.jpg";
import { Link } from 'react-router';

const bannerContent = [
  {
    img: BannerImage1,
    title: "Discover Luxury Living in Your Dream Location",
    subtitle: "Find the perfect property that matches your lifestyle.",
    btnText: "Explore Properties",
  },
  {
    img: BannerImage2,
    title: "Modern Apartments with Premium Amenities",
    subtitle: "Experience the blend of comfort, style, and convenience.",
    btnText: "View Listings",
  },
  {
    img: BannerImage3,
    title: "Peaceful Villas Surrounded by Nature",
    subtitle: "Escape the city and embrace serene living spaces.",
    btnText: "Get Started",
  },
];

const Banner = () => {
  return (
    <div className="my-5">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        interval={5000}
        swipeable
        emulateTouch
        stopOnHover = {false}
      >
        {bannerContent.map((item, i) => (
          <div key={i} className="relative">
            {/* Background Image */}
            <img
              src={item.img}
              alt={`Banner ${i + 1}`}
              className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Text + Button */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 text-left text-white">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-5xl font-bold max-w-2xl leading-snug drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {item.title}
              </motion.h2>
              <motion.p 
                className="mt-4 text-base sm:text-lg md:text-xl max-w-xl text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {item.subtitle}
              </motion.p>
              <motion.button
                className="mt-6 w-fit bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl text-lg font-semibold shadow-md transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link to="/allProperties">{item.btnText}</Link>
              </motion.button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
