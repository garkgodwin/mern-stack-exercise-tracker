const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//HOME EXERCISE WITH GET REQUEST
router.route('/').get((req, res) => {
     Exercise.find()
         .then( exercises => res.json(exercises))
         .catch( err => res.stats(400).json('Error: ' + err));
 });


//ADD ROUTE WITH POST REQUEST
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then( () => res.json('Exercise added') )
        .catch( err => res.status(400).json('Error: ' + err) );
});

//HOME ROUTE WTIH ID PARAMS AND GET REQUEST
router.route('/:id').get( (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE WITH GIVEN ID
router.route('/:id').delete( (req, res) => {
    Exercise.findByIdAndDelete( req.params.id )
    .then( () => res.json('Exercise deleted') )
    .catch( err => res.status(400).json('Error: ' + err) );
});

//UPDATE WITH GIVEN ID
router.route('/update/:id').patch( (req, res) => {
    Exercise.findById( req.params.id )
    .then( exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then( () => res.json('Exercise updated') )
        .catch( err => res.status(400).json('Error: ' + err))
    })
    .catch( err => res.status(400).json('Error: ' + err) )
})

module.exports = router;