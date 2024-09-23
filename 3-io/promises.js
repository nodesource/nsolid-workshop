'use strict';

const express = require('express');
const pkgJson = require('../package.json');

if (!process.env.NSOLID_SAAS && !hasPkgJsonConf()) {
  console.error('You forgot to pass NSOLID_SAAS environment variable.');
  process.exit(1);
}

const app = express();

app.get('/', function (req, res, next) {
  awaitData(function () {
    res.send({})
    next()
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.info('🛈 In a separate terminal run: node benchmark.js');
});

function awaitData (callback) {
  setTimeout(() => {
    setTimeout(() => {
      callback();
    }, Math.random() * 1000);
  }, Math.random() * 1000);
}

function hasPkgJsonConf() {
  return pkgJson.nsolid && pkgJson.nsolid.saas !== '';
}
