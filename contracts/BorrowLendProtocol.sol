// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./TestNft.sol";

contract BorrowLendProtocol {

    TestNft testNft = TestNft(0x5FbDB2315678afecb367f032d93F642f64180aa3);

    // Mapping of available NFTs
    // (Display current owner)
    mapping(uint => bool) internal isNftAvailable;

    // Time window (variable)

    // Mapping inside of a mapping
    // that displays the current owner
    // of an NFT as the borrower under
    // said owner.

    // Modifer to allow us to repossess
    // with the creator/minter's permission

    /*
    // Function to mint new TestNft
    // (Calls mintNewNft() from TestNft.sol)
    function mintNft(uint _tokenId) public {
        testNft.mintNewNft(msg.sender, _tokenId);
    }
    */

    // Function to borrow NFT,
    // checks list of available NFTS
    // (collateral is a NFT that is valued by
    // the amount in ETH
    // it costs to mint provided NFTs).
    // Have time window that would then
    // allow us to retrieve NFT if creator/minter
    // contacts us to "repossess" NFT
    /*
    function borrowNft(uint borrowingNftId) public {
        require(isNftAvailable[borrowingNftId] == true, "NFT is not available to borrow.");
        // Make sure they are providing NFT as collateral
    }
    */

    // Function that accepts borrowing payment
    // for NFT. Pay creator and push a portion to
    // a insurance fund

    // Function to reposses NFT after creator/minter
    // contacts us to do, only if time window for repayment
    // or return has been passed

    // Function to lend NFT
    function lendNft(uint nftId) public {
        // Onwer to own provided NFT id
        require(msg.sender == testNft.ownerOf(nftId));

        // Add to mapping that displays
        // NFTs available to borrow
        isNftAvailable[nftId] = true;
    }

    // Function to check the owner address
    // of a NFT by tokenId
    function ownerOf(uint tokenId) public view returns (address) {
        return testNft.ownerOf(tokenId);
    }

    /*
    // Fallback function
    fallback() external payable {}
    */
}