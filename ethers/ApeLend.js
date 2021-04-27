import { ethers } from 'ethers';
// Import instance of Ethers' provider
import main from './ethers.js';
// Import contract ABI
import BorrowLendProtocol from '../artifacts/contracts/BorrowLendProtocol.sol/BorrowLendProtocol.json';
// Hardcode apeLend contract address
// (FIND WAY TO PULL FROM JSON ABI?)
const apeLendAddress = '0x239eF3B9093fA5fF22a3856aa4bF75EB62072dfA';

// Instance of ApeLend
const apeLendInstance = new ethers.Contract(
    apeLendAddress,
    BorrowLendProtocol.abi, // NEED TO PARSE JSON?
    main.signer
);

// Export instance of deployed ApeLend
export default apeLendInstance;