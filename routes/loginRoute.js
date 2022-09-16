
const express = require('express');
const User = require('../src/models/User');
const router = express.Router();


router.get('/login', (req, res)=> {
  res.render('login-page');
})



module.exports = router ;
