// May need to use this syntax for frontend:
import { ethers } from 'ethers';

console.log("Step Zero; Very Beginning")

// Creating variable instance of
// provider to give value based
// if using MetaMask or not.
let provider;
let signer;

// Conditional that uses the inject web3 from metamask
// under certain conditions. Otherwise, it connects using
// Alchemy.
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    console.log("Step One: MetaMask");
    // ethereum.request({ method: 'eth_requestAccounts' }); // THIS LINE SHOULD BE PROMPTED BY A USER'S ACTIOIN (IS LINE NEEDED?)
    // A Web3Provider wraps a standard Web3 provider, which is
    // what Metamask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    console.log(`Step Two: Signer from MetaMask - ${signer}`);
}/* else {
    console.log("Step One: Alchemy");
    // FIX, RIGHT NOW WE *HAVE* TO USE METAMASK, OTHERWISE ERRORS OUT
    // We are on the server *OR* the user is not running metamask
    const network = "ropsten";
    const provider = ethers.getDefaultProvider(network, { alchemy: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_ROPSTEN}` });
    // const provider = new ethers.providers.AlchemyProvider(network, `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_ROPSTEN}` );
    // signer = provider.getSigner();
    console.log(`Step Two: Provider from Alchemy - ${provider}`);
}*/

// Export instance of Ethers' provider
export { provider, signer } ;