import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';


export default class CreateExercise extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
        }

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    //LIFECYCLES
    componentDidMount(){
        axios.get('http://localhost:5000/users')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username,
                })
            }
            else{
                this.setState({
                    users: [],
                    username: '',
                })
            }
        })
    }


    onChangeUserName(e){
        this.setState( { username: e.target.value, } );
    }
    onChangeDescription(e){
        this.setState( { description: e.target.value, } );
    }
    onChangeDuration(e){
        this.setState( { duration: e.target.value, } );
    }
    onChangeDate(date){
        this.setState( { date: date} );
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
        .then( res => console.log(res.data) );

        window.location = '/';
    }


    

    render(){

        const isNone = () => {
            if(this.state.users.length === undefined){
                return true;
            }
            else{
                return (this.state.users.length >= 0 ? false : true)
            }
        }

        const NoUserWarning = () => {
            if(isNone()){
                return(
                    <div className="alert alert-danger" role="alert">
                        Cannot do anything without a user.
                        Please add one now.
                    </div>
                );
            }
            else{
                return(null);
            }
        }
    
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <NoUserWarning/>
                    <fieldset disabled={isNone()}>
                        <div className="form-group">
                            <label>Username: </label>
                            <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUserName}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option key={user}
                                            value={user}>
                                            {user}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration (in-minutes): </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date: </label>
                            <div>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                        <input type="submit"
                            value="Create Exercise Log"
                            className="btn btn-primary"
                        />
                    </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}
