const express = require('express');
const router = express.Router();

const controller = require('../controller/controller-pokemon.js');

router.get('/', controller.getAllPokemon);

router.get('/:id', controller.getPokemonById);

router.get('/:id/:info', controller.getDetails);

module.exports = router;
