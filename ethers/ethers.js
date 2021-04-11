const { ethers } = require("ethers");
// May need to use this syntax for frontend:
// import { ethers } from 'ethers';
// IMPORT INFURA API KEY FROM NMEUMONIC

// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum);

// For Infura API (Use conditional in future, in case user does not have MetaMask)
// (THIS IS FROM EATTHEBLOCKS)
// const provider = new ethers.providers.AlchemyProvider('testnet name', INFURA_TESTNET_API_KEY);

// For Infura API
// (FROM ETHERS DOCUMENTATION)
// const provider = ethers.getDefaultProvider(/*TESTNET NAME*/, { infura: YOUR_INFURA_PROJECT_ID });

// Export instance of Ethers' provider
export default provider;