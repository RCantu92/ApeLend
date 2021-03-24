// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./TestNft.sol";

abstract contract BorrowLendProtocol is TestNft {

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

    // Function to borrow NFT,
    // checks list of available NFTS
    // (collateral is a NFT that is valued by
    // the amount in ETH
    // it costs to mint provided NFTs).
    // Have time window that would then
    // allow us to retrieve NFT if creator/minter
    // contacts us to "repossess" NFT
    function borrowNft(uint borrowingNftId) public {
        require(isNftAvailable[borrowingNftId] == true, "NFT is not available to borrow.");
        // Make sure they are providing NFT as collateral
        transferNftToBorrower();
    }

    // Function that accepts borrowing payment
    // for NFT. Pay creator and push a portion to
    // a insurance fund

    // Function to reposses NFT after creator/minter
    // contacts us to do, only if time window for repayment
    // or return has been passed

    // Function to lend NFT, English-style auction
    // (WITHOUT ENGLISH-STYLE AUCTION FOR NOW)
    function transferNftToBorrower() internal {

    }
}