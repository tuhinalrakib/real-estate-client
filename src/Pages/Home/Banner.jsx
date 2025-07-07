import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import BannerImage1 from "../../assets/Banner/BannerImage1.jpg";
import BannerImage2 from "../../assets/Banner/BannerImage2.jpg";
import BannerImage3 from "../../assets/Banner/BannerImage3.jpg";

const Banner = () => {
    return (
        <div className="my-5">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showArrows={false}
                showStatus={false}
                interval={4000}
            >
                {[BannerImage1, BannerImage2, BannerImage3].map((img, i) => (
                    <div key={i} className="relative">
                        <img
                            src={img}
                            alt={`Banner Image ${i + 1}`}
                            className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen object-cover"
                        />
                        <div className="legend !bg-black/60 !text-white !text-lg md:!text-2xl !px-4 !py-2">
                            {i === 0 && "Discover Luxury Living in Your Dream Location"}
                            {i === 1 && "Modern Apartments with Premium Amenities"}
                            {i === 2 && "Peaceful Villas Surrounded by Nature"}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
