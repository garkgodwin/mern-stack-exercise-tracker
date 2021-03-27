import React, { useState } from 'react';
import axios from 'axios';

function UserForm(){
    const [username, setUsername] = useState('')
    const [warning, setWarning] = useState('');

    const onChangeUsername = (e) =>{
        setUsername(e.target.value)
        setWarning('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username
        };
        axios.post('http://localhost:5000/users/add', user)
        .then( (res) => {
            const resData = res.data;
            if(resData.name === "ValidationError"){
                const kind = resData.errors.username.kind;
                if(kind === "minlength"){
                    setWarning('The minimum allowed length is 3 characters.')
                }
            }
            else if(resData.name === "MongoError"){
                const code = resData.code;
                if(code === 11000){
                    //means mongo data exist
                    setWarning('This username already exist')
                }
            }
            else if(resData === "User added"){
                setUsername('');
                setWarning('');
                window.location = '/';
            }   
        })
    }

    const WarningMessage = () => {
        const warn = warning;
        if(warning === ''){
            return null;
        }
        return (
            <div className="col-sm-4 alert alert-danger" role="alert">
                <small id="usernameHelp">
                    {warn}
                </small>
            </div>
        ); 
    }

    return(
        <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label>Username:</label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={username}
                            onChange={onChangeUsername}
                        />
            </div>   
            
            <div className="form-group">

                     <input type="submit"
                            value="Create User"
                            className="btn btn-primary form-control col-sm-4"
                        />  
                        
            </div>
            <div className="form-group">
                
                <WarningMessage/>
            </div>
            
     
        </form>
    )
}


export default UserForm;