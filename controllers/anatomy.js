const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const { application } = require('express');


router.get('/', (req, res) => {
res.render("anatomy")
})








module.exports = router;