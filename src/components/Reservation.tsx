import React, { Component } from 'react';
import RoomForm from "./RoomForm";
import { differenceInDays } from "date-fns";
import DogForm from './DogForm';


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
    dogs: IDog[], 
    dropDownText: string,
    days: number,
    errMessageDate: string,
    errMessageDogs: string,
    counter: number,
    roomPrice: number,
}

interface IStateRoom {
    rooms: IRoom[],
    ownerName: string,
    ownerEmail: string, 
    errMessage: string,
    errMessageName: string,
    errMessageMail: string,
    totalPrice: number 
}

export default class Reservation extends Component <{}, IStateRoom> {
    constructor(props: any) {
        super(props);
            this.state = {
                rooms: [{startDate: "", endDate: "", dogs: [{name: "", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}], dropDownText: "Chose a room...", days: 0, errMessageDate: "", errMessageDogs: "", counter: 0, roomPrice: 0}], 
                ownerName: "",
                ownerEmail: "",
                errMessage: "",
                errMessageName: "",
                errMessageMail: "",
                totalPrice: 0
        }
    }

    addRoom = () => {
        this.setState({rooms: this.state.rooms.concat([{startDate: "", endDate: "", days: 0, dogs: [{breed: "", name: "", groomPrice: 0, foodPrice: 0, grooming: false, food: false}], dropDownText: "Chose a room...", errMessageDogs: "", errMessageDate: "", counter: 0, roomPrice: 0}])});
    }

    removeRoom = (idx: number) => () => {
        this.setState({rooms: this.state.rooms.filter((room: IRoom, roomIdx: number) => idx !== roomIdx)});
    }

    addStartDate = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = this.state.rooms.map((room: IRoom, roomIdx: number) => 
            idx !== roomIdx ? room : {...room, startDate: event.target.value}
        );
        this.setState({rooms: newStartDate}, () => this.calculateDays(idx)); // this evaluates to NaN first when user inserts start date
    }

    addEndDate = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = this.state.rooms.map((room: IRoom, roomIndex: number) => 
            idx !== roomIndex ? room : {...room, endDate: event.target.value}
        );
        this.setState({rooms: newEndDate}, () => this.calculateDays(idx));
    }

    calculateDays = (idx: number) => {
        const start = new Date(this.state.rooms[idx].startDate);
        const end = new Date(this.state.rooms[idx].endDate);
        const result = differenceInDays(end, start);
        if (result <= 0) {
            const addErrorString = this.state.rooms.map((room: IRoom, roomIdx: number) =>
                idx !== roomIdx ? room : {...room, errMessageDate: "Invalid input. Please try again."}
            );
            this.setState({rooms: addErrorString});
            setTimeout(() => {
                const addEmptyString = this.state.rooms.map((room: IRoom, roomIdx: number) =>
                    idx !== roomIdx ? room : {...room, errMessageDate: ""}
                );
                this.setState({rooms: addEmptyString});
            }, 5000);
        } else {
            const addResult = this.state.rooms.map((room: IRoom, roomIdx: number) => 
                idx !== roomIdx ? room : {...room, days: result}
            );
            this.setState({rooms: addResult})
        }
    }

    handleDropdown = (idx: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        const price = event.target.value;
        if(typeof price === "string") {
            const selectedValue = this.state.rooms.map((room: IRoom, roomIdx: number) => 
                idx !== roomIdx ? room : {...room, roomPrice: parseInt(price)}
            );
            this.setState({rooms: selectedValue}, () => this.counterSetter(idx))
        }
    }

    counterSetter = (idx: number) => {
        switch(this.state.rooms[idx].roomPrice) {
            case 10:
                const counterValOne = this.state.rooms.map((room: IRoom, roomIdx: number) => idx !== roomIdx ? room : {...room, counter: 1});
                this.setState({rooms: counterValOne});
                break;
            case 15: 
                let counterValTwo = this.state.rooms.map((room: IRoom, roomIdx: number) => idx !== roomIdx ? room : {...room, counter: 2});
                this.setState({rooms: counterValTwo});
                break;
            case 18: 
                const counterValThree = this.state.rooms.map((room: IRoom, roomIdx: number) => idx !== roomIdx ? room : {...room, counter: 3});
                this.setState({rooms: counterValThree});
                break;
            case 20: 
                const counterValFour = this.state.rooms.map((room: IRoom, roomIdx: number) => idx !== roomIdx ? room : {...room, counter: 4});
                this.setState({rooms: counterValFour});
                break;
            default:
                const defaultVal = this.state.rooms.map((room: IRoom, roomIdx: number) => idx !== roomIdx ? room : {...room, counter: 0});
                this.setState({rooms: defaultVal});
        }
    }

    addDogName = (idx: number) => (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDog = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) {
                return room;
            } else {
                const newValue = room.dogs.map((dog: IDog, dogIdx: number) => index !== dogIdx ? dog : {...dog, name: event.target.value});
                const newItem = {...room, dogs: newValue};
                return newItem;
            }
        });
        this.setState({rooms: newDog});
    }

    addBreedName = (idx: number) => (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBreed = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) {
                return room;
            } else {
                const newVal = room.dogs.map((dog: IDog, dogIdx: number) => index !== dogIdx ? dog : {...dog, breed: event.target.value});
                const newItem = {...room, dogs: newVal};
                return newItem;
            }
        });
        this.setState({rooms: newBreed});
    }

    isFoodChecked = (idx: number) => (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const foodCheck = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) {
                return room;
            } else {
                const newValue = room.dogs.map((dog: IDog, dogIdx: number) => {
                    if (index !== dogIdx) return dog;
                    if (event.target.checked === true) {
                        return {...dog, food: event.target.checked, foodPrice: 2};
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

    isGroomingChecked = (idx: number) => (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const groomCheck = this.state.rooms.map((room: IRoom, roomIdx: number) => {
            if (idx !== roomIdx) {
                return room;
            } else {
                const newValue = room.dogs.map((dog: IDog, dogIdx: number) => {
                    if (index !== dogIdx) return dog;
                    if (event.target.checked === true) {
                        return {...dog, grooming: event.target.checked, groomPrice: 10};
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
                const newValue = room.dogs.concat([{name:"", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}]);
                const newItem = {...room, dogs: newValue};
                return newItem;
            } else if (room.dogs.length <= 0) {
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
    
    render() {
        return (
            <div className="container pt-3">
                <form action="" onSubmit={this.handleSubmit}>
                    {this.state.rooms.map((room: IRoom, idx: number) => {
                        return (
                            <div key={idx}>
                                <RoomForm singleRoom={room} index={idx} changeStartDate={this.addStartDate(idx)} changeEndDate={this.addEndDate(idx)} changeSelected={this.handleDropdown(idx)} handleDogName={this.addDogName(idx)} handleDogBreed={this.addBreedName(idx)} handleFood={this.isFoodChecked(idx)} handleGrooming={this.isGroomingChecked(idx)} handleAddingDogs={this.addNewDog(idx)} handleRemovingDogs={this.removeDog(idx)}/>
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
                        <p>{`Total price is ${this.state.totalPrice} dollars.`}</p>
                    </div>
            
                </form>
            </div>
        )
    }
}
