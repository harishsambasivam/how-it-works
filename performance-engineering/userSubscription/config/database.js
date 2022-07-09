const Sequelize = require("sequelize");
const logger = require("../utils/logger");
const {
  ENABLE_PG_LOGS = "",
  SEQUELIZE_POOL_ALLOW_CUSTOM_VALUE = "yes",
  SEQUELIZE_POOL_ACQUIRE_VALUE = 60000,
  SEQUELIZE_POOL_MAX_VALUE = 20,
  SEQUELIZE_POOL_MIN_VALUE = 10,
  SEQUELIZE_POOL_IDLE_VALUE = 60000,
} = process.env;


const connect = (postgresURI) => {
  if (!postgresURI) throw new Error("Postgres URI is missing!");
  logger.debug("connecting postgres");
  const options = {
    dialect: "postgres",
    logging: ENABLE_PG_LOGS.toLowerCase() === "yes"
  };

  if (SEQUELIZE_POOL_ALLOW_CUSTOM_VALUE === "yes") {
    // We got ConnectionAcquireTimeoutError [SequelizeConnectionAcquireTimeoutError]: Operation timeout error. https://stackoverflow.com/questions/56785122/sequlizejs-connection-get-timeout-frequently
    // Primarily we consider acquire param to be present in .env, as of now it will be only set for batch job jobs-ims/stock-ledger-job/index.js file with SEQUELIZE_POOL_ALLOW_CUSTOM_VALUE = "yes"
    // Override pool configuration
    options.pool = {
      max: SEQUELIZE_POOL_MAX_VALUE,
      min: SEQUELIZE_POOL_MIN_VALUE,
      acquire: SEQUELIZE_POOL_ACQUIRE_VALUE,
      idle: SEQUELIZE_POOL_IDLE_VALUE,
      evict: 1000
    };
  }
  return new Sequelize(postgresURI, options);
};

module.exports = () => connect(process.env.PG_NUCLEUS_URI)
