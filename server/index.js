const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());


//set mongo connection after middlewares
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true }   
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establised successfully.");

})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${port}`);
})
