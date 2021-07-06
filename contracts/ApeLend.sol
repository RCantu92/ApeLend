// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

// import "./TestNft.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";

contract ApeLend is ERC721, ERC721Holder {

    // Create new instance of
    // deployed TestNft contract
    // TestNft testNft;

    // Address of the protocol creator
    address _protocolCreator;

    // Mapping displaying if provided
    // NFT ID is available for borrowing
    // (Display current owner)
    mapping(uint => bool) _isNftAvailable;

    // Mapping that provides a NFTs
    // time window of when it must be returned
    mapping(uint => uint) _nftReturnWindow;

    // Mapping that provides the
    // borrower of given NFT
    mapping(uint => address) _nftBorrower;

    // Mapping that stores whether
    // protocol has permission from owner
    // to reposses NFT to return to owner
    mapping(uint => bool) _protocolRepossessionPermission;

    // Mapping that tracks the true NFT
    // owner, to know who the NFT should be
    // returned to
    mapping(uint => address) _trueNftOwner;

    // Mapping inside of a mapping
    // that displays the current owner
    // of an NFT as the borrower under
    // said owner.

    // Function that accepts borrowing payment
    // for NFT. Pay creator and push a portion to
    // a insurance fund

    // Constructor that sets the address
    // of the protocol creator
    constructor(/*address _testNFT*/) ERC721("ApeLend", "APE") {
        _protocolCreator = msg.sender;
        // testNft = TestNft(_testNFT);
    }

    // Function to give or rescind approval to
    // ApeLend to handle NFT transactions
    // (HARDCODE IN PROTOCOL'S ADDRESS)
    function setApprovalForAll(bool _approved) public {
        ERC721.setApprovalForAll(0x5FbDB2315678afecb367f032d93F642f64180aa3, _approved);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public override {
        ERC721.safeTransferFrom(_from, _to, _tokenId);
    }

    function safeMint(address _to, uint256 _tokenId) public {
        ERC721._safeMint(_to, _tokenId);
    }

    // Function that allows contract to hold NFTs
    function onERC721ReceivedToProtocol(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) public returns (bytes4) {
        ERC721Holder.onERC721Received(operator, from, tokenId, data);
    }

    // Function to lend NFT
    // to protocol
    function lendNft(uint _nftId) public {

        // Verify caller of function is
        // Owner of provided NFT ID
        require(msg.sender == ERC721.ownerOf(_nftId), "You are not the owner of this NFT");

        // Add to mapping that tracks
        // NFT true ownership
        _trueNftOwner[_nftId] = msg.sender;

        // Add to mapping that displays
        // NFTs available to borrow
        _isNftAvailable[_nftId] = true;

        // Approve receiving address
        // to transfer NFT
        ERC721.approve(address(this), _nftId);

        // Confirm contract can receive NFTs
        onERC721ReceivedToProtocol(msg.sender, msg.sender, _nftId, "");

        // Transfer ownership of NFT to
        // Borrow and Lend protocol address
        ERC721.safeTransferFrom(msg.sender, address(this), _nftId);
    }

    // Function to borrow NFT,
    // checks list of available NFTS
    // (collateral is a NFT that is valued by
    // the amount in ETH
    // it costs to mint provided NFTs).
    // Give value to time window that would then
    // allow us to retrieve NFT if creator/minter
    // contacts us to "repossess" NFT
    function borrowNft(uint _borrowingNftId, uint _collateralNftId) public payable {
        // Verify NFT is available
        // to borrow and verify
        // collateral NFT is owned by
        // function caller
        require(_isNftAvailable[_borrowingNftId] == true, "This NFT is not available to borrow");
        require(msg.sender == ERC721.ownerOf(_collateralNftId), "You are not the owner of the collateral NFT");

        // Lend Collateral NFT to protocol
        lendNft(_collateralNftId);

        // Set NFTs return window
        // (ADJUSTED FOR TESTING PURPOSES)
        _nftReturnWindow[_borrowingNftId] = block.timestamp + 2 minutes;

        // Mark borrowed NFT as unavailable to borrow
        _isNftAvailable[_borrowingNftId] = false;

        // Update mapping to show which address
        // borrowed given NFT
        _nftBorrower[_borrowingNftId] = msg.sender;

        // Approve protocol creator address
        // to transfer NFT (in case NFT needs
        // to be returned to true owner).
        ERC721.approve(_protocolCreator, _borrowingNftId);

        // Transfer ownership temporarily (i.e. borrow)
        // of NFT to function caller
        ERC721.safeTransferFrom(address(this), msg.sender, _borrowingNftId);
        
    }

    // Function that allows us to `repossess` NFT
    // and give back to owner
    function requestRepossessionOfNft(uint _nftId) public {
        // Confirm function caller is
        // 'true' owner of provided NFT ID
        require(msg.sender == _trueNftOwner[_nftId], "You are not the true owner of the provided NFT ID");
        // Confirm return time window has passed
        require(block.timestamp > _nftReturnWindow[_nftId], "It is too early to reposses NFT");
        // Confirm NFT is lent out to a different
        // address than the function caller
        require(msg.sender != ERC721.ownerOf(_nftId), "You cannot reposses NFT that is in your possesion");

        // Give protocol permission to reposses NFT
        _protocolRepossessionPermission[_nftId] = true;
    }

    // Function that allows protocol address to
    // return NFT to owner, after borrower has
    // failed to return to owner
    function protocolNftRepossession(uint _nftId) public {
        // Confirm NFT has in fact been borrowed
        require(_isNftAvailable[_nftId] == false, "Provided NFT ID has not been borrowed");

        // Confirm only protocol address can
        // call this function
        require(msg.sender == _protocolCreator, "Function caller is not the protocol creator address");

        // Confirm protocol address has
        // permission to repossess NFT
        require(_protocolRepossessionPermission[_nftId] == true, "Protocol does not have permission to repossess this NFT");

        // Transfer ownership back to owner
        // from borrower
        ERC721.safeTransferFrom(ERC721.ownerOf(_nftId), _trueNftOwner[_nftId], _nftId);
    }

    // Function to return NFT from borrower to true owner
    // (MAY NEED TO ADD FUNCITONALITY THAT TAKES INTO 
    // ACCOUNT THE NFT RETURN TIME WINDOW)
    function returnNft(uint _nftId) public {
        // Confirm function caller is current
        // borrower of NFT
        require(msg.sender == ERC721.ownerOf(_nftId), "You are not the borrower of provided NFT");
        // Confirm provided NFT has been borrowed
        require(_isNftAvailable[_nftId] == false, "The provided NFT has been borrowed");

        // Add to mapping that displays
        // NFTs available to borrow
        _isNftAvailable[_nftId] = true;

        // Approve receiving address
        // to transfer NFT
        ERC721.approve(address(this), _nftId);

        // Confirm contract can receive NFTs
        onERC721ReceivedToProtocol(msg.sender, msg.sender, _nftId, "");

        // Transfer ownership of NFT to
        // Borrow and Lend protocol address
        ERC721.safeTransferFrom(msg.sender, address(this), _nftId);
    }

    // Function to pull NFT from protocol
    function pullNft(uint _nftId) public {
        // Confirm function caller is current
        // borrower of NFT
        require(msg.sender == _trueNftOwner[_nftId], "You are not the true owner of provided NFT");
        // Confirm provided NFT has been borrowed
        require(_isNftAvailable[_nftId] == true, "The provided NFT has been borrowed");

        // Update mapping to display
        // NFT is unavailable to borrow
        _isNftAvailable[_nftId] = false;
        
        // Transfer ownership of NFT from
        // Borrow and Lend protocol address
        // to true NFT owner
        ERC721.safeTransferFrom(address(this), msg.sender, _nftId);
    }

    // Function that returns whether provided
    // ID for NFT is available to borrow
    function isNftAvailable(uint _nftId) public view returns (bool) {
        return _isNftAvailable[_nftId];
    }
    
    // Function to check the owner address
    // of a NFT by tokenId
    function ownerOf(uint _tokenId) public view override returns (address) {
        return ERC721.ownerOf(_tokenId);
    }

    // Returns the number of tokens in ``owner``'s account.
    function balanceOf(address _owner) public view override returns (uint256) {
        return ERC721.balanceOf(_owner);
    }

    /*
    // Function that provides a given NFT`s
    // time window of when it must be returned
    function nftReturnWindow(uint _nftId) public view returns (uint) {
        return _nftReturnWindow[_nftId];
    }

    // Function that returns who is the borrower
    // of a particular NFT
    function nftBorrower(uint _nftId) public view returns (address) {
        return _nftBorrower[_nftId];
    }

    // Function that returns the protocol address
    function protocolCreator() public view returns (address) {
        return _protocolCreator;
    }

    // Function that returns the `true` owner
    // of a given NFT ID
    function trueNftOwner(uint _nftId) public view returns (address) {
        return _trueNftOwner[_nftId];
    }

    // TEST FUNCTION
    // Function that returns current block.timestamp
    function currentBlockTimestamp() public view returns (uint) {
        return block.timestamp;
    }

    /*
    // Fallback function
    fallback() external payable {}
    */

    receive() external payable {}
}