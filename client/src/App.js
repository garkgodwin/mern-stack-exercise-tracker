import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"; 

import Navbar from "./components/navbar-component/navbar.component";
import ExerciseList from './components/exercise-component/exercises-list.component';
import EditExercise from './components/exercise-component/edit-exercise.component';
import CreateExercise from './components/exercise-component/create-exercise.component';
import CreateUser from './components/user-component/create-user.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" exact component={EditExercise}/>
        <Route path="/create" exact component={CreateExercise}/>
        <Route path="/users" exact component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
