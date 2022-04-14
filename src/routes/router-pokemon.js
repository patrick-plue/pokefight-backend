const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();

const controller = require('../controller/controller-pokemon.js');

router.get('/', controller.getAllPokemon);

router.get('/types', controller.getDistinctTypes);

router.get('/:id', controller.getPokemonById);

router.get('/:id/:info', controller.getDetails);

module.exports = router;
