import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";

// interface for array of dog objects

interface DogObject {
    name: string,
    age: string,
    grooming: boolean,
    food: boolean,
    startDate: string,
    endDate: string
}

interface IState {
    dogs: DogObject[]
}

class Bookings extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            dogs: [{
                name: "",
                age: "",
                grooming: false,
                food: false,
                startDate: "",
                endDate: ""
            }]
        }
    }

    // methods
    addNewDog = () => {
        this.setState({
            dogs: this.state.dogs.concat([{name: "", age: "", grooming: false, food: false, startDate: "", endDate: ""}])
        })
    }

    render() {
        //let {dogs} = this.state
        return (
            <React.Fragment>
            <Navbar />
            <section className="bookings">
                <div className="container">
                    <SectionTitle title="book a stay" styling="section-title1"/>
                    <div className="flex-container">
                        <form action="">
                            {this.state.dogs.map((dog, idx) => {
                                let dogId = `dog-${idx}`, ageId = `age-${idx}`
                                return (
                                    <div key={idx} className="form-group row">
                                        <label htmlFor={dogId}>{`Dog #${idx + 1} name:`}</label>
                                        <input type="text" name={dogId} id={dogId} className="name form-control"/>
                                        <label htmlFor={ageId}>Age:</label>
                                        <input type="text" name={ageId} id={ageId} className="age form-control"/>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="services inlineRadioOptions" id="food inlineRadio1" value="food" className="form-check-input"/>
                                            <label htmlFor="food" className="form-check-label">Our Food (2$ per day): </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="services inlineRadioOptions" id="groom inlineRadio2" className="form-check-input"/>
                                            <label htmlFor="groom" className="form-check-label">Grooming (15$ per stay): </label>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="date">Staying from:</label>
                                                <input type="date" name="day" id="date" className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="date">To:</label>
                                                <input type="date" name="day" id="date" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <button type="button" className="btn btn-success" onClick={this.addNewDog}>Add new dog</button>
                        </form>
                    </div>
                </div>
            </section>
            </React.Fragment> 
        )
    }
} 

export default Bookings;
