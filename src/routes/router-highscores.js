const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();

const controller = require('../controller/controller-pokemon.js');

router.get('/', controller.getHighscore);

router.get('/:id', controller.getHighscoreById);

router.put('/:id/won', controller.putHighscoreWon);

router.put('/:id/lost', controller.putHighscoreLost);

router.delete('/:id', controller.deleteHighscore);

module.exports = router;
