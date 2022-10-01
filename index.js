const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');
const handlebars = require('handlebars');
const hbs = require('express-handlebars'),
{allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./src/models/User');
const database = require('./src/models/db');
const loginRoute = require('./routes/loginRoute')

const PORT = process.env.PORT || 3000

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.engine('hbs', hbs.engine({
  extname:'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(handlebars)
})); app.set('view engine', 'hbs');

app.use(session({
  secret: 'CreateKeySecret2022',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res)=> {
  
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

app.use('/', loginRoute)



app.post('/registration', async (req, res)=> {
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
    app.status(500).send()
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



app.listen(PORT, ()=> {
  console.log(`Servidor aberto em http://127.0.0.1:${PORT}`);
})