let hoy = new Date()
console.log("Hoy es " + hoy)

//requires
require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs'); //para handlebars
const mysql = require('mysql');
const app = express();
const port = 3000; //puerto del servidor

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));
app.use(require('./router/contacto'));
app.use(require('./router/router'));

//settings (paths)
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs') //Handlebars
hbs.registerPartials(__dirname + '/views/partials');

//server listening
app.listen(port, () => {
    console.log(`Puerto Corriendo en http://localhost:${port}`)
});