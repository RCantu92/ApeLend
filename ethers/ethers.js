// May need to use this syntax for frontend:
import { ethers } from 'ethers';

async function main() {
    // Conditional that uses the inject web3 from metamask
    // under certain conditions. Otherwise, it connects using
    // Alchemy.
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what Metamask injects as window.ethereum into each page
        await window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    } else {
        // We are on the server *OR* the user is not running metamask
        const network = "ropsten";
        const provider = ethers.getDefaultProvider(network, { alchemy: process.env.ALCHEMY_ROPSTEN });
        const signer = provider.getSigner;
    }

    // For Infura API (Use conditional in future, in case user does not have MetaMask)
    // (THIS IS FROM EATTHEBLOCKS)
    // const provider = new ethers.providers.AlchemyProvider('testnet name', INFURA_TESTNET_API_KEY);
}

// Export instance of Ethers' provider
export default main;