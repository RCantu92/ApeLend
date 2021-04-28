import React, { Component } from 'react';
import apeLendInstance from '../ethers/ApeLend.js';

class apeLend extends Component {

  // Get initial properties,
  // call deployed contract instance there?

  async componentDidMount() {

    // const currentBlockTimestamp = await apeLendInstance.currentBlockTimestamp();
    const creatorAddress = await apeLendInstance.protocolCreator();

    console.log(creatorAddress);
  }

  render() {
    return <div>Protocol Creator Address</div>
  }
}

export default apeLend;