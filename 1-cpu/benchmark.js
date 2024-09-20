'use strict'

const autocannon = require('autocannon');

async function main () {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 100,
    duration: 10,
    // duration: 60,
  })
  console.log(autocannon.printResult(result));
}

main();
