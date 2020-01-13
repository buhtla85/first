import React from 'react';

interface INavState {
    isOpen: boolean;
}


export default class Navbar extends React.Component<{}, INavState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false, 
        }
    }
   
    handleToggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    }
    
    render() {
        return (
            <React.Fragment>
                <div className={this.state.isOpen ? "topnav responsive" : "topnav"}>
                    <a href="#" ><span className="text-primary">FurBall</span> Hotel</a>
                    <a href="#" >Home</a>
                    <a href="#" >Bookings</a>
                    <a href="#" >Contact</a>
                    <button type="button" className="icon" onClick={this.handleToggle}>
                        <i className='fa fa-bars'></i>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}
