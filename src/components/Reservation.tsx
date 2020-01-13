import React, { Component } from 'react';
import RoomForm, { IRoom } from "./RoomForm";
import { differenceInDays } from "date-fns";
import { IDog } from './DogForm';

interface IStateRoom {
    rooms: IRoom[],
    ownerName: string,
    ownerEmail: string, 
    errMessage: string,
    errMessageName: string,
    errMessageMail: string,
    totalPrice: number, 
    dogServicesPricing: {
        foodPrice: number,
        groomPrice: number
    },
    roomPricing: { 1: number, 2: number, 3: number, 4: number }
}

function createDog(): IDog {
    return {name: "", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0};
}
function createRoom(counter: number, roomPrice: number): IRoom {
    return {startDate: "", endDate: "", dogs: [createDog()], dropDownText: "Chose a room...", days: 0, errMessageDate: "", errMessageDogs: "", counter, roomPrice };
}

export default class Reservation extends Component <{}, IStateRoom> {
    constructor(props: any) {
        super(props);
            this.state = {
                rooms: [createRoom(0,0)],
                ownerName: "",
                ownerEmail: "",
                errMessage: "",
                errMessageName: "",
                errMessageMail: "",
                totalPrice: 0,
                dogServicesPricing: {
                    foodPrice: 0,
                    groomPrice: 0
                },
                roomPricing: { 1: 10, 2: 15, 3: 18, 4: 20 }
        }
    }

    addRoom = () => {
        this.setState({rooms: this.state.rooms.concat([createRoom(0,0)])});
    }

    removeRoom = (idx: number) => () => {
        this.setState({rooms: this.state.rooms.filter((room: IRoom, roomIdx: number) => idx !== roomIdx)});
    }

    handleDateInputs = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = this.state.rooms.map((room: IRoom, roomIdx: number) => idx !== roomIdx ? room : {...room, [event.target.name]: event.target.value});
        this.setState({rooms: date}, () => this.calculateDays(idx));
    } // two functions turned into this one with the help of [event.target.name]

    calculateDays = (idx: number) => {
        const start = new Date(this.state.rooms[idx].startDate);
        const end = new Date(this.state.rooms[idx].endDate);
        const result = differenceInDays(end, start);
        if (result <= 0) {
            this.handleInvalidDatesString(idx, "Invalid input. Please try again.", "errMessageDate");
            setTimeout(() => {
                this.handleInvalidDatesString(idx, "", "errMessageDate");
            }, 5000);
        } else {
            const addResult = this.state.rooms.map((room: IRoom, roomIdx: number) => 
                idx !== roomIdx ? room : {...room, days: result}
            );
            this.setState({rooms: addResult});
        }
    }

    handleInvalidDatesString = (index: number, val: string, key: string) => {
        const addString = this.state.rooms.map((room: IRoom, roomIdx: number) => index !== roomIdx ? room : {...room, [key]: val});
        this.setState({rooms: addString});
    }

    handleSelectRoom = (idx: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(typeof event.target.value === "string") {
        const capacity = parseInt(event.target.value) as 1 | 2 | 3 | 4;
        const price = this.state.roomPricing[capacity];
        const selectedValue = this.state.rooms.map((room: IRoom, roomIdx: number) => 
            idx !== roomIdx ? room : {...room, roomPrice: price, counter: capacity}
        );
        this.setState({rooms: selectedValue});
        }
    }

    handleAddingDogNameAndBreed = (idx: number) => (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDog = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) {
                return room;
            } else {
                const newValue = room.dogs.map((dog: IDog, dogIdx: number) => index !== dogIdx ? dog : {...dog, [event.target.name]: event.target.value});
                const newItem = {...room, dogs: newValue};
                return newItem;
            }
        });
        this.setState({rooms: newDog});
    } // two functions turned into this one with the help of [event.target.name]

    isFoodChecked = (price: number) => (idx: number) => (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const foodCheck = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) {
                return room;
            } else {
                const newValue = room.dogs.map((dog: IDog, dogIdx: number) => {
                    if (index !== dogIdx) return dog;
                    if (event.target.checked === true) {
                        return {...dog, food: event.target.checked, foodPrice: price};
                    } else {
                        return {...dog, food: event.target.checked, foodPrice: 0};
                    }
                });
                const newItem = {...room, dogs: newValue};
                return newItem;
            }
        });
        this.setState({rooms: foodCheck});
    }

    isGroomingChecked = (price: number) => (idx: number) => (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const groomCheck = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) {
                return room;
            } else {
                const newValue = room.dogs.map((dog: IDog, dogIdx: number) => {
                    if (index !== dogIdx) return dog;
                    if (event.target.checked === true) {
                        return {...dog, grooming: event.target.checked, groomPrice: price};
                    } else {
                        return {...dog, grooming: event.target.checked, groomPrice: 0};
                    }
                });
                const newItem = {...room, dogs: newValue};
                return newItem;
            }
        });
        this.setState({rooms: groomCheck});
    }

    addNewDog = (idx: number) => () => { //there are some problems with this function - code inconsistencies 
        const addDog = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) return room;
            
            if (room.dogs.length <= room.counter - 1) {
                const newValue = room.dogs.concat([createDog()]);
                const newItem = {...room, dogs: newValue};
                return newItem;
            } else if (room.dogs.length <= 1) {
                const newValue = {...room, errMessageDogs: "Please be sure to chose a room type first."};
                setTimeout(() => {
                    const addEmptyString = this.state.rooms.map((room: IRoom, roomIdx: number) => 
                        idx !== roomIdx ? room : {...room, errMessageDogs: ""}
                    );
                    this.setState({rooms: addEmptyString})
                }, 5000);
                const newItem = newValue;
                return newItem;
            } else {
                const newValue = {...room, errMessageDogs: "Maximum number of dogs for selected room exceeded."};
                setTimeout(() => {
                    const addEmptyString = this.state.rooms.map((room: IRoom, roomIdx: number) => 
                        idx !== roomIdx ? room : {...room, errMessageDogs: ""}
                    );
                    this.setState({rooms: addEmptyString});
                }, 5000);
                const newItem = newValue;
                return newItem;
            }
        });
        this.setState({rooms: addDog})
    }

    removeDog = (idx: number) => (index: number) => () => {
        const removeDogs = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) {
                return room;
            } else {
                const newValue = room.dogs.filter((dog: IDog, dogIdx: number) => index !== dogIdx);
                const newItem = {...room, dogs: newValue};
                return newItem;
            }
        });
        this.setState({rooms: removeDogs})
    }

    addOwnerName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ownerName: event.target.value}) 
    }

    addOwnerEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ownerEmail: event.target.value}) 
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.validateName(this.state.ownerName);
        this.validateEmail(this.state.ownerEmail);
        if (this.state.rooms.length <= 0) {
            this.setState({errMessage: "Please be sure to add a room first."});
            setTimeout(() => {
                this.setState({errMessage: ""});
            }, 5000);
        }

        const price = this.state.rooms.reduce((acc: number, room: IRoom, currRoom: number, arr: IRoom[]): number => {
            let val: number = 0;

            if (room.days == 0 || room.roomPrice <= 0) {
                this.setState({errMessage: "Please be sure to select dates and/or room type."});
                setTimeout(() => {
                    this.setState({errMessage: ""});
                }, 5000);
            } else {
                const dogValueGroom = arr[currRoom].dogs.reduce((acc: number, dog: IDog, currDog: number, arrDog: IDog[]): number => {
                    let zeroValGroom: number = 0;
                    zeroValGroom = zeroValGroom + acc + dog.groomPrice;
                    return zeroValGroom;
                }, 0);
                const dogValueFood = arr[currRoom].dogs.reduce((acc: number, dog: IDog, currDog: number, arrDog: IDog[]): number => {
                    let zeroValFood: number = 0;
                    zeroValFood = zeroValFood + acc + dog.foodPrice;
                    return zeroValFood;
                }, 0);
                val = val + acc + room.days * room.roomPrice + (dogValueGroom + (room.days * dogValueFood));
                return val;
            } 
            return val;
        }, 0);
        this.setState({totalPrice: price})
    }

    validateName = (userName: string) => {
        if (userName.length < 2) {
            this.setState({errMessageName: "Invalid input. Name should be at least 2 characters long."});
            setTimeout(() => {
                this.setState({errMessageName: ""});
            }, 4000)
        }
    }

    validateEmail = (userEmail: string) => { // it did not work with includes('@') probably due to bootstrap scripts 
        if (userEmail.length == 0) {
            this.setState({errMessageMail: "Invalid input. Please enter a valid email."});
            setTimeout(() => {
                this.setState({errMessageMail: ""});
            }, 4000);
        }
    }

    fetchPrices = () => {
        return Promise.resolve({groomPrice: 10, foodPrice: 2});
    }

    async componentDidMount() {
        const prices = await this.fetchPrices();
        this.setState({dogServicesPricing: prices});
    }
    
    render() {
        return (
            <div className="container pt-3">
                <form action="" onSubmit={this.handleSubmit}>
                    {this.state.rooms.map((room: IRoom, idx: number) => {
                        return (
                            <div key={idx}>
                                <RoomForm 
                                    singleRoom={room} 
                                    index={idx} 
                                    changeDates={this.handleDateInputs(idx)} 
                                    changeSelected={this.handleSelectRoom(idx)} 
                                    changeDogAndBreed={this.handleAddingDogNameAndBreed(idx)} 
                                    handleFood={this.isFoodChecked(this.state.dogServicesPricing.foodPrice)(idx)} 
                                    handleGrooming={this.isGroomingChecked(this.state.dogServicesPricing.groomPrice)(idx)} 
                                    handleAddingDogs={this.addNewDog(idx)} 
                                    handleRemovingDogs={this.removeDog(idx)}/>
                                <button type="button" className="btn btn-outline-danger" onClick={this.removeRoom(idx)}>Remove Room</button>
                            </div>
                        )
                    })}
                    <button type="button" className="btn btn-outline-success mt-1" onClick={this.addRoom}>Add New Room</button>
                    <div className="container pt-2">
                        <div className="form-group">
                            <label htmlFor="ownerName">Owner's Name: </label>
                            <input type="text" name="ownerName" onChange={this.addOwnerName} value={this.state.ownerName} className="form-control"/>
                            <p className="text-danger">{this.state.errMessageName}</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ownerEmail">Email: </label>
                            <input type="email" name="ownerEmail" onChange={this.addOwnerEmail} value={this.state.ownerEmail} className="form-control"/>
                            <p className="text-danger">{this.state.errMessageMail}</p>
                        </div>
                        <p className="text-danger">{this.state.errMessage}</p>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success mt-2">Submit</button>
                        </div>
                        <p>{`Total price is ${this.state.rooms.reduce((total, room) => total + (room.roomPrice + room.dogs.reduce((subtotal, dog) => subtotal + dog.foodPrice, 0)) * room.days, 0)} dollars.`}</p>
                    </div>
            
                </form>
            </div>
        )
    }
}
