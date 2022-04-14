const mongoose = require('mongoose');
const { Schema } = mongoose;

const highscoreSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },

  playedgames: {
    type: Number,
  },
  wongames: {
    type: Number,
  },
  lostgames: {
    type: Number,
  },
});

module.exports = mongoose.model('Highscore', highscoreSchema);
