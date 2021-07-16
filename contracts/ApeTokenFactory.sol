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
    // ApeToken ID is available for borrowing
    // (Display current owner)
    mapping(uint => bool) _isApeTokenAvailable;

    // Mapping that provides the
    // borrower of given apeToken
    mapping(uint => address) _tokenBorrower;

    // The token owner provided
    // time window by when ApeTokens
    // must be returned
    uint apeTokenReturnWindow;

    // Mapping storing
    // total supply of ApeTokens
    // per token id
    mapping(uint => uint) internal _apeTokenTotalSupplyPerToken;

    // Function that confirms desired ApeToken
    // is available
    function isApeTokenAvailable(uint _underlyingTokenId, uint _apeTokenId, address _apeLendAddress) internal view returns (bool _availability) {
        
        // Pull address of desired ApeToken collection
        address _apeTokenCollectionAddress = _apeTokenAddressPerTokenId[_underlyingTokenId];

        // Create local instance of desired ApeToken collection
        ApeToken _apeTokenCollection = ApeToken(_apeTokenCollectionAddress);

        // Pull address of current desired ApeToken owner
        address _ownerAddress = _apeTokenCollection.owners(_apeTokenId);

        // Check if current owner is the
        // ApeLend protocol, if so, desired
        // ApeToken can be borrowed. 
        if(_ownerAddress == _apeLendAddress) {
            return true;
        } else {
            return false;
        }
    }

    function mintApeTokens(uint _underlyingTokenId, address _currentHolder, uint _apeTokenAmount, uint _apeTokenReturnWindow) internal {
        // FOR NOW, LIMIT THE AMOUNT OF TOKEN-BACKED APETOKENS
        // THAT CAN BE CREATED PER TOKEN LIMIT 25
        require(_apeTokenAmount < 25, "ApeToken: You cannot mint more than 25 apeTokens per token");

        // Set tokens return window
        apeTokenReturnWindow = block.timestamp + _apeTokenReturnWindow;

        // Create new ApeToken contract instance
        ApeToken apeTokenInstance = new ApeToken(_underlyingTokenId);

        // Pull address from a newly created instance
        // of the ApeToken standard per provided
        // collateralized ERC721 token
        address apeTokenAddress = address(apeTokenInstance);

        // Store ApeToken collection address in mapping
        // linking it to underlying token's id
        _apeTokenAddressPerTokenId[_underlyingTokenId] = apeTokenAddress;

        for(uint i = 0; i < _apeTokenAmount; i++) {
            // Every new ApeToken id's will be linked to the
            // underlying token id.
            // (e.g. token id = 15, ApeToken id = 150001)
            uint _apeTokenId = (_underlyingTokenId * 1000) + (i + 1);

            // Increase amount of ApeToken supply
            // in mapping
            _apeTokenTotalSupplyPerToken[_underlyingTokenId]++;

            // Mint a new ApeToken with the newly generated ApeToken id
            // _apeTokenCollectionInstance._safemint(_currentHolder, _apeTokenId);
            apeTokenInstance._safeMint(_currentHolder, _apeTokenId);
        }
    }

    // MAKE VISIBILITY PUBLIC FOR NOW, FIRGURE OUT HOW TO CHANGE
    // IT TO MAKE IT MORE EXCLUSIVE
    // (MAKE IT PUBLIC, BUT ONLY CALLABLE BY A CERTAIN ADDRESS? "ONLYONWER?")
    function borrowApeToken(uint _underlyingTokenId, uint _apeTokenId, address _apeLendAddress, address _to) public /*internal*/ {
        require(isApeTokenAvailable(_underlyingTokenId, _apeTokenId,_apeLendAddress) == true, "ApeTokenFactory: This token is not available to borrow");

        // Mark desired ApeToken as unavailable to borrow
        _isApeTokenAvailable[_apeTokenId] = false;

        // Set tokens return window
        apeTokenReturnWindow = block.timestamp + apeTokenReturnWindow;

        // Pull address of desired ApeToken collection
        address _apeTokenCollectionAddress = _apeTokenAddressPerTokenId[_underlyingTokenId];

        // Create local instance of desired ApeToken collection
        ApeToken _apeTokenCollection = ApeToken(_apeTokenCollectionAddress);

        // Update mapping to show which address
        // borrowed given token
        _tokenBorrower[_apeTokenId] = msg.sender;

        // Transfer ApeToken to borrower
        _apeTokenCollection.safeTransferFrom(_apeLendAddress, _to, _apeTokenId);
    }

    function burnApeToken(uint _underlyingTokenId) public /*internal*/ {
        // Confirm that the loan term has elapsed
        require(block.timestamp > apeTokenReturnWindow, "ApeTokenFactory: Corresponding ApeTokens cannot be burned at this time");

        // Pull address of desired ApeToken collection
        address _apeTokenCollectionAddress = _apeTokenAddressPerTokenId[_underlyingTokenId];

        // Create local instance of desired ApeToken collection
        ApeToken _apeTokenInstance = ApeToken(_apeTokenCollectionAddress);

        uint _apeTokenSupply = _apeTokenTotalSupplyPerToken[_underlyingTokenId];

        _apeTokenTotalSupplyPerToken[_underlyingTokenId] = 0;

        for(uint i = 0; i < _apeTokenSupply; i++) {
            // Use same logic that derived an ApeToken id
            // to pull a specific ApeToken by its id
            uint _apeTokenId = (_underlyingTokenId * 1000) + (i + 1);

            // Burn ApeTokens corresponding to the token's Id
            _apeTokenInstance._burn(_apeTokenId);
        }
    }

    function ownerOf(uint _tokenId, uint _apeTokenId) internal view returns (address _owner) {
        return ApeToken(_apeTokenAddressPerTokenId[_tokenId]).ownerOf(_apeTokenId);
    }

    function apeTokenSupply(uint _tokenId) internal view returns (uint _apeTokenTotalSupply) {
        return _apeTokenTotalSupplyPerToken[_tokenId];
    }

}