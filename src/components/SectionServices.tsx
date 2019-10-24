import React from 'react';
import SectionTitle from "../components/SectionTitle";

interface IPropsServices {
    service1: string;
    service2: string;
    service3: string;
}

const SectionServices = (props: IPropsServices): JSX.Element => {
    return (
        <section className="services">
            <div className="container">
                <SectionTitle title="what we offer" styling="section-title2"/>
                <div className="flex-container">
                    <div className="flex-item1">
                        <i className="fa fa-cutlery fa-3x text-white"></i>
                        <div>
                            <h4 className="text-white">{props.service1}</h4>
                            <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim tempora error omnis dicta, ex incidunt.</p>
                        </div>
                    </div>
                    <div className="flex-item2">
                    <i className="fa fa-scissors fa-3x text-white"></i>
                        <div>
                            <h4 className="text-white">{props.service2}</h4>
                            <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim tempora error omnis dicta, ex incidunt.</p>
                        </div>
                    </div>
                    <div className="flex-item3">
                    <i className="fa fa-medkit fa-3x text-white"></i>
                        <div>
                            <h4 className="text-white">{props.service3}</h4>
                            <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim tempora error omnis dicta, ex incidunt.</p>
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    )
}

export default SectionServices;
