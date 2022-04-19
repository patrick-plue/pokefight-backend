// packages
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

//Mongoose connect to .env file
mongoose.connect(process.env.MONGO_URL);

// middlewares
app.use(express.json());
app.use(cors);
// app.use(
//   cors({
//     origin: ['https://pokemon-duel.netlify.app/', 'http://localhost:3000'],
//   })
// );

// config
const port = process.env.PORT || 8000;

//routes
app.use('/pokemon', require('./src/routes/router-pokemon.js'));
app.use('/highscore', require('./src/routes/router-highscores.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
