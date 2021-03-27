import React, { Component } from 'react';
import UserForm from './form.component';

export default class CreateUser extends Component {
    render(){

        return(
            <div>
                <h3>Create New User</h3>
                <UserForm/>
            </div>
        )
    }
}
