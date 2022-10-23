const process = require('process');

let refs = 0;

const timersHeap = []; // min heap

const immediates = []; // FIFO

const nextTickCallbacks = []; // FIFO

const promiseCallbacksHeap = [];

function execTicksAndCallbacks(){
    // 1. next tick call back, 2. promise call back.
    while(nextTickCallbacks.length || promiseCallbacksHeap.length) {
        while (nextTickCallbacks.length) {
            const callback = nextTickCallbacks.shift();
            callback();
          }
        
        while(promiseCallbacksHeap.length) {
            const callback = promiseCallbacksHeap.shift();
            callback();
        }
    }
}


try {
    require('./index');

    execTicksAndCallbacks();

    do(){
        // elapsed setTimeouts, setIntervals
        timersHeap.forEach((callback) => {
            callback();
            execTicksAndCallbacks();
        })

        // errors like tcp errors which are not executed in poll phase
        getPendingCallbacks.forEach((callback) => {
            callback();
            execTicksAndCallbacks();
        })


        pollForEventsFromKernelOrThreadPool(nextTimerElapse).forEach(callback => {
            callback();
            execTicksAndCallbacks();
        })

        closeCallbacks.forEach(callback => {
            callback();
            execTicksAndCallbacks();
        })

    } while(refs > 0);

    process.emit("beforeExit");

} catch(err) {
    process.exit();
}
