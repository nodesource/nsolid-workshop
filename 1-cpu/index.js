'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(generatePayload());
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

function generatePayload() {
  const iterations = 400;
  const date = Date.now();
  const chars = generateLargeString(date, iterations);

  // Simulate a long string operation
  const id = chars.slice(-iterations);

  return { date, id };
}

function generateLargeString(date, iterations) {
  const radix = 36;
  let chars = '';

  while (iterations--) {
    chars += (date + iterations).toString(radix).toUpperCase();
  }

  return chars;
}