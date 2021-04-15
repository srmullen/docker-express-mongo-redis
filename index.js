const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})


const app = express();

app.use(express.json());

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(() => console.log('successfully connected to DB'))
    .catch(err => {
      console.error(err);
      setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();

// Needed when express sits behind a proxy (ex. nginx). Be able to use headeres added by nginx.
app.enable('trust proxy');

app.use(cors());

app.use(session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    // maxAge: 60 * 60 * 1000 * 24 * 7
    maxAge: 60 * 1000
  }
}));

app.get('/api', (req, res) => {
  console.log('yeah it ran');
  res.send('<h2>Hi there!!!!</h2>');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));