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

// ** === get all highscores === **

app.get('/highscore', (req, res) => {
  Highscore.find({}, (err, highscore) => {
    if (err) {
      res.send(err);
    }
    res.json(highscore);
  });
});

//* find highscore by id
app.get('/highscore/:id', (req, res) => {
  Highscore.find({ id: req.params.id }, (err, highscore) => {
    if (err) {
      res.send(err);
    }
    res.json(highscore);
  });
});

//** === Add or update highscore === **

app.put('/highscore/:id/won', (req, res) => {
  Highscore.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        id: req.params.id,
        name: req.body.name,
      },
      $inc: { playedgames: 1, wongames: 1 },
    },
    { new: true, upsert: true },
    (err, highscore) => {
      if (err) {
        res.send(err);
      }
      res.json(highscore);
    }
  );
});

app.put('/highscore/:id/lost', (req, res) => {
  Highscore.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        id: req.params.id,
        name: req.body.name,
      },
      $inc: { playedgames: 1, lostgames: 1 },
    },
    { new: true, upsert: true },
    (err, highscore) => {
      if (err) {
        res.send(err);
      }
      res.json(highscore);
    }
  );
});

//** === delete highscore from DB, only for admin === **

app.delete('/highscore/:id', (req, res) => {
  Highscore.findOneAndDelete({ id: req.params.id }, (err, highscore) => {
    if (err) {
      res.send(err);
    }
    res.json(highscore);
  });
});

// config
const port = process.env.PORT || 8000;

//routes
app.use('/pokemon', require('./src/routes/router-pokemon.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
