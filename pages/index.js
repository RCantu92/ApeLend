import React, { Component } from 'react';
import apeLendInstance from '../ethers/ApeLend.js';

class apeLend extends Component {
  async componentDidMount() {

    // const currentBlockTimestamp = await apeLendInstance.currentBlockTimestamp();
    // await apeLendInstance.isNftAvailable();

    // console.log(currentBlockTimestamp);
  }

  render() {
    return <div>Protocol Creator Address</div>
  }
}

export default apeLend;