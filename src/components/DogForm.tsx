import React, { Component } from 'react';

//this is a single dog! you will need to define an interface for props as well (index), but props will be passed down from Room component

export interface IDogProp {
    singleDog: {name: string, breed: string, food: boolean, grooming: boolean, foodPrice: number, groomPrice: number},
    index: number,
    changeName: (event: React.ChangeEvent<HTMLInputElement>) => void,
    changeBreed: (event: React.ChangeEvent<HTMLInputElement>) => void,
    foodCheck: (event: React.ChangeEvent<HTMLInputElement>) => void,
    groomCheck: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default class DogForm extends Component<IDogProp, {}> {
    constructor(props: IDogProp) {
        super(props);
    }

    render() {
        return (
            <div className="pt-3">
                <div className="form-group">
                    <label htmlFor="name">{`Dog #${this.props.index + 1} name:`}</label>
                    <input type="text" name="name" value={this.props.singleDog.name} onChange={this.props.changeName} className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="breed">Breed: </label>
                    <input type="text" name="breed" value={this.props.singleDog.breed} onChange={this.props.changeBreed} className="form-control"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" checked={this.props.singleDog.food} name="food" onChange={this.props.foodCheck} className="form-check-label"/>
                    <label htmlFor="food">Our Food (2$ per day)</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" checked={this.props.singleDog.grooming} name="grooming" onChange={this.props.groomCheck} className="form-check-label"/>
                    <label htmlFor="grooming">Grooming (10$ per stay)</label>
                </div>
            </div>
        )
    }
}
