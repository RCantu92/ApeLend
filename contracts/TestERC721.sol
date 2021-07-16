// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

// Contract that allows new NFTs to be minted
// and also tracks ownership of NFTs to owner
// address
contract TestERC721 is ERC721 {

    // Set name of NFT collection
    // and symbol upon contract deployment
    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) { }

    function safeMint(address _to, uint _tokenId) public {
        _safeMint(_to, _tokenId);
    }

}