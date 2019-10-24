import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SectionMission from "../components/SectionMission";
import SectionServices from "../components/SectionServices";
import SectionTestimonials from "../components/SectionTestimonials";
import Footer from "../components/Footer";

const Home = (): JSX.Element => {
    return (
        <React.Fragment>
            <Navbar />
            <Hero />
            <SectionMission />
            <SectionServices service1="organic food" service2="grooming" service3="veterinarian" />
            <SectionTestimonials />
            <Footer content="Copyright &copy; 2019, FurBall Hotel"/>
        </React.Fragment>
    )
}

export default Home;
