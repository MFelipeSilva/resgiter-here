const express = require('express');
const app = express();

require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const loginRoute = require('./routes/login');
const regisRoute = require('./routes/registration');


const PORT = process.env.PORT || 3000


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));


app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

app.use('/', regisRoute);

app.use('/', loginRoute);




app.listen(PORT, ()=> {
  console.log(`Servidor aberto em http://127.0.0.1:${PORT}`);
})