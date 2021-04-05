// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./TestNft.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";

contract BorrowLendProtocol is ERC721Holder {

    // Create new instance of
    // deployed TestNft contract
    TestNft testNft = TestNft(0x5FbDB2315678afecb367f032d93F642f64180aa3);

    // Mapping of available NFTs
    // (Display current owner)
    mapping(uint => bool) _isNftAvailable;

    // Mapping that provides a NFTs
    // time window of when it must be returned
    mapping(uint => uint) _nftReturnWindow;

    // Mapping that provides the
    // borrower of given NFT
    mapping(uint => address) _nftBorrower;

    // Mapping inside of a mapping
    // that displays the current owner
    // of an NFT as the borrower under
    // said owner.

    // Modifer to allow us to repossess
    // with the creator/minter's permission

    // Function that accepts borrowing payment
    // for NFT. Pay creator and push a portion to
    // a insurance fund

    // Function to reposses NFT after creator/minter
    // contacts us to do, only if time window for repayment
    // or return has been passed

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
    function lendNft(address _to, uint _nftId) public {

        // DELETE
        console.log("The msg.sender that is calling the lendNft() function is: %s", msg.sender);

        // Verify caller of function is
        // Owner of provided NFT ID
        require(msg.sender == testNft.ownerOf(_nftId), "You are not the owner of this NFT.");

        // Add to mapping that displays
        // NFTs available to borrow
        _isNftAvailable[_nftId] = true;

        // Approve receiving address
        // to transfer NFT
        testNft.approve(_to, _nftId);

        // Confirm contract can receive NFTs
        onERC721ReceivedToProtocol(msg.sender, msg.sender, _nftId, "");

        // Transfer ownership of NFT to
        // Borrow and Lend protocol address
        testNft.transferFrom(msg.sender, address(this), _nftId);
    }

    // Function to borrow NFT,
    // checks list of available NFTS
    // (collateral is a NFT that is valued by
    // the amount in ETH
    // it costs to mint provided NFTs).
    // Give value to time window that would then
    // allow us to retrieve NFT if creator/minter
    // contacts us to "repossess" NFT
    function borrowNft(uint _borrowingNftId/*, uint _collateralNftId*/) public payable {
        // Verify NFT is available
        // to borrow and verify
        // collateral NFT is owned by
        // function caller
        require(_isNftAvailable[_borrowingNftId] == true, "This NFT is not available to borrow.");
        // require(msg.sender == testNft.ownerOf(_collateralNftId), "You are not the owner of the collateral NFT.");

        // DELETE
        console.log("The address of the borrowLendProtocol address(this) is: %s", address(this));

        // Lend Collateral NFT to protocol
        // lendNft(address(this), _collateralNftId);

        // Set NFTs return window
        _nftReturnWindow[_borrowingNftId] = 2 days;

        // Mark borrowed NFT as unavailable to borrow
        _isNftAvailable[_borrowingNftId] = false;

        // Transfer ownership of NFT to function caller
        testNft.transferFrom(address(this), msg.sender, _borrowingNftId);
        
    }

    /*
    // Function that allows us to `repossess` NFT
    // and give back to owner
    function repossesNft(uint _nftId) public {
        // 
    }
    */

    // Function that returns whether provided
    // ID for NFT is available to borrow
    function isNftAvailable(uint _nftId) public view returns (bool) {
        return _isNftAvailable[_nftId];
    }

    // Function to check the owner address
    // of a NFT by tokenId
    function ownerOf(uint _tokenId) public view returns (address) {
        return testNft.ownerOf(_tokenId);
    }

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

    /*
    // Fallback function
    fallback() external payable {}
    */
}