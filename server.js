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

// find highscore by id
app.get('/highscore/:id', (req, res) => {
  Highscore.findById(req.params.id, (err, highscore) => {
    if (err) {
      res.send(err);
    }
    res.json(highscore);
  });
});

//** === add highscore to DB === **

app.post('/highscore', (req, res) => {
  Highscore.create({
    id: req.body.id,
    name: req.body.name,
    playedgames: req.body.playedgames,
    wongames: req.body.wongames,
    lostgames: req.body.lostgames,
  }).then((highscore) => res.send(highscore));
});

//** === update highscore === **

app.put('/highscore/:id', (req, res) => {
  Highscore.findOneAndUpdate(
    { id: req.params.id },
    { $set: req.body },
    { new: true },
    (err, highscore) => {
      if (err) {
        res.send(err);
      }
      res.json(highscore);
    }
  );
});

//*todo: delete highscore from DB, only for admin

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
