// May need to use this syntax for frontend:
import { ethers } from 'ethers';

// Creating variable instance of
// provider to give value based
// if using MetaMask or not.
let signer;

// Conditional that uses the inject web3 from metamask
// under certain conditions. Otherwise, it connects using
// Alchemy.
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    window.ethereum.enable();
    // A Web3Provider wraps a standard Web3 provider, which is
    // what Metamask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
} else {
    // FIX, RIGHT NOW WE *HAVE* TO USE METAMASK, OTHERWISE ERRORS OUT
    // We are on the server *OR* the user is not running metamask
    // const network = "ropsten";
    //const provider = ethers.getDefaultProvider(network, { alchemy: process.env.ALCHEMY_ROPSTEN });
    const provider = new ethers.providers.JsonRpcProvider(`https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_ROPSTEN}`);
    signer = provider.getSigner();
}

    // For Infura API (Use conditional in future, in case user does not have MetaMask)
    // (THIS IS FROM EATTHEBLOCKS)
    // const provider = new ethers.providers.AlchemyProvider('testnet name', INFURA_TESTNET_API_KEY);

// Export instance of Ethers' provider
export default signer;