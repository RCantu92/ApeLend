import { ethers } from 'ethers';
// Import instance of Ethers' provider
import { provider, signer } from './ethers.js';
// Import contract ABI
import BorrowLendProtocol from '../artifacts/contracts/BorrowLendProtocol.sol/BorrowLendProtocol.json';
// Hardcode apeLend contract address
// (FIND WAY TO PULL FROM JSON ABI?)
const apeLendAddress = '0xe06f84adF394eD803813CC5f1e440AA00747562d';

console.log("Step Three: Contract Instance");

// Instance of ApeLend
const apeLendInstance = new ethers.Contract(
    apeLendAddress,
    BorrowLendProtocol.abi,
    provider
);

console.log(`Step Four: ApeLend Instance - ${apeLendInstance}`);

// Export instance of deployed ApeLend
export { apeLendInstance, provider, signer };