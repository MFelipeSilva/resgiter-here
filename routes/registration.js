const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../src/database/userdata');
const database = require('../src/database/database');


router.get('/', (req, res)=> {
  
  if(req.session.errors) {
    req.session.errors = false;
    return res.render('index', {AlertErrors: true});
  }

  if(req.session.success) {
    req.session.success = false;
    return res.render('index', {AlertSuccess: true});
  }

  res.render('index');
})

router.post('/registration', async (req, res)=> {
  var nameUser = req.body.nameUser;
  var emailUser = req.body.emailUser;
  var passwordUser = req.body.passwordUser;

  const users = []

  const err = [

  ];

  nameUser = nameUser.trim();
  
  emailUser = emailUser.trim();
  passwordUser = passwordUser.trim();

  nameUser = nameUser.replace(/[^A-zÀ-ú\s]/gi, '');
  nameUser = nameUser.trim();

  if  (nameUser == '' || typeof nameUser == undefined || nameUser == null) {
    err.push({message: "O campo nome não pode ser vazio!"})
  }
  
  if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nameUser)){
    err.push({message:"Nome inválido!"});
  }


  if  (emailUser == '' || typeof emailUser == undefined || emailUser == null) {
    err.push({message: "O campo email não pode ser vazio!"})
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailUser)){
    err.push({message:"Campo email inválido!"});
    }

  if(err.length > 0) {
    console.log(err);
    req.session.errors = err;
    req.session.success = false;
    return res.redirect('/');
  } 
  
  try {
    const hashedPassword = await bcrypt.hash(passwordUser, 10);
    const user = {name: nameUser, email: emailUser, password: hashedPassword};
    users.push(user);
  } catch {
    router.status(500).send()
  }  

  await database.sequelize.sync();
    
  

  await User.create({
    name: users[0].name,
    email: users[0].email,
    password: users[0].password
  })

  console.log("Validação relizada com sucesso");
  req.session.sucess = true
  return res.redirect('/login');
});



module.exports = router;