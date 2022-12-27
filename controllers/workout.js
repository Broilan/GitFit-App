const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');
const { response } = require('express');
const apiKey = process.env.API_KEY;
const appId = process.env.APP_ID;

router.get('/', isLoggedIn, (req, res) => {
    res.render("workout")
    })


    // create workouts routes
    router.get('/workouts', isLoggedIn, (req, res) => {
        db.workouts.findAll({
            where: {
                userId: "1"
            },
            
        })
            .then(workoutsZ => {
                res.render('workouts', {
                    workoutsZ: workoutsZ,
    
                })
            })
            .catch(error => {
                console.log(error)
            })
        });

// router.post('/workouts', isLoggedIn, (req, res) => {
//     const createdDate = new Date().toISOString();
//     db.workouts.create({
//         exercises: req.body.exercises,
//         exerciseQuantity: parseInt(req.body.exerciseQuantity),
//         createdAt: createdDate,
//         updatedAt: createdDate
//     })
//     .then((response) => {
//         res.redirect(`/workout/workouts`)
//         console.log(response)
//       })
//       .catch((error) => {
//         console.log(error)
//         res.status(400).render('404')
//       })
//     })

    router.post('/workouts', isLoggedIn, (req, res) => {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/name/${req.body.exercise}`,
            headers: {
              'X-RapidAPI-Key': 'f7d48fb0e1mshd7d532f42932e20p122769jsn483c5983c669',
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
          };
          axios.request(options)
          .then((response) => {
            const date = new Date().toISOString()
            console.log("the returned data ===>", response.data)
            const workoutArray = response.data
            workoutArray.forEach(workout =>             
                db.workouts.create({
            userId: req.user.id,
            bodyPart: workout.bodyPart,
            equipment: workout.equipment,
            gifURL: workout.gifUrl,
            name: workout.name,
            target: workout.target,
            createdAt: date,
            updatedAt: date
    })
        .then(create => {
        res.redirect('/workout/workouts')
    })
    .catch(error => {
        console.log(error)
    })
    )
 
    })    
     .catch((error) => {
        console.log(error)
        res.status(400).render('404')
      })
})

router.delete("/workouts/:id", isLoggedIn, async (req, res) => {
    try {
       let deleteWorkout = await db.workouts.destroy({
        where: { id: parseInt(req.params.id)}
        })
        res.redirect("/workout/workouts")
    } catch (error) {
          console.log('*********************ERROR***********************');
          console.log(error);
          console.log('**************************************************');
            res.redirect("/workout/workouts")
    }
})




router.get('/learnabout', isLoggedIn, (req, res) => {
res.render("learnabout")
})

module.exports = router;