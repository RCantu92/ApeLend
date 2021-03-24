// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestNft is ERC721 {

    string _collectionName;
    string _collectionSymbol;

    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        _collectionName = _name;
        _collectionSymbol = _symbol;
    }

    function ownerOf(uint tokenId) public view override returns (address) {
        ERC721.ownerOf(tokenId);
    }

    // Mint new NFT to caller of function
    function mintNewNft(uint _tokenId) public {
        ERC721._safeMint(msg.sender, _tokenId);
    }

    function collectionName() public view returns (string memory) {
        return _collectionName;
    }

    function collectionSymbol() public view returns (string memory) {
        return _collectionSymbol;
    }
}