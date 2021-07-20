// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "./ApeToken.sol";

// Contract that will allow visitors to mint their own
// ERC721 collection
contract ApeTokenFactory /*is ApeToken*/ {

    // Mapping storing address of ApeTokens
    // per collateral token
    mapping(uint => address) apeTokenAddressPerTokenId;

    // Mapping storing whether a token
    // already has a corresponding
    // ApeToken contract
    mapping(uint => bool) tokenExistingApeTokenContract;

    // Mapping displaying if provided
    // ApeToken ID is available for borrowing
    mapping(uint => bool) internal _isApeTokenAvailable;

    // Mapping that provides the
    // borrower of given apeToken
    mapping(uint => address) _tokenBorrower;

    // The loan terms of the ApeToken
    // linked to the underlying ERC721
    // token id
    mapping(uint => uint) _apeTokenLoanExpiration;

    // Mapping storing
    // total supply of ApeTokens
    // per token id
    mapping(uint => uint) internal apeTokenTotalSupplyPerToken;

    // Function that confirms desired ApeToken
    // is available
    function isApeTokenAvailable(
        uint _underlyingTokenId,
        uint _apeTokenId,
        address _apeLendAddress
    ) internal view returns (bool _availability) {
        
        // Pull address of desired ApeToken contract
        address _apeTokenContractAddress = apeTokenAddressPerTokenId[_underlyingTokenId];

        // Create local instance of desired ApeToken contract
        ApeToken _apeTokenContract = ApeToken(_apeTokenContractAddress);

        // Pull address of current desired ApeToken owner
        address _ownerAddress = _apeTokenContract.ownerOf(_apeTokenId);

        // Check if current owner is the
        // ApeLend protocol, if so, desired
        // ApeToken can be borrowed. 
        if(_ownerAddress == _apeLendAddress) {
            return true;
        } else {
            return false;
        }
    }

    function mintApeTokens(
        uint _underlyingTokenId,
        address _apeTokenOwner,
        uint _apeTokenAmount,
        uint _apeTokenLoanTerm
    ) internal {
        // FOR NOW, LIMIT THE AMOUNT OF TOKEN-BACKED APETOKENS
        // THAT CAN BE CREATED PER TOKEN LIMIT 25
        require(_apeTokenAmount < 25, "ApeToken: You cannot mint more than 25 apeTokens per token at this time");

        // Set apeToken's loan term
        // SET THE LENGTH, THEN WHEN ACTUALLY BORROWED,
        // ADD IT TO THE BLOCK TIMESTAMP?
        _apeTokenLoanExpiration[_underlyingTokenId] = block.timestamp + _apeTokenLoanTerm;

        // Declare an ApeToken contract
        // instance to interact with
        ApeToken apeTokenInstance;

        // If this ERC721 has never created a corresponding ApeToke contract
        // create a new one, else pull up existing instance
        // MAKE IT SO THAT IT CHECKS THE CONTENTS OF THE APETOKENADDRESSPERTOKENID
        // MAPPING? IF EMPTY, CREATE A NEW INSTANCE?
        if(tokenExistingApeTokenContract[_underlyingTokenId] == false) {
            // Set it to true for future checksums
            tokenExistingApeTokenContract[_underlyingTokenId] = true;

            // Create new ApeToken contract instance
            apeTokenInstance = new ApeToken(_underlyingTokenId);

            // Pull address from a newly created instance
            // of the ApeToken standard per provided
            // collateralized ERC721 token
            address apeTokenAddress = address(apeTokenInstance);

            // Store ApeToken contract address in mapping
            // linking it to underlying token's id
            apeTokenAddressPerTokenId[_underlyingTokenId] = apeTokenAddress;
        } else {
            // Create local instance of ERC721 token's ApeToken contract
            address apeTokenAddress = apeTokenAddressPerTokenId[_underlyingTokenId];
            apeTokenInstance = ApeToken(apeTokenAddress);
        }

        // For loop to mint the correct amount of ApeTokens
        for(uint i = 0; i < _apeTokenAmount; i++) {
            // Every new ApeToken id's will be linked to the
            // underlying token id.
            // (e.g. token id = 15, ApeToken id = 150001)
            uint _apeTokenId = (_underlyingTokenId * 1000) + (i + 1);

            // Increase amount of ApeToken supply
            // in mapping
            apeTokenTotalSupplyPerToken[_underlyingTokenId]++;

            // Mint a new ApeToken with the newly generated ApeToken id
            apeTokenInstance._safeMint(_apeTokenOwner, _apeTokenId);
        }
    }

    // MAKE VISIBILITY PUBLIC FOR NOW, FIRGURE OUT HOW TO CHANGE
    // IT TO MAKE IT MORE EXCLUSIVE
    // (MAKE IT PUBLIC, BUT ONLY CALLABLE BY A CERTAIN ADDRESS? "ONLYONWER?")
    function borrowApeToken(
        uint _underlyingTokenId,
        uint _apeTokenId,
        address _apeLendAddress,
        address _to
    ) public /*internal*/ {
        require(isApeTokenAvailable(_underlyingTokenId, _apeTokenId,_apeLendAddress) == true,
            "ApeTokenFactory: This token is not available to borrow");

        // Set apeToken's loan term
        _apeTokenLoanExpiration[_underlyingTokenId] = block.timestamp + _apeTokenLoanExpiration[_underlyingTokenId];

        // Pull address of desired ApeToken contract
        address _apeTokenContractAddress = apeTokenAddressPerTokenId[_underlyingTokenId];

        // Create local instance of desired ApeToken contract
        ApeToken _apeTokenContract = ApeToken(_apeTokenContractAddress);

        // Update mapping to show which address
        // borrowed given token
        _tokenBorrower[_apeTokenId] = msg.sender;

        // Transfer ApeToken to borrower
        _apeTokenContract.safeTransferFrom(_apeLendAddress, _to, _apeTokenId);
    }

    function burnApeToken(uint _underlyingTokenId) public /*internal*/ {
        // Confirm that the loan term has elapsed
        require(block.timestamp > _apeTokenLoanExpiration[_underlyingTokenId],
            "ApeTokenFactory: Corresponding ApeTokens cannot be burned at this time");

        // Pull address of desired ApeToken contract
        address _apeTokenContractAddress = apeTokenAddressPerTokenId[_underlyingTokenId];

        // Create local instance of desired ApeToken collection
        ApeToken _apeTokenInstance = ApeToken(_apeTokenContractAddress);

        uint _apeTokenSupply = apeTokenTotalSupplyPerToken[_underlyingTokenId];

        apeTokenTotalSupplyPerToken[_underlyingTokenId] = 0;

        for(uint i = 0; i < _apeTokenSupply; i++) {
            // Use same logic that derived an ApeToken id
            // to pull a specific ApeToken by its id
            uint _apeTokenId = (_underlyingTokenId * 1000) + (i + 1);

            // Burn ApeTokens corresponding to the token's Id
            _apeTokenInstance._burn(_apeTokenId);
        }
    }

    function ownerOf(uint _tokenId, uint _apeTokenId) internal view returns (address _owner) {
        address apeTokenInstanceAddress = apeTokenAddressPerTokenId[_tokenId];
        return ApeToken(apeTokenInstanceAddress).ownerOf(_apeTokenId);
    }

    function apeTokenSupply(uint _tokenId) internal view returns (uint _apeTokenTotalSupply) {
        return apeTokenTotalSupplyPerToken[_tokenId];
    }

    function apeTokenLoanExpiration(uint _tokenId) internal view returns (uint _loanExpiration) {
        return _apeTokenLoanExpiration[_tokenId];
    }

}