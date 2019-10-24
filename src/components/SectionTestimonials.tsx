import React from 'react';
import SectionTitle from '../components/SectionTitle';

const SectionTestimonials = (): JSX.Element => {
    return (
        <section className="testimonials">
            <div className="container">
                <SectionTitle title="testimonials" styling="section-title1"/>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, cumque? Quis aliquid illo velit earum quasi. Quo vitae voluptas odit quasi qui eaque accusamus, inventore sunt ullam temporibus repellat explicabo repudiandae? Rerum, eius dolores. At assumenda omnis alias ipsum voluptatum deserunt labore. Eius magni aperiam, ex fuga consectetur id quod.</p>
                            <cite>-Anna</cite>
                        </div>
                        <div className="carousel-item">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, cumque? Quis aliquid illo velit earum quasi. Quo vitae voluptas odit quasi qui eaque accusamus, inventore sunt ullam temporibus repellat explicabo repudiandae? Rerum, eius dolores. At assumenda omnis alias ipsum voluptatum deserunt labore. Eius magni aperiam, ex fuga consectetur id quod.</p>
                            <cite>-Jack</cite>                        
                        </div>
                        <div className="carousel-item">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, cumque? Quis aliquid illo velit earum quasi. Quo vitae voluptas odit quasi qui eaque accusamus, inventore sunt ullam temporibus repellat explicabo repudiandae? Rerum, eius dolores. At assumenda omnis alias ipsum voluptatum deserunt labore. Eius magni aperiam, ex fuga consectetur id quod.</p>
                            <cite>-Kate</cite>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionTestimonials;
