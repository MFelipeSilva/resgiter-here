
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../src/models/User');
const router = express.Router();

router.use(express.json());

router.get('/login', (req, res)=> {
  res.render('login-page');
})

router.post('/login-registration', async (req, res) => {
  var emailLogin = req.body.emailLogin;
  var passwordLogin = req.body.passwordLogin;

  const err = [

  ];

  const user = await User.findOne({
    where: {
      email: req.body.emailLogin
    }
  });


  if(user) {
      err.push({message: "ERROR_INVALID_USER"})
  }
   
  
  if(!(await bcrypt.compare(passwordLogin, user.password))) {
    err.push({message: "ERROR_INVALID_PASSWORD"})
  }
  
  
  if(err.length > 0) {
    console.log(err);
    req.session.errors = err
    req.session.correct = false
    return res.redirect('/login');
  }
   
  const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
    expiresIn: 60
  });


  console.log(token)
    
})

module.exports = router ;
