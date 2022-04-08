// packages
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Highscore = require('./models/highscoreSchema');

//Mongoose connect to .env file
mongoose.connect(process.env.MONGO_URL);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
// MongoDB Post for highscore, check if ID of pokemon exists in database if not create new entry, else update entry

app.post('/highscore', (req, res) => {
  Highscore.create({
    id: req.body.id,
    name: req.body.name,
    playedgames: req.body.playedgames,
    wongames: req.body.wongames,
    lostgames: req.body.lostgames,
  }).then((highscore) => res.send(highscore));
});

// config
const port = process.env.PORT || 8000;

//routes
app.use('/pokemon', require('./src/routes/router-pokemon.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
