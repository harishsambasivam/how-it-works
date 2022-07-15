const {faker} = require("@faker-js/faker");
const axios = require("axios");

const baseUrl = "http://localhost:3000";

async function foo(){
    for(let i=0;i<50000;i++){
        const headers = {
              'Content-Type': 'application/json',
          };
          const username = faker.name.findName();
          const payload = JSON.stringify({
            username,
            address: faker.address.streetAddress(true),
            password: faker.internet.password(20),
            accountNumber: faker.finance.account(),
            pin: faker.finance.ethereumAddress(),
            creditCardNumber: faker.finance.creditCardNumber(),
            cvv: faker.finance.creditCardCVV(),
            creditCardHolder: faker.name.findName(),
            walletAddress: faker.finance.ethereumAddress(),
            PAN: faker.finance.creditCardNumber(),
            aadharNumber: faker.finance.creditCardNumber(),
            drivingLicenseNumber: faker.finance.creditCardNumber(),
            voterId: faker.finance.creditCardNumber(),
            passportNumber: faker.finance.creditCardNumber(),
            age: faker.finance.creditCardNumber(),
            dateOfBirth: faker.finance.creditCardNumber(),
          });
          axios.post(`${baseUrl}/user`,payload,{headers});
    }
}


foo();
