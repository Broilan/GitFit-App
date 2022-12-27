const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const { application } = require('express');


router.get('/', (req, res) => {
res.render("anatomy")
})

router.get('/back', (req, res) => {
res.render("back")
})

router.get('/chest', (req, res) => {
 res.render("chest")
})

router.get('/legs', (req, res) => {
res.render("legs")
})

router.get('/biceps', (req, res) => {
res.render("biceps")
})

router.get('/shoulders', (req, res) => {
res.render("shoulders")
})    

router.get('/abdominals', (req, res) => {
res.render("abdominals")
})

router.get('/triceps', (req, res) => {
res.render("triceps")
})



module.exports = router;