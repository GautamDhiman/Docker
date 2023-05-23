const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/postRoutes');

const connectDbRetry = () => {
    mongoose.connect('mongodb://root:root@mongo:27017')
        .then(() => console.log('MongoDB Connected'))
        .catch(err => {
            console.log(err);
            setTimeout(connectDbRetry, 5000);
        });
    }

connectDbRetry();

const app = express();
app.use(express.json());

app.use("/api/v1/posts", postRouter)

app.get('/', (req, res) => {
    res.send("<h1> Hi This is simple express app!!!</h1>")
})
const port = 80;

app.listen(port, () => {
    console.log("server running")
})