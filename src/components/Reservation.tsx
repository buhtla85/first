import React, { Component } from 'react';
import RoomForm from "./RoomForm";
import { differenceInDays } from "date-fns";
import { number } from 'prop-types';


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
    roomPrice: number  
}

interface IStateRoom {
    rooms: IRoom[],
    ownerName: string,
    ownerEmail: string, 
    totalPrice: number 
}

export default class Reservation extends Component <{}, IStateRoom> {
    constructor(props: any) {
        super(props);
            this.state = {
                rooms: [{startDate: "", endDate: "", dogs: [{name: "", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}], dropDownText: "Chose a room...", days: 0, errMessageDate: "", errMessageDogs: "", counter: 0, roomPrice: 0}], 
                ownerName: "",
                ownerEmail: "",
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
        this.setState({rooms: newStartDate});
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
            this.setState({rooms: selectedValue})
        }
    }
    
    render() {
        return (
            <div className="container pt-3">
                <form action="">
                    {this.state.rooms.map((room: IRoom, idx: number) => {
                        return (
                            <div key={idx}>
                                <RoomForm singleRoom={room} index={idx} changeStartDate={this.addStartDate(idx)} changeEndDate={this.addEndDate(idx)} changeSelected={this.handleDropdown(idx)}/>
                                <button type="button" className="btn btn-outline-danger" onClick={this.removeRoom(idx)}>Remove Room</button>
                            </div>
                        )
                    })}
                    <button type="button" className="btn btn-outline-success mt-1" onClick={this.addRoom}>Add New Room</button>
                </form>
            </div>
        )
    }
}
