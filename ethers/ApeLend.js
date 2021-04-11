// Import instance of Ethers' provider
import provider from './ethers.js';
// Import contract ABI
import BorrowLendProtocol from '../artifacts/contracts/BorrowLendProtocol.sol/BorrowLendProtocol.json';

// Instance of ApeLend
const apeLendIntance = new ethers.Contract(/*contract address*/daiAddress, BorrowLendProtocol.abi, provider);