// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "./ApeToken.sol";

// Contract that will allow visitors to mint their own
// ERC721 collection
contract ApeTokenFactory /*is ApeToken*/ {

    // Mapping storing amount of ApeTokens
    // per collateral token
    mapping(uint => address) _apeTokenAddressPerCollection;

    // Mapping displaying if provided
    // token ID is available for borrowing
    // (Display current owner)
    mapping(uint => bool) _isTokenAvailable;

    // Mapping that provides the
    // borrower of given token
    mapping(uint => address) _tokenBorrower;

    uint apeTokenReturnWindow;

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

    function mintApeTokens(uint _underlyingTokenId, address _owner, uint _amount, uint _apeTokenReturnWindow) internal {
        // FOR NOW, LIMIT THE AMOUNT OF NFT-BACKED APETOKENS THAT CAN BE CREATED PER TOKEN.
        require(_amount < 25, "ApeToken: You cannot mint more than 25 apeTokens per token");

        apeTokenReturnWindow = _apeTokenReturnWindow;

        address _apeTokenCollectionAddress = new ApeToken(_underlyingTokenId);

        ApeToken _apeTokenCollectionInstance = ApeToken(_apeTokenCollectionAddress);

        for(uint i = 0; i < _amount; i++) {
            uint _apeTokenId = (_underlyingTokenId * 1000) + i;

            _apeTokenCollectionInstance.mint(_owner, _apeTokenId);
        }
    }

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

}