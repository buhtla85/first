import React, { ReactElement } from 'react';
import SectionTitle from "../components/SectionTitle";
import MyMap from "../components/MyMap"

const SectionContact = (): ReactElement<any> => {
    return (
        <section className="contact">
            <div className="container">
                <SectionTitle title="about us" styling="section-title3"/>
                <div className="flex-container">
                    <MyMap />
                </div>
            </div>
        </section>
    )
}

export default SectionContact;
