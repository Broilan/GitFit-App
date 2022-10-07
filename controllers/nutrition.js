const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');
const { response } = require('express');
const methodOverride = require('method-override')
const apiKey = process.env.API_KEY;
const appId = process.env.APP_ID;

router.use(methodOverride("_method"));


router.get('/', isLoggedIn, (req, res) => {
    db.nutrition.findAll({
        where: {
            userId: req.user.id
        },
        
    })
        .then(nutritions => {
            res.render('nutrition', {
                nutritions: nutritions,

            })
        })
        .catch(error => {
            console.log(error)
        })
    });


    router.get('/:id', isLoggedIn, (req, res) => {
        db.nutrition.findOne({
            where: {
                userId: req.user.id
            },
            include: [ {
                model: db.comments,
                include: [
                    db.user
                ]

            }
        ]
        
        })
        
            .then(nutrition => {
                res.render('details', {
                    nutrition: nutrition,
    
                })
            })
            .catch(error => {
                console.log(error)
                res.redirect("404")
            })
        });


//nutrition post route
router.post('/', isLoggedIn, (req, res) => {
    axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${apiKey}&nutrition-type=logging&ingr=${req.body.ingredient}`)
    .then(response => {
        if (response.status !== 200) throw Error
        const nutrition = response.data;
        const date = new Date().toISOString()
        db.nutrition.create({
            userId: req.user.id,
            name: req.body.ingredient,
            calories: nutrition.totalNutrients.ENERC_KCAL.quantity, 
            fats: nutrition.totalNutrients.FAT.quantity,
            carbs: nutrition.totalNutrients.CHOCDF.quantity,
            protein: nutrition.totalNutrients.PROCNT.quantity,
            createdAt: date,
            updatedAt: date
        }) 
        .then(create => {
            res.redirect('/nutrition')
        })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    })
});

// comment on nutrition post route
router.post('/:id/comment', isLoggedIn, (req, res) => {
    const createdDate = new Date().toISOString();
    db.comments.create({
        nutritionId: parseInt(req.params.id),
        userId: req.user.id,
        comment: req.body.comment,
        createdAt: createdDate,
        updatedAt: createdDate
    })
    .then((comment) => {
      if (!comment) throw Error()
      res.redirect(`/nutrition/${req.params.id}`)
    })
    
    
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })


router.get("/:id", isLoggedIn, async (req, res) => {
    try {
       let findNutrition = await db.nutrition.name({
        where: { id: req.params.id}
        })
        res.redirect("/nutrition/:id")
    } catch (error) {
          console.log('*********************ERROR***********************');
          console.log(error);
          console.log('**************************************************');
            res.redirect("/nutrition")
    }
})


//nutrition delete route
router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
       let deleteNutrition = await db.nutrition.destroy({
        where: { id: parseInt(req.params.id)}
        })
        res.redirect("/nutrition")
    } catch (error) {
          console.log('*********************ERROR***********************');
          console.log(error);
          console.log('**************************************************');
            res.redirect("/nutrition")
    }
})



//delete comments
router.delete("/:id/comment/:commentid", isLoggedIn, async (req, res) => {
    try {
       let deleteComment = await db.comments.destroy({
        where: { id: parseInt(req.params.commentid)}
        })
        res.redirect(`/nutrition/${req.params.id}`)
    } catch (error) {
          console.log('*********************ERROR***********************');
          console.log(error);
          console.log('**************************************************');
            res.redirect("/nutrition")
    }
})

//put route to check if food is enjoyable
router.put('/', (req, res) => {
    const checkboxBodyKey = Object.keys(req.body)[0];
    console.log(`PUT checkbox submit test request produced:`);
    console.log(`${checkboxBodyKey}: ${req.body[checkboxBodyKey]}`);
    checkbox1 = req.body['check1'] ? true: false;
    res.redirect('/nutrition');
})


  





module.exports = router;