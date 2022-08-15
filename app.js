const express = require('express');
const path = require('path');
const app = express()
const port = 7000;
const bodyparser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    msg: String
});

var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() => res.send("Your data has been saved")).catch(() => res.status(400).send("Your item was not saved to the database"))
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});