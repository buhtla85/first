import React from 'react';
import DogForm from "./DogForm";
import { differenceInDays } from "date-fns";

//add dog prelazi ovde i remove - ovo je soba sa nizom pasa

 interface IDog {
    name: string,
    breed: string,
    food: boolean,
    grooming: boolean,
    foodPrice: number,
    groomPrice: number
}

interface IRoom {
    startDate: string,
    endDate: string,
    dogs: IDog[], //implementing reduce function to calculate foodTotal and groomTotal
    roomType: string, // choosing a option from select dropdown should store a string here... 
    days: number, // endDate - startDate, but how????
    foodTotal: number, //days * number of dogs from dogs array who checked food till ex: (y * (x) * 2)
    groomTotal: number, // number of dogs from dogs array who checked grooming (x * 10)
    roomTotalPrice: number // days * roomType + foodTotal + groomTotal
}

class RoomForm extends React.Component<{}, IRoom> {
    constructor(props:any) {
        super(props);
        this.state = {startDate:"", endDate: "", dogs: [{name: "", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}], roomType: "", days: 0, foodTotal: 0, groomTotal: 0, roomTotalPrice: 0}
    }

    addNewDog = () => {
        this.setState({dogs: this.state.dogs.concat([{name:"", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}])});
    }

    removeDog = (idx: number) => () => {
        this.setState({dogs: this.state.dogs.filter((dog: IDog, dogIndex: number) => idx !== dogIndex)});
    }

    addDogName = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDog = this.state.dogs.map((dog: IDog, dogIndex: number) => 
            idx !== dogIndex ? dog : {...dog, name: event.target.value}
        );
        this.setState({dogs: newDog});
    }

    addBreedName = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBreed = this.state.dogs.map((dog: IDog, dogIndex: number) => 
            idx !== dogIndex ? dog : {...dog, breed: event.target.value}
        );
        this.setState({dogs: newBreed});
    }

    isFoodChecked = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkFood = this.state.dogs.map((dog: IDog, dogIndex: number) => {
            if (idx !== dogIndex) return dog;
            if (event.target.checked === true) {
                return {...dog, food: event.target.checked, foodPrice: 2}
            } else {
                return {...dog, food: event.target.checked, foodPrice: 0}
            }
        });
        this.setState({dogs: checkFood});
    }

    isGroomingChecked = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const groomCheck = this.state.dogs.map((dog: IDog, dogIndex: number) => {
            if (idx !== dogIndex) return dog;
            if (event.target.checked === true) {
                return {...dog, grooming: event.target.checked, groomPrice: 10}
            } else {
                return {...dog, grooming: event.target.checked, groomPrice: 0}
            }
        });
        this.setState({dogs: groomCheck});
    }

    handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({startDate: event.target.value})
    }

    handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({endDate: event.target.value}, () => this.calculateDays());
    }

    calculateDays = () => {
        const start = new Date(this.state.startDate);
        const end = new Date(this.state.endDate);
        const result = differenceInDays(end, start);
        this.setState({days: result});
    }

    render() {
        return (
            <div className="container pt-3">
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <label htmlFor="" className="mr-2">Staying from:</label>
                        <input type="date" value={this.state.startDate} onChange={this.handleStartDate} name="startDate" className="mr-2 p-1"/>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="" className="mr-2">To:</label>
                        <input type="date" value={this.state.endDate} onChange={this.handleEndDate} name="endDate" className="mr-2 p-1"/>
                    </div>
                    <div className="col-auto">
                        <select className="custom-select mr-sm-2">
                            <option selected>Choose a room...</option>
                            <option value="10">Single dog room</option>
                            <option value="15">Two dogs room</option>
                            <option value="18">Three dogs room </option>
                            <option value="20">Four dogs room</option>
                        </select>
                    </div>
                </div>
                {this.state.dogs.map((dog: IDog, idx: number) => {
                    return (
                        <div key={idx}>
                            <DogForm singleDog={dog} index={idx} changeName={this.addDogName(idx)} changeBreed={this.addBreedName(idx)} foodCheck={this.isFoodChecked(idx)} groomCheck={this.isGroomingChecked(idx)}/>
                            <button type="button" className="btn btn-danger" onClick={this.removeDog(idx)}>Remove Dog</button>
                        </div>
                )})}
                <button type="button" className="btn btn-success mt-1" onClick={this.addNewDog}>Add New Dog</button>
            </div>
        )
    }
} 

export default RoomForm;



// var parts ='2014-04-03'.split('-');
// // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
// // January - 0, February - 1, etc.
// var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
// console.log(mydate.toDateString());