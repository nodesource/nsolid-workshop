'use strict';

const express = require('express');
const pkgJson = require('../package.json');

if (!process.env.NSOLID_SAAS && !hasPkgJsonConf()) {
  console.error('You forgot to pass NSOLID_SAAS environment variable.');
  process.exit(1);
}

const app = express();

app.get('/', (req, res) => {
  res.send({ name: name() });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.info('🛈 In a separate terminal run: node benchmark.js');
});

const namesGenerator = require('docker-namesgenerator');
const names = {};

function name () {
  let result = namesGenerator();
  if (names[result]) {
    result += names[result]++;
  }
  names[result] = 1;
  return result;
}

function hasPkgJsonConf() {
  return pkgJson.nsolid && pkgJson.nsolid.saas !== '';
}
