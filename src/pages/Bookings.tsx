import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import Reservation from "../components/Reservation";


const Bookings = (): JSX.Element => {
    return (
        <React.Fragment>
            <Navbar />
                <section className="bookings">
                    <div className="container">
                        <SectionTitle title="book a stay" styling="section-title1"/>
                        <Reservation />
                    </div>
                </section>
            <Footer content="Copyright &copy; 2019, FurBall Hotel" />                  
        </React.Fragment> 
    )
}


export default Bookings;
