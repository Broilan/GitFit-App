const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');
const { response } = require('express');
const apiKey = process.env.API_KEY;
const appId = process.env.APP_ID;

router.get('/', (req, res) => {
    res.render("workout")
    })

module.exports = router;