const logger = require("../utils/logger");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Sequelize = require("sequelize");
const pgEncryptKey = "TjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8";

const addUser = async (userData) => {
    logger.info("Add User");
    const { password, username, address, accountNumber, pin, creditCardNumber, cvv, creditCardHolder, walletAddress, PAN, aadharNumber, passportNumber, drivingLicenseNumber, dateOfBirth, voterId, age } = userData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    userData.password = hashedPassword;
    const user = await User.create({
        username,
        address,
        password,
        account_number: Sequelize.fn('PGP_SYM_ENCRYPT',accountNumber, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        pin: Sequelize.fn('PGP_SYM_ENCRYPT',pin, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        credit_card_number: Sequelize.fn('PGP_SYM_ENCRYPT',creditCardNumber, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        cvv: Sequelize.fn('PGP_SYM_ENCRYPT',cvv, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        credit_card_holder: Sequelize.fn('PGP_SYM_ENCRYPT',creditCardHolder, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        wallet_address: Sequelize.fn('PGP_SYM_ENCRYPT',walletAddress, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        PAN: Sequelize.fn('PGP_SYM_ENCRYPT',PAN, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        aadhar_number: Sequelize.fn('PGP_SYM_ENCRYPT',aadharNumber, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        date_of_birth: Sequelize.fn('PGP_SYM_ENCRYPT',dateOfBirth, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        age: Sequelize.fn('PGP_SYM_ENCRYPT',age, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        passport_number: Sequelize.fn('PGP_SYM_ENCRYPT',passportNumber, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        driving_license_number: Sequelize.fn('PGP_SYM_ENCRYPT',drivingLicenseNumber, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
        voter_id: Sequelize.fn('PGP_SYM_ENCRYPT',voterId, pgEncryptKey, 'compress-algo=0, cipher-algo=aes256'),
    });
    return user;
};

const getUser = async (username) => {
    logger.info("Get User");
    const user = await User.findAll({
        attributes: [
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('account_number'), 'bytea'), 
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "account_number"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('pin'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "pin"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('credit_card_number'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "credit_card_number"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('cvv'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "cvv"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('credit_card_holder'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "credit_card_holder"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('wallet_address'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "wallet_address"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('PAN'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "PAN"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('aadhar_number'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "aadhar_number"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('voter_id'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "voter_id"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('driving_license_number'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "driving_license_number"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('passport_number'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "passport_number"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('age'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "age"
          ],
          [
            Sequelize.fn(
              'PGP_SYM_DECRYPT',
              Sequelize.cast(Sequelize.col('date_of_birth'), 'bytea'),
              pgEncryptKey, 
              'compress-algo=0, cipher-algo=aes256'
            ), 
            "date_of_birth"
          ]
        ],
        where: {
            username: username
        }
    });
    return user;
};


// const {faker} = require("@faker-js/faker");

// async function foo(){
//     for(let i=0;i<2;i++){
//           const username = "harish sambasivam";
//           const payload = {
//             username,
//             address: faker.address.streetAddress(true),
//             password: faker.internet.password(20),
//             accountNumber: faker.finance.account(),
//             pin: faker.finance.ethereumAddress(),
//             creditCardNumber: faker.finance.creditCardNumber(),
//             cvv: faker.finance.creditCardCVV(),
//             creditCardHolder: faker.name.findName(),
//             walletAddress: faker.finance.ethereumAddress(),
//             PAN: "APOPH1108K",
//             aadharNumber: faker.finance.creditCardNumber(),
//             drivingLicenseNumber: faker.finance.creditCardNumber(),
//             voterId: faker.finance.creditCardNumber(),
//             passportNumber: faker.finance.creditCardNumber(),
//             age: faker.finance.creditCardNumber(),
//             dateOfBirth: faker.finance.creditCardNumber(),
//           };
//           console.log(payload);
//           await addUser(payload);
//     }
// }


// foo();


module.exports = {
  addUser,
  getUser
}
