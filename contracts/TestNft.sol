// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Contract that allows new NFTs to be minted
// and also tracks ownership of NFTs to owner
// address
contract TestNft is ERC721 {

    string _collectionName;
    string _collectionSymbol;

    // Mapping of all of address'
    // current NFT holdings
    mapping(address => uint[]) nftsOfAddress;

    // Set name of NFT collection
    // and symbol
    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        _collectionName = _name;
        _collectionSymbol = _symbol;
    }

    // Function to check the owner address
    // of a NFT by tokenId
    function ownerOf(uint tokenId) public view override returns (address) {
        return ERC721.ownerOf(tokenId);
    }

    // Function to return NFTs owned
    // by provided address
    function nftsOwned(address _owner) public view returns (uint[] memory) {
        return nftsOfAddress[_owner];
    }

    // Mint new NFT to caller of function
    function mintNewNft(uint _tokenId) public {
        ERC721._safeMint(msg.sender, _tokenId);
        nftsOfAddress[msg.sender].push(_tokenId);
    }

    // Getter function for NFT collection name
    function collectionName() public view returns (string memory) {
        return _collectionName;
    }

    // Getter function for NFT collection symbol
    function collectionSymbol() public view returns (string memory) {
        return _collectionSymbol;
    }
}