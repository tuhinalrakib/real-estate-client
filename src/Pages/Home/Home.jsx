import React from 'react';
import Banner from './Banner';
import BenefitsSection from './BenefitsSection';

const Home = () => {
    return (
        <div className='w-[90%] mx-auto'>
            {/* Hero/Banner */}
            <section>
                <Banner></Banner>
            </section>

            {/* Advertisement Properties */}
            <section className="my-10 px-4 md:px-8">
                <h2 className="text-3xl font-bold text-center mb-6">Featured Properties</h2>
                {/* TODO: It will get from Backend*/}
            </section>

            {/* Latest Reviews */}
            <section className="my-10 px-4 md:px-8">
                <h2 className="text-3xl font-bold text-center mb-6">Latest User Reviews</h2>
                {/* TODO: It will get Backend */}
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