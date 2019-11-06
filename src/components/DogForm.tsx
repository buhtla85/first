import React, { Component } from 'react';
import { differenceInDays } from "date-fns";

interface IDog {
    name: string,
    breed: string,
    food: boolean,
    grooming: boolean,
    foodPrice: number,
    groomPrice: number
}

interface IStateDog {
    dogs: IDog[]
}

//ovo je single dog - samo IDogObject

export default class DogForm extends Component<{}, IStateDog> {
    constructor(props: any) {
        super(props);
        this.state = {
            dogs: [
                {name: "", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}
            ]
        }
    }
    
    addNewDog = () => {
        this.setState({
            dogs: this.state.dogs.concat([{name:"", breed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}])
        });
    }  

    removeDog = (index: number) => () => {
        this.setState({
            dogs: this.state.dogs.filter((dog: IDog, dogIndex: number) => index !== dogIndex)
        })
    } // if we store in the state two dog objects, but want to remove first, an error ocurs 
    // UPDATE: error fixed - just needed to bind value of the user input in the markup

    handleNameChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDog = this.state.dogs.map((dog: IDog, dogIndex: number) => 
            index !== dogIndex ? dog : {...dog, name: event.target.value}
        );
        this.setState({dogs: newDog});

        // if ("form-control dogName".includes(event.target.className) || "form-control dogBreed".includes(event.target.className)) {
        //     let newDogs = [...this.state.dogs];
        //     newDogs[event.target.dataset.id][event.target.className] = event.target.value
        // }
        //this.setState({...this.state, [event.target.name]: event.target.value}); 
        // const newName = event.target.value;
        // const dogsCopy = [...this.state.dogs];
        // const firstPropDog = {...dogsCopy[1]};
        // firstPropDog.dogName = newName;
        // dogsCopy[1] = firstPropDog;
    }

    handleBreedChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDog = this.state.dogs.map((dog: IDog, dogIndex: number) => {
            if (index !== dogIndex) return dog;
            return {...dog, breed: event.target.value}
        });
        this.setState({dogs: newDog})
    }

    handleFoodCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDog = this.state.dogs.map((dog: IDog, dogIndex: number) => {
            if (index !== dogIndex) return dog;

            if (event.target.checked === true) {
                return {...dog, food: event.target.checked, foodPrice: 2}
            } else {
                return {...dog, food: event.target.checked, foodPrice: 0}
            }
        });
        this.setState({dogs: newDog})
    }

    handleGroomCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDog = this.state.dogs.map((dog: IDog, dogIndex: number) => {
            if (index !== dogIndex) return dog;
           
            if (event.target.checked === true) {
                return {...dog, grooming: event.target.checked, groomPrice: 10}
            } else {
                return {...dog, grooming: event.target.checked, groomPrice: 0}
            }
        });
        this.setState({dogs: newDog})
    }

    render() {
        return (
            <div className="flex-form">
                <form action="">
                   {this.state.dogs.map((dog:IDog, index: number) => {
                       let dogId = `dog-${index}`, breedId = `breed-${index}`
                       return (
                           <div key={index}>
                               <div className="form-group">
                                    <label htmlFor="dogName">{`Dog #${index + 1} name:`}</label>
                                    <input type="text" value={dog.name} name="dogName" id={dogId} data-id={index} className="form-control dogName" onChange={this.handleNameChange(index)}/>
                               </div>
                               <div className="form-group">
                                    <label htmlFor="dogBreed">Breed: </label>
                                    <input type="text" value={dog.breed} name="dogBreed" id={breedId} data-id={index} className="form-control dogBreed" onChange={this.handleBreedChange(index)}/>
                               </div>
                               <div className="form-group form-check">
                                   <input type="checkbox" checked={dog.food} name="food" className="form-check-input" onChange={this.handleFoodCheck(index)}/>
                                   <label htmlFor="food" className="form-check-label">Our Food (2$ per day)</label>
                               </div>
                               <div className="form-group form-check">
                                   <input type="checkbox" checked={dog.grooming} name="grooming" className="form-check-input" onChange={this.handleGroomCheck(index)}/>
                                   <label htmlFor="groom" className="form-check-label">Grooming (10$ per stay)</label>
                               </div>
                               <button type="button" className="btn btn-danger" onClick={this.removeDog(index)}>Remove Dog</button>
                           </div>
                       )
                   })}
                   <button type="button" className="btn btn-success mt-1" onClick={this.addNewDog}>Add New Dog</button>
                </form>
            </div>
        )
    }
}
