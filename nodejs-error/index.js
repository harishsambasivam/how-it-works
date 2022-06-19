const logger = require('pino')();

class customError extends Error {
    constructor(message,code){
        super(message);
        this.code = code;
    }
}



const err = new customError("hello world", 1001);

logger.error(err);
