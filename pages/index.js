import React, { Component } from 'react';
// import { apeLendInstance, provider, signer } from '../ethers/ApeLend.js';

import { ethers } from 'ethers';
import BorrowLendProtocol from '../artifacts/contracts/BorrowLendProtocol.sol/BorrowLendProtocol.json';

const apeLendAddress = '0xe06f84adF394eD803813CC5f1e440AA00747562d';
let provider;
let signer;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  console.log("Step One: MetaMask");
  ethereum.request({ method: 'eth_requestAccounts' }); // THIS LINE SHOULD BE PROMPTED BY A USER'S ACTIOIN (IS LINE NEEDED?)
  // A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  console.log(`Step Two: Signer from MetaMask - ${signer.getAddress()}`);
}

const apeLendInstance = new ethers.Contract(
  apeLendAddress,
  BorrowLendProtocol.abi,
  provider
);

class apeLend extends Component {

  state = {
    creatorAddress: null
  }

  async componentDidMount() {

    const creatorAddress = await apeLendInstance.connect(signer).protocolCreator(); // THIS LINE IS BREAKING THINGS

    this.setState({
      creatorAddress
    });

  }

  render() {
    return(
      <div>
        <div>ApeLend home page</div>
        <div>{this.state.creatorAddress}</div>
      </div>
    )

  }
} 

/*
export async function getStaticProps() {

  console.log("Step Five: Made it to index.js");

  // const creatorAddress = "5413"; // TEST LINE TO CONFIRM IT CAN PRINT TO THE WEBPAGE

  // await apeLendInstance.deployed();

  const creatorAddress = await apeLendInstance.connect(signer).currentBlockTimestamp(); // THIS LINE IS BREAKING THINGS

  return { 
    props: { 
      creatorAddress,
    },
  };

}
*/

export default apeLend;