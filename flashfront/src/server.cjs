const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors({
  allowedHeaders: ['Authorization']
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});