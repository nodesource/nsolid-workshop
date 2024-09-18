'use strict';

if (!process.env.NSOLID_SAAS) {
  console.error('You forgot to pass NSOLID_SAAS environment variable.');
  process.exit(1);
}

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(generatePayload());
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.info('🛈 In a separate terminal run: node benchmark.js');
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
