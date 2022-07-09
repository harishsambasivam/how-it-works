function timeout(ms) {
    console.log('timeout start');
  
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`timeout cb fired after ${ms} ms`);
  
        resolve();
      }, ms);
    });
  }
  
  exports.handler = async function() {
    console.log('main start');
  
    timeout(5e3);
  
    console.log('main end');
  }