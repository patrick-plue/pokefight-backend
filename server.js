// packages
const express = require('express');
const app = express();
const cors = require('cors');

let jsonData = require('./pokedex.json');

// middlewares

// config
const port = process.env.PORT || 8000;

// routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use('/pokemon', require('./src/routes/router-pokemon.js'));

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
