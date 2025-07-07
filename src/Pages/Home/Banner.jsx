import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import BannerImage1 from "../../assets/Banner/BannerImage1.jpg"
import BannerImage2 from "../../assets/Banner/BannerImage2.jpg"
import BannerImage3 from "../../assets/Banner/BannerImage3.jpg"

const Banner = () => {
    return (
        <div className='my-5'>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src={BannerImage1} className='h-[100vh]'/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={BannerImage2} className='h-[100vh]'/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={BannerImage3} className='h-[100vh]'/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;