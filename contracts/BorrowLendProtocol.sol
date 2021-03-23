// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./TestNft.sol";

contract BorrowLendProtocol is TestNft {

    // List (array?) of NFTs
    // (Display current owner)

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

    // Function that accepts borrowing payment
    // for NFT. Pay creator and push a portion to
    // a insurance fund

    // Function to reposses NFT after creator/minter
    // contacts us to do, only if time window for repayment
    // or return has been passed

    // Function to lend NFT, English-style auction
}