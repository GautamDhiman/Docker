const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis')
const session = require('express-session')
const cors = require('cors')


let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    url: 'redis://redis:6379',
    legacyMode: true
})

redisClient.on('reconnecting', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
redisClient.connect();

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

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

app.enable('trust proxy');

app.use(cors());

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 3000000
    }
}))

app.use(express.json());

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

app.get('/api/v1', (req, res) => {
    res.send("<h1> Hi This is simple express app!!!</h1>")
})
const port = 80;

app.listen(port, () => {
    console.log("server running")
})