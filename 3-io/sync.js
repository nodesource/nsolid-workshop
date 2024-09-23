'use strict';

const express = require('express');
const fs = require('fs');
const pkgJson = require('../package.json');

if (!process.env.NSOLID_SAAS && !hasPkgJsonConf()) {
  console.error('You forgot to pass NSOLID_SAAS environment variable.');
  process.exit(1);
}

const app = express();

app.get('/', function (req, res) {
  syncOperation(50);
  res.send({ hello: 'world' });
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.info('🛈 In a separate terminal run: node benchmark.js');
});

function syncOperation (executionTime) {
  while (--executionTime) {
    fs.closeSync(fs.openSync(__filename, 'a'));
  }
}

function hasPkgJsonConf() {
  return pkgJson.nsolid && pkgJson.nsolid.saas !== '';
}
