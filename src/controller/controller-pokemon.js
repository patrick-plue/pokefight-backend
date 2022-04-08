const { json } = require('express/lib/response');
let jsonData = require('../../pokedex.json');

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
module.exports = {
  getAllPokemon,
  getPokemonById,
  getDetails,
  getDistinctTypes,
};
