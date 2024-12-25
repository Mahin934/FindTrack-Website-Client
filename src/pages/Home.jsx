import React from 'react';
import Banner from '../components/Banner';
import HomeLostFound from '../components/HomeLostFound';
import HowToReport from '../components/HowToReport';
import SuccessStories from '../components/SuccessStories';

const Home = () => {
    return (
        <div>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <HomeLostFound></HomeLostFound>
            </div>
            <div>
                <HowToReport></HowToReport>
            </div>
            <div className='flex justify-center pb-20'>
                <SuccessStories></SuccessStories>
            </div>
        </div>
    );
};

export default Home;