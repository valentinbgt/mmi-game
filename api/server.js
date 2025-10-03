const express = require('express');
const cors = require('cors');
const data = require('./data.json');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API !');
});

let leaderboard = data

function checkApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Clé API manquante ou invalide' });
  }
}

app.get('/leaderboard', (req, res) => {
  leaderboard.sort((a, b) => b.score - a.score);
  res.json(leaderboard);
});

app.post('/leaderboard', checkApiKey , (req, res) => {
  let { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Nom et score requis' });
  }
  if (name.length > 3){
    name = name.substring(0, 3);
  }
  name = name.toUpperCase();
  const existingEntry = leaderboard.find(entry => entry.name === name);

  if (existingEntry) {
    if (score > existingEntry.score) {
      existingEntry.score = score;
    } else {
      return res.json({
        success: false,
        message: 'Score non mis à jour (inférieur ou égal au score existant).',
        leaderboard
      });
    }
  } else {
    leaderboard.push({ name, score });
  }
  leaderboard.sort((a, b) => b.score - a.score);
  fs.writeFileSync('./data.json', JSON.stringify(leaderboard, null, 2));
  res.json({ success: true, leaderboard });
});

app.listen(PORT);
