// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "./ApeToken.sol";

// Contract that will allow visitors to mint their own
// ERC721 collection
contract ApeTokenFactory /*is ApeToken*/ {

    // Mapping storing amount of ApeTokens
    // per collateral token
    mapping(uint => address) _apeTokenAddressPerTokenId;

    // Mapping displaying if provided
    // token ID is available for borrowing
    // (Display current owner)
    mapping(uint => bool) _isTokenAvailable;

    // Mapping that provides the
    // borrower of given token
    mapping(uint => address) _tokenBorrower;

    // The token owner provided
    // time window by when ApeTokens
    // must be returned
    uint apeTokenReturnWindow;

    /*
    function isApeTokenAvailable(uint _underlyingTokenId, uint _apeTokenId, address _apeLendAddress) internal returns (bool _availability) {
        address _apeTokenCollectionAddress = _apeTokenAddressPerCollection[_underlyingTokenId];

        ApeToken _apeTokenCollection = ApeToken(_apeTokenCollectionAddress);
        address _ownerAddress = _apeTokenCollection.getOwners(_apeTokenId);

        if(_ownerAddress == _apeLendAddress) {
            return false;
        } else {
            return true;
        }
    }
    */

    function mintApeTokens(uint _underlyingTokenId, address _currentHolder, uint _apeTokenAmount, uint _apeTokenReturnWindow) internal {
        // FOR NOW, LIMIT THE AMOUNT OF TOKEN-BACKED APETOKENS THAT CAN BE CREATED PER TOKEN
        // LIMIT 25
        require(_apeTokenAmount < 25, "ApeToken: You cannot mint more than 25 apeTokens per token");

        apeTokenReturnWindow = _apeTokenReturnWindow;

        // Pull address from a newly created instance
        // of the ApeToken standard per provided
        // collateralized ERC721 token
        address _apeTokenCollectionAddress = address(new ApeToken(_underlyingTokenId));

        // Store ApeToken collection address in mapping
        // linking it to underlying token's id
        _apeTokenAddressPerTokenId[_underlyingTokenId] = _apeTokenCollectionAddress;

        // Create a local instance of the ApeToken standard
        ApeToken _apeTokenCollectionInstance = ApeToken(_apeTokenCollectionAddress);

        for(uint i = 0; i < _apeTokenAmount; i++) {
            // Every new ApeToken id's will be linked to the
            // underlying token id.
            // (e.g. token id = 15, ApeToken id = 150001)
            uint _apeTokenId = (_underlyingTokenId * 1000) + i;

            // Mint a new ApeToken with the newly generated ApeToken id
            _apeTokenCollectionInstance.mint(_currentHolder, _apeTokenId);
        }
    }

    /*
    function borrowApeToken(uint _underlyingTokenId, uint _apeTokenId, address _apeLendAddress) internal {
        require(isApeTokenAvailable(_underlyingTokenId, _apeTokenId,_apeLendAddress) == true, "ApeTokenFactory: This token is not available to borrow");

        // Mark borrowed token as unavailable to borrow
        // _isTokenAvailable[_borrowingTokenId] = false;

        // Set tokens return window
        // apeTokenReturnWindow = block.timestamp + apeTokenReturnWindow;

        // Update mapping to show which address
        // borrowed given token
        // _tokenBorrower[_borrowingTokenId] = msg.sender;
    }
    */

    function ownerOf(uint _tokenId, uint _apeTokenId) internal view returns (address _owner) {
        return ApeToken(_apeTokenAddressPerTokenId[_tokenId]).owners(_apeTokenId);
    }

}