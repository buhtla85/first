import React, {Fragment} from 'react';
import './App.css';

//import Home from './pages/Home';
//import Bookings from './pages/Bookings';
//import Contacts from './pages/Contacts';
//import ErrorPage from './pages/ErrorPage';
import DogForm from "./components/DogForm"

//import {Route, Switch} from 'react-router-dom';

const App: React.SFC = () => {
    return (
        <Fragment>
           <DogForm />
        </Fragment>
    )
}

export default App;
