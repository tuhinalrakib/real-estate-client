import React from 'react';
import Banner from './Banner';
import BenefitsSection from './BenefitsSection';
import FeaturedProperties from './Advertisement';
import Advertisement from './Advertisement';
import LatestReviews from './LatestReviews';

const Home = () => {
    return (
        <div className='w-[90%] mx-auto'>
            {/* Hero/Banner */}
            <section>
                <Banner></Banner>
            </section>

            {/* Advertisement Properties */}
            <section className="my-10 px-4 md:px-8">
                <h2 className="text-3xl font-bold text-center mb-6">Advertisement Properties</h2>
                {/* TODO: It will get from Backend*/}
                <Advertisement></Advertisement>
            </section>

            {/* Latest Reviews */}
            <section className="my-10 px-4 md:px-8">
                <h2 className="text-3xl font-bold text-center mb-6">Latest User Reviews</h2>
                {/* TODO: It will get Backend */}
                <LatestReviews></LatestReviews>
            </section>

            {/* Extra Sections */}
            <section data-aos="zoom-in-down" className="my-10 px-4 md:px-8">
                <BenefitsSection></BenefitsSection>
            </section>

            <section className="my-10 px-4 md:px-8">
                {/* TODO */}
            </section>
        </div>
    );
};

export default Home;