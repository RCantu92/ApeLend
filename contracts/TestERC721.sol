// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

// Contract that allows new NFTs to be minted
// and also tracks ownership of NFTs to owner
// address
// ONLY ADDED THIS FOR TESTING
contract TestERC721 is ERC721 {

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) { }

    function approveApeLend(address _to, uint _tokenId) public /*override*/ {
        approve(_to, _tokenId);
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     */
    function safeMint(address _to, uint _tokenId) public {
        _safeMint(_to, _tokenId);
    }

    function testTransferFrom(address _from, address _to, uint256 _tokenId) public /*override*/ {
        safeTransferFrom(_from, _to, _tokenId);
    }

}