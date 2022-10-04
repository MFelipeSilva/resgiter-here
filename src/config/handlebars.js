const express = require('express');
const app = express();
const handlebars = require('handlebars');
const hbs = require('express-handlebars'),
{allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');


app.engine('hbs', hbs.engine({
  extname:'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(handlebars)
})); app.set('view engine', 'hbs');

