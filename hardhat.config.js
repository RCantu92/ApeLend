require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("dotenv").config({path: "./.env"});
const alchemyRopsten = process.env.ALCHEMY_ROPSTEN;
const ropstenPrivateKey = process.env.ROPSTEN_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${alchemyRopsten}`,
      accounts: [`0x${ropstenPrivateKey}`]
    }
  },
  solidity: "0.8.6",
};
