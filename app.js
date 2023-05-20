const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("<h1> Hi This is simple express app!!!</h1>")
})
const port = 80;

app.listen(port, () => {
    console.log("server running")
})