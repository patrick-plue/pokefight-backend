const { json } = require('express/lib/response');
let jsonData = require('../../pokedex.json');

const Highscore = require('../../models/highscoreSchema');

const getAllPokemon = (req, res) => {
  res.send(jsonData);
};

const getPokemonById = (req, res) => {
  const id = req.params.id;
  const pokemon = jsonData[id - 1];
  res.send(pokemon);
};

const getDetails = (req, res) => {
  const id = req.params.id;
  const type = req.params.info;
  const pokemon = jsonData[id - 1];

  if (type === 'name') {
    res.send(pokemon.name);
  } else if (type === 'base') {
    res.send(pokemon.base);
  } else if (type === 'type') {
    res.send(pokemon.type);
  }
};

const getDistinctTypes = (req, res) => {
  const typeArray = Object.values(jsonData).map((pokemon) => pokemon.type);
  const flattenArray = typeArray.flat();
  const uniqueTypes = [...new Set(flattenArray)];
  res.send(uniqueTypes);
};

//! Highscore
const getHighscore = (req, res) => {
  Highscore.find({}, (err, highscore) => {
    if (err) {
      res.send(err);
    }
    res.json(highscore);
  });
};

const getHighscoreById = (req, res) => {
  Highscore.find({ id: req.params.id }, (err, highscore) => {
    if (err) {
      res.send(err);
    }
    res.json(highscore);
  });
};

const putHighscoreWon = (req, res) => {
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
};

const putHighscoreLost = (req, res) => {
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
};

const deleteHighscore = (req, res) => {
  Highscore.findOneAndDelete({ id: req.params.id }, (err, highscore) => {
    if (err) {
      res.send(err);
    }
    res.json(highscore);
  });
};

module.exports = {
  getAllPokemon,
  getPokemonById,
  getDetails,
  getDistinctTypes,
  getHighscore,
  putHighscoreWon,
  putHighscoreLost,
  deleteHighscore,
  getHighscoreById,
};
