import React, { Component } from 'react';

interface IDogObject {
    dogName: string,
    dogBreed: string,
    food: boolean,
    grooming: boolean,
    foodPrice: number,
    groomPrice: number
}

interface IStateDog {
    dogs: IDogObject[]
}

export default class DogForm extends Component<{}, IStateDog> {
    constructor(props: any) {
        super(props);
        this.state = {
            dogs: [
                {dogName: "", dogBreed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}
            ]
        }
    }
    
    addNewDog = () => {
        this.setState({
            dogs: this.state.dogs.concat([{dogName:"", dogBreed: "", food: false, grooming: false, foodPrice: 0, groomPrice: 0}])
        });
    }

    removeDog = (index: number) => () => {
        this.setState({
            dogs: this.state.dogs.filter((dog: IDogObject, dogIndex: number) => index !== dogIndex)
        })
    }

    handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDogs = this.state.dogs.map((dog: IDogObject, dogIndex: number) => {
            if (index !== dogIndex) return dog;
            return {...dog, [event.target.name]: event.target.value}
        });
        this.setState({dogs: newDogs})
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

    handleFoodCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDogs = this.state.dogs.map((dog: IDogObject, dogIndex: number) => {
            if (index !== dogIndex) return dog;

            if (event.target.checked === true) {
                return {...dog, food: event.target.checked, foodPrice: 2}
            } else {
                return {...dog, food: event.target.checked, foodPrice: 0}
            }
        });
        this.setState({dogs: newDogs})
    }

    handleGroomCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDogs = this.state.dogs.map((dog: IDogObject, dogIndex: number) => {
            if (index !== dogIndex) return dog;
           
            if (event.target.checked === true) {
                return {...dog, grooming: event.target.checked, groomPrice: 10}
            } else {
                return {...dog, grooming: event.target.checked, groomPrice: 0}
            }
        });
        this.setState({dogs: newDogs})
    }

    render() {
        return (
            <div className="flex-form">
                <form action="">
                   {this.state.dogs.map((dog:IDogObject, index: number) => {
                       let dogId = `dog-${index}`, breedId = `breed-${index}`
                       return (
                           <div key={index}>
                               <div className="form-group">
                                    <label htmlFor="dogName">{`Dog #${index + 1} name:`}</label>
                                    <input type="text" name="dogName" id={dogId} data-id={index} className="form-control dogName" onChange={this.handleChange(index)}/>
                               </div>
                               <div className="form-group">
                                    <label htmlFor="dogBreed">Breed: </label>
                                    <input type="text" name="dogBreed" id={breedId} data-id={index} className="form-control dogBreed" onChange={this.handleChange(index)}/>
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
