// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

// Contract that allows new NFTs to be minted
// and also tracks ownership of NFTs to owner
// address
contract TestNft is ERC721, IERC721Receiver, ERC721Holder {

    // NFT collection name and symbol
    string _collectionName;
    string _collectionSymbol;

    // Mapping of all of address'
    // current NFT holdings
    mapping(address => uint[]) nftsOfAddress;

    // Set name of NFT collection
    // and symbol upon contract deployment
    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        _collectionName = _name;
        _collectionSymbol = _symbol;
        supportsInterface(IERC721Receiver.onERC721Received.selector);
    }

    // Mint new NFT to caller of function
    function mintNewNft(uint _tokenId) public {
        ERC721._safeMint(msg.sender, _tokenId);
        nftsOfAddress[msg.sender].push(_tokenId);
    }

    // Function that allows contract to hold NFTs
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) public override(ERC721Holder, IERC721Receiver) returns (bytes4) {
        return ERC721Holder.onERC721Received.selector;
    }

    // Function that allows NFT to have
    // ownership transferred
    function transferFrom(address _from, address _to, uint256 _tokenId) public override {
        ERC721.safeTransferFrom(_from, _to, _tokenId);
    }

    // Function to check the owner address
    // of a NFT by tokenId
    function ownerOf(uint _tokenId) public view override returns (address) {
        return ERC721.ownerOf(_tokenId);
    }

    // Function to return NFTs owned
    // by provided address
    function nftsOwned(address _owner) public view returns (uint[] memory) {
        return nftsOfAddress[_owner];
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