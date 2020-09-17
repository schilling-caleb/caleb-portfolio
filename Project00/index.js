// Initialize environment 
require('dotenv').config();




// Import libraries
const debug = require('debug')('app:index');
const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');

// Create and configure the application
const app = express();
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: false}))


// Routes
app.get('/', (req, res) => res.render('home', { title: 'Caleb Schilling Home'}));
app.get('/projects', (req, res) => res.render('projects', {title: 'Caleb Schilling Projects'}));
app.get('/contact', (req, res) => res.render('contact', {title: 'Caleb Schilling Contact'}));
app.post('/contact', (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  debug(`name = ${email}`);
  debug(`subject = ${subject}`);
  debug(`message = ${message}`);

  const data = {
    title: 'Contact Form',
    isValid: true,
    email,
    subject,
    message,
  };

  if(!email){
    data.isValid = false;
    data.emailError = 'Name not provided';
  }

  if(!subject){
    data.isValid = false;
    data.subjectError = 'Subject not provided';
  }

  if(!message){
    data.isValid = false;
  data.messageError = 'Message not provided';
  }

data.result = data.isValid ? 'Message sent' : 'Please fix the errors above';
res.render('contact', data);


});
// Static Files
app.use('/', express.static('public'));

// Start the application
const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Server started on port ${port}`));