const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();

const controller = require('../controller/controller-pokemon.js');

router.get('/', controller.getAllPokemon);

router.get('/types', controller.getDistinctTypes);

router.get('/:id', controller.getPokemonById);

router.get('/:id/:info', controller.getDetails);

router.get('(/highscore', controller.getHighscore);

router.get('/highscore/:id', controller.getHighscoreById);

router.put('/highscore/:id/won', controller.putHighscoreWon);

router.put('/highscore/:id/lost', controller.putHighscoreLost);

router.delete('/highscore/:id', controller.deleteHighscore);

module.exports = router;
