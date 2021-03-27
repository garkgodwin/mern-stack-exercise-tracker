import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Exercise = props => {
    const myId = props.count;
    const linkStyle = {
        marginRight: "10px",
    }
    return(
        <tr>
            <th className="align-middle" scope="row">{myId}</th>
            <td className="align-middle">{props.exercise.username}</td>
            <td className="align-middle">{props.exercise.description}</td>
            <td className="align-middle">{props.exercise.duration}</td>
            <td className="align-middle">{props.exercise.date.substring(0, 10)}</td>
            <td className="align-middle">
                <Link className="btn btn-success" 
                    role="button"
                    style={linkStyle}  
                    to={"/edit/"+props.exercise._id}>
                    <i className="fa fa-edit" aria-hidden="true"></i>
                </Link>
                <button className="btn btn-danger"
                    onClick={ () => { props.deleteExercise(props.exercise._id) }}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    );
}


export default class ExerciseList extends Component {
    constructor(props){
        super(props);

        this.state = {
            exercises: [],
            modifiedExercises: [],
            username: '',
        }

        this.deleteExercise = this.deleteExercise.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises')
        .then( response => {
            this.setState({ 
                exercises: response.data,
                modifiedExercises: response.data,
            })
        })
        .catch( error => {
            console.log(error);
        })
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
        .then( response => {
            console.log(response.data)
        });

        this.setState({
            exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        })
    }
    
    handleOnChange(e){
        const modified = this.state.exercises;
        const username = e.target.value;
        this.setState({
            modifiedExercises: modified.filter( (mod) => {
                return mod.username.includes(username)
            }),
            username: username,
        })
    }


    exerciseList(){
        let count = 0;
        return this.state.modifiedExercises.map( exercise => {
            count++;
            return <Exercise exercise={exercise} 
                deleteExercise={this.deleteExercise}
                key={exercise._id}
                count={count}
                />
        })
    }


    render(){
        const count = this.state.modifiedExercises.length;
        return(
            <div>
                <h3>Logged Exercise</h3>
                <form className="form form-dark">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text"
                                className="form-control"
                                placeholder="Search username"
                                onChange={this.handleOnChange}
                            />
                        </div>
                    </div>
                </form>

                {count > 0 ?
                <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Description</th>
                            <th scope="col">Duration (in minutes)</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
                : <div className="alert alert-warning alert-dismissible fade show">
                    <strong>Error!</strong> There is no username that contains the text: {this.state.username}
                    </div>
                }
            </div>
        )
    }
}
