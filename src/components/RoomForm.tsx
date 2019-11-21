import React from 'react';
import DogForm from "./DogForm";
import { differenceInDays } from "date-fns";

 interface IDog {
    name: string,
    breed: string,
    food: boolean,
    grooming: boolean,
    foodPrice: number,
    groomPrice: number
}

interface IRoomProp {
    singleRoom: {
        startDate: string,
        endDate: string,
        dogs: IDog[], 
        dropDownText: string,
        days: number,
        errMessageDate: string,
        errMessageDogs: string,
        counter: number,
        roomPrice: number, 
    },
    index: number,
    changeStartDate: (event: React.ChangeEvent<HTMLInputElement>) => void,
    changeEndDate: (event: React.ChangeEvent<HTMLInputElement>) => void,
    changeSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    handleDogName: (index:number) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleDogBreed: (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleFood: (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleGrooming: (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleAddingDogs: (event: React.MouseEvent<HTMLButtonElement>) => void,
    handleRemovingDogs: (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => void
}

class RoomForm extends React.Component<IRoomProp, {}> {
    constructor(props:IRoomProp) {
        super(props);
    }
    // addNewDog = () => {
    //     if (this.props.singleRoom.dogs.length <= this.props.singleRoom.counter - 1) {
    //         this.setState({dogs: this.props.singleRoom.dogs.concat([{name:"", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}])});
    //     } else {
    //         this.setState({errMessageDogs: "Maximum number of dogs for selected room exceeded."});
    //         setTimeout(() => {
    //             this.setState({errMessageDogs: ""})
    //         }, 5000);
    //     }
    // }

    // removeDog = (idx: number) => () => {
    //     this.setState({dogs: this.props.singleRoom.dogs.filter((dog: IDog, dogIndex: number) => idx !== dogIndex)});
    // }

    // addDogName = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newDog = this.props.singleRoom.dogs.map((dog: IDog, dogIndex: number) => 
    //         idx !== dogIndex ? dog : {...dog, name: event.target.value}
    //     );
    //     this.setState({dogs: newDog});
    // }

    // addBreedName = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newBreed = this.props.singleRoom.dogs.map((dog: IDog, dogIndex: number) => 
    //         idx !== dogIndex ? dog : {...dog, breed: event.target.value}
    //     );
    //     this.setState({dogs: newBreed});
    // }

    // isFoodChecked = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const checkFood = this.props.singleRoom.dogs.map((dog: IDog, dogIndex: number) => {
    //         if (idx !== dogIndex) return dog;
    //         if (event.target.checked === true) {
    //             return {...dog, food: event.target.checked, foodPrice: 2}
    //         } else {
    //             return {...dog, food: event.target.checked, foodPrice: 0}
    //         }
    //     });
    //     this.setState({dogs: checkFood});
    // }

    // isGroomingChecked = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const groomCheck = this.props.singleRoom.dogs.map((dog: IDog, dogIndex: number) => {
    //         if (idx !== dogIndex) return dog;
    //         if (event.target.checked === true) {
    //             return {...dog, grooming: event.target.checked, groomPrice: 10}
    //         } else {
    //             return {...dog, grooming: event.target.checked, groomPrice: 0}
    //         }
    //     });
    //     this.setState({dogs: groomCheck});
    // }

    // handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const price = event.target.value;
    //     if(typeof price === "string") {
    //         this.setState({roomPrice: parseInt(price)}, () => this.counterRegulator());
    //     }
    // }

    // counterRegulator = () => {
    //     switch (this.props.singleRoom.roomPrice) {
    //         case 10:
    //             this.setState({counter: 1});
    //             break;
    //         case 15:
    //             this.setState({counter: 2});
    //             break;
    //         case 18:
    //             this.setState({counter: 3});
    //             break;
    //         case 20:
    //             this.setState({counter: 4});
    //             break;
    //         default:
    //             this.setState({counter: 0})    
    //     }
    // }

    render() {
        return (
            <div className="container pt-3">
                <h4>{`Room #${this.props.index + 1}`}</h4>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <label htmlFor="" className="mr-2">Staying from:</label>
                        <input type="date" value={this.props.singleRoom.startDate} onChange={this.props.changeStartDate} name="startDate" className="mr-2 p-1"/>
                    </div>
                    {this.props.singleRoom.startDate === "" ? "" : <div className="col-auto">
                        <label htmlFor="" className="mr-2">To:</label>
                        <input type="date" value={this.props.singleRoom.endDate} onChange={this.props.changeEndDate} name="endDate" className="mr-2 p-1"/>
                    </div>}
                    <p className="text-danger">{this.props.singleRoom.errMessageDate}</p>
                    <div className="col-auto">
                        <select className="custom-select mr-sm-2" onChange={this.props.changeSelected}>
                            <option>{this.props.singleRoom.dropDownText}</option>
                            <option value="10">Single dog room</option>
                            <option value="15">Two dogs room</option>
                            <option value="18">Three dogs room </option>
                            <option value="20">Four dogs room</option>
                        </select>
                    </div>
                </div>
                {this.props.singleRoom.dogs.map((dog: IDog, idx: number) => {
                    return (
                        <div key={idx}>
                            <DogForm singleDog={dog} index={idx} changeName={this.props.handleDogName(idx)} changeBreed={this.props.handleDogBreed(idx)} foodCheck={this.props.handleFood(idx)} groomCheck={this.props.handleGrooming(idx)}/>
                            <button type="button" className="btn btn-danger" onClick={this.props.handleRemovingDogs(idx)}>Remove Dog</button>
                        </div>
                )})}
                <button type="button" className="btn btn-success mt-1" onClick={this.props.handleAddingDogs}>Add New Dog</button>
                <p className="text-danger">{this.props.singleRoom.errMessageDogs}</p>
            </div>
        )
    }
} 

export default RoomForm;



