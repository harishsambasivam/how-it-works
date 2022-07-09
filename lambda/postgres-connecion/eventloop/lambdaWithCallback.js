'use strict';

function timeout(ms) {
  console.log('timeout start');
    setTimeout(() => {
      console.log(`timeout cb fired after ${ms} ms`);
    }, ms);
}

let i = 0;

exports.handler = (event,context) => {
  
  context.callbackWaitsForEmptyEventLoop = false;
  
  console.log('main start');
  console.log(++i);

  timeout(5e3);

  console.log('main end');
  
  // callback(null,"hi");
}

