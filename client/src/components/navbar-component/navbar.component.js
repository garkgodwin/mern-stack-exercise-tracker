import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const hide = {
    display: "none",
}
const show = {
    display: "inline",
}

export default class Navbar extends Component{
    constructor(props){
        super(props);

        this.state = {
            hidden: false,
            style: show,
        }

        this.handleOnClick = this.handleOnClick.bind(this);
    }


    componentDidMount(){
        this.setState( {
            hidden: false,
            style: show,
        })
    }

    handleOnClick(e){
        if(this.state.hidden === false){
            this.setState({
                hidden: true,
                style: hide,
            });
        }
        else{
            this.setState({
                hidden: false,
                style: show,
            });
        }

    }
    
    render(){
        
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <button className="navbar-toggler" 
                    onClick={this.handleOnClick}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="navbar-brand">Exercise Tracker</Link>
                <div style={this.state.style}
                    className="collapse navbar-collapse" id="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}