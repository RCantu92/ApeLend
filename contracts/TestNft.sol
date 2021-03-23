// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestNft is ERC721 {

    string public name;
    string public symbol;

    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        name = _name;
        symbol = _symbol;
    }
}