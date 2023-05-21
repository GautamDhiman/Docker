const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@mongo:27017')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => {
    res.send("<h1> Hi This is simple express app!!!</h1>")
})
const port = 80;

app.listen(port, () => {
    console.log("server running")
})