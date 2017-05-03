const express = require('express');
const path = require('path');
const db = require('db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../bundles')));

app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
