const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("<h1> Hi This is simple express app.</h1>")
})
const port = 3000;

app.listen(port, (port) => {
    console.log("server running")
})