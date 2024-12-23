import React from 'react';
import Banner from '../components/Banner';
import HomeLostFound from '../components/HomeLostFound';

const Home = () => {
    return (
        <div>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <HomeLostFound></HomeLostFound>
            </div>
        </div>
    );
};

export default Home;