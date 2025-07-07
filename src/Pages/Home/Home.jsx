import React from 'react';
import Banner from './Banner';

const Home = () => {
    return (
        <div className='w-[90%] mx-auto'>
            {/* Hero/Banner */}
            <section>
                <Banner></Banner>
            </section>
        </div>
    );
};

export default Home;