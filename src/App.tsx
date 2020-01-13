import React, {Fragment} from 'react';
import './App.css';

//import Home from './pages/Home';
import Bookings from './pages/Bookings';
//import Contacts from './pages/Contacts';

const App: React.SFC = () => {
    return (
        <Fragment>
            <Bookings />
        </Fragment>
    )
}

export default App;
