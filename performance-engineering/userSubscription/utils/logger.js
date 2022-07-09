const pino = require("pino");

const logger = pino({
    mixin() {
        return { service: 'pop store', env: process.env.NODE_ENV }
    },
    mixinMergeStrategy(mergeObject, mixinObject) {
        return Object.assign({}, mergeObject, mixinObject)
    }
});

module.exports = logger;