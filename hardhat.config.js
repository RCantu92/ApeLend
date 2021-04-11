require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("dotenv").config({path: "./.env"});
const AlchemyRopsten = process.env.ALCHEMY_ROPSTEN;
const ropstenPrivateKey = process.env.ROPSTEN_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
    },
    ropsten: {
      url: AlchemyRopsten,
      accounts: [`0x${ropstenPrivateKey}`]
    }
  },
  solidity: "0.8.0",
};
