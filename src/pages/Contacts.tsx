import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionStaff from "../components/SectionStaff";
import SectionContact from "../components/SectionContact";

const Contacts = (): JSX.Element => {
    return (
        <React.Fragment>
            <Navbar />
            <SectionStaff />
            <SectionContact />
            <Footer content="Copyright &copy; 2019, FurBall Hotel"/>
        </React.Fragment>
    )
}

export default Contacts;
