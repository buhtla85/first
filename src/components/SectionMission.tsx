import React from 'react';
import SectionTitle from "./SectionTitle";

const SectionMission: React.SFC = () => {
    return (
        <section className="mission">
            <div className="container">
                <SectionTitle title="our mission" styling="section-title1"/>
                <div className="flex-container">
                    <div className="flex-item-img"></div>
                    <div className="flex-item-text">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, dolore! Quos, tenetur! Possimus facere fugit ipsam ducimus animi, soluta maxime.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nihil voluptas hic enim, quasi accusamus perferendis quo. Qui, saepe laborum!</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum corporis tempore adipisci voluptatum. Totam perspiciatis amet nostrum, iusto nam, itaque vitae qui perferendis officiis voluptate officia doloremque voluptates cupiditate minima. A nobis qui, perspiciatis tempore sapiente maiores vero.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum doloribus odit, sunt qui placeat enim beatae modi reiciendis praesentium. Laudantium nihil voluptas hic enim, quasi accusamus perferendis quo. Qui, saepe eum?</p>
                    </div>
                </div>
            </div> 
        </section>
    )
}

export default SectionMission;
