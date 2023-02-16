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

// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get(); 
    res.render('profile', { id, name, email });
  });