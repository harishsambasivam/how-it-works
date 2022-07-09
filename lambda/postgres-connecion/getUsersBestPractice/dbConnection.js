const sequelize = require("sequelize");
const {
  ENABLE_PG_LOGS = "",
  SEQUELIZE_POOL_ALLOW_CUSTOM_VALUE = "yes",
  SEQUELIZE_POOL_ACQUIRE_VALUE = 120000, 
  SEQUELIZE_POOL_MAX_VALUE = 2,
  SEQUELIZE_POOL_MIN_VALUE = 1,
  SEQUELIZE_POOL_IDLE_VALUE = 50,
} = process.env;

const logger = console;

const connectPostgres = async (postgresURI) => {
  if (!postgresURI) throw new Error("Postgres URI is missing!");
  logger.debug("connecting postgres");
  return new Promise(async function (resolve, reject) {
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
        evict: 50
      };
    }

    
    try {
      const connection = new sequelize(postgresURI, options);

      try{
        await connection.authenticate();
        console.log('Connection has been established successfully.');
        resolve(connection);
      } catch(err){
        console.log("unable to connect to sequelize");
      }
    } catch (err) {
      logger.info("Error Establishing postgres connection");
      reject(err);
    }
  });
};

module.exports = connectPostgres;