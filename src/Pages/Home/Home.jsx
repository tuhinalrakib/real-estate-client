import React from 'react';
import Banner from './Banner';
import BenefitsSection from './BenefitsSection';
import FeaturedProperties from './Advertisement';
import Advertisement from './Advertisement';
import LatestReviews from './LatestReviews';
import HowItWorks from './HowItWorks';
import Stats from './Stats ';
import Newsletter from './Newsletter';
import SalesPromotion from './SalesPromotion';

const Home = () => {
    return (
        <div className='w-[90%] mx-auto'>
            {/* Hero/Banner */}
            <section>
                <Banner></Banner>
            </section>

            {/* Advertisement Properties */}
            <section className="my-10 px-2 md:px-8">
                {/* TODO: It will get from Backend*/}
                <Advertisement></Advertisement>
            </section>

            {/* Latest Reviews */}
            <section className="my-10 px-2 md:px-8">
                {/* TODO: It will get Backend */}
                <LatestReviews></LatestReviews>
            </section>

            {/* Extra Sections */}
            <section data-aos="zoom-in-down" className="my-10 px-2 md:px-8">
                <BenefitsSection></BenefitsSection>
            </section>

            <section className="my-10 px-2 md:px-8">
                {/* TODO */}
                <HowItWorks></HowItWorks>
            </section>
            <section className="my-10 px-2 md:px-8">
                <Newsletter />
            </section>
            <section className="my-10 px-2 md:px-8">
                <SalesPromotion />
            </section>

            <section className="my-10 px-2 md:px-8">
                {/* TODO */}
                <Stats></Stats>
            </section>
        </div>
    );
};

export default Home;