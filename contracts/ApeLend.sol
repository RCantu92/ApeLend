// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";

contract ApeLend is ERC721, ERC721Holder {

    // Address of the protocol creator
    address apeCreator;

    // Mapping displaying if provided
    // token ID is available for borrowing
    // (Display current owner)
    mapping(uint => bool) _isTokenAvailable;

    // Mapping that provides a tokens
    // time window of when it must be returned
    mapping(uint => uint) _tokenReturnWindow;

    // Mapping that provides the
    // borrower of given token
    mapping(uint => address) _tokenBorrower;

    // Mapping that stores whether
    // protocol has permission from owner
    // to reposses token to return to owner
    mapping(uint => bool) _protocolRepossessionPermission;

    // Mapping that tracks the true token
    // owner, to know who the token should be
    // returned to
    mapping(uint => address) _trueTokenOwner;

    // Mapping inside of a mapping
    // that displays the current owner
    // of an token as the borrower under
    // said owner.

    // Function that accepts borrowing payment
    // for token. Pay creator and push a portion to
    // a insurance fund

    // Constructor that sets the address
    // of apeCreator
    constructor() ERC721("ApeLend", "APE") {
        apeCreator = msg.sender;
    }

    // Function to give or rescind approval to
    // ApeLend to handle token transactions
    // (HARDCODE IN PROTOCOL'S ADDRESS)
    // NAMING THIS FUNCTION `setApprovalForAll()`
    // WAS THROWING "setApprovalForAll is not a function"
    function approveProtocolAddress(bool _approved) public {
        ERC721.setApprovalForAll(0x5FbDB2315678afecb367f032d93F642f64180aa3, _approved);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public override {
        ERC721.safeTransferFrom(_from, _to, _tokenId);
    }

    function safeMint(address _to, uint256 _tokenId) public {
        ERC721._safeMint(_to, _tokenId);
    }

    // Function that allows contract to hold tokens
    function onERC721ReceivedToProtocol(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) public returns (bytes4) {
        return ERC721Holder.onERC721Received(operator, from, tokenId, data);
    }

    // Function to lend token
    // to protocol
    function lendToken(uint _tokenId) public {

        // Verify caller of function is
        // Owner of provided token ID
        require(msg.sender == ERC721.ownerOf(_tokenId), "ApeLend: You are not the owner of this token");

        // Add to mapping that tracks
        // token true ownership
        _trueTokenOwner[_tokenId] = msg.sender;

        // Add to mapping that displays
        // tokens available to borrow
        _isTokenAvailable[_tokenId] = true;

        // Approve receiving address
        // to transfer token
        ERC721.approve(address(this), _tokenId);

        // Confirm contract can receive tokens
        onERC721ReceivedToProtocol(msg.sender, msg.sender, _tokenId, "");

        // Transfer ownership of token to
        // ApeLend protocol address
        ERC721.safeTransferFrom(msg.sender, address(this), _tokenId);
    }

    // Function to borrow token,
    // checks list of available tokens
    // (collateral is a token that is valued by
    // the amount in ETH
    // it costs to mint provided tokens).
    // Give value to time window that would then
    // allow us to retrieve token if creator/minter
    // contacts us to "repossess" token
    function borrowToken(uint _borrowingTokenId, uint _collateralTokenId) public payable {
        // Verify token is available
        // to borrow and verify
        // collateral token is owned by
        // function caller
        require(_isTokenAvailable[_borrowingTokenId] == true, "ApeLend: This token is not available to borrow");
        require(msg.sender == ERC721.ownerOf(_collateralTokenId), "ApeLend: You are not the owner of the collateral token");

        // Lend Collateral token to protocol
        lendToken(_collateralTokenId);

        // Set tokens return window
        // (ADJUSTED FOR TESTING PURPOSES)
        _tokenReturnWindow[_borrowingTokenId] = block.timestamp + 2 minutes;

        // Mark borrowed token as unavailable to borrow
        _isTokenAvailable[_borrowingTokenId] = false;

        // Update mapping to show which address
        // borrowed given token
        _tokenBorrower[_borrowingTokenId] = msg.sender;

        // Approve protocol creator address
        // to transfer token (in case token needs
        // to be returned to true owner).
        // ERC721.approve(apeCreator, _borrowingTokenId);

        // Transfer ownership temporarily (i.e. borrow)
        // of token to function caller
        ERC721.safeTransferFrom(address(this), msg.sender, _borrowingTokenId);
        
    }

    // Function that allows us to `repossess` token
    // and give back to owner
    function requestRepossessionOfToken(uint _tokenId) public {
        // Confirm function caller is
        // 'true' owner of provided token ID
        require(msg.sender == _trueTokenOwner[_tokenId], "ApeLend: You are not the true owner of the provided token ID");
        // Confirm return time window has passed
        require(block.timestamp > _tokenReturnWindow[_tokenId], "ApeLend: It is too early to reposses token");
        // Confirm token is lent out to a different
        // address than the function caller
        require(msg.sender != ERC721.ownerOf(_tokenId), "ApeLend: You cannot reposses token that is in your possesion");

        // Give protocol permission to reposses token
        _protocolRepossessionPermission[_tokenId] = true;
    }

    // Function that allows protocol address to
    // return token to owner, after borrower has
    // failed to return to owner
    function protocolTokenRepossession(uint _tokenId) public {
        // Confirm token has in fact been borrowed
        require(_isTokenAvailable[_tokenId] == false, "ApeLend: Provided token ID has not been borrowed");

        // Confirm only protocol address can
        // call this function
        require(msg.sender == apeCreator, "ApeLend: Function caller is not the protocol creator address");

        // Confirm protocol address has
        // permission to repossess token
        require(_protocolRepossessionPermission[_tokenId] == true, "ApeLend: Protocol does not have permission to repossess this token");

        // Transfer ownership back to owner
        // from borrower
        ERC721.safeTransferFrom(ERC721.ownerOf(_tokenId), _trueTokenOwner[_tokenId], _tokenId);
    }

    // Function to return token from borrower to true owner
    // (MAY NEED TO ADD FUNCITONALITY THAT TAKES INTO 
    // ACCOUNT THE TOKEN RETURN TIME WINDOW)
    function returnToken(uint _tokenId) public {
        // Confirm function caller is current
        // borrower of token
        require(msg.sender == ERC721.ownerOf(_tokenId), "ApeLend: You are not the borrower of provided token");
        // Confirm provided token has been borrowed
        require(_isTokenAvailable[_tokenId] == false, "ApeLend: The provided token has been borrowed");

        // Add to mapping that displays
        // tokens available to borrow
        _isTokenAvailable[_tokenId] = true;

        // Approve receiving address
        // to transfer token
        ERC721.approve(address(this), _tokenId);

        // Confirm contract can receive Tokens
        onERC721ReceivedToProtocol(msg.sender, msg.sender, _tokenId, "");

        // Transfer ownership of token to
        // ApeLend protocol address
        ERC721.safeTransferFrom(msg.sender, address(this), _tokenId);
    }

    // Function to pull token from ApeLend
    function pullToken(uint _tokenId) public {
        // Confirm function caller is current
        // true owner of token
        require(msg.sender == _trueTokenOwner[_tokenId], "ApeLend: You are not the true owner of provided token");
        // Confirm provided token has been borrowed
        require(_isTokenAvailable[_tokenId] == true, "ApeLend: The provided token has been borrowed");

        // Update mapping to display
        // token is unavailable to borrow
        _isTokenAvailable[_tokenId] = false;
        
        // Transfer ownership of token from
        // ApeLend protocol address
        // to true token owner
        ERC721.safeTransferFrom(address(this), msg.sender, _tokenId);
    }

    // Function that returns whether provided
    // ID for token is available to borrow
    function isTokenAvailable(uint _tokenId) public view returns (bool) {
        return _isTokenAvailable[_tokenId];
    }
    
    // Function to check the owner address
    // of a token by tokenId
    function ownerOf(uint _tokenId) public view override returns (address) {
        return ERC721.ownerOf(_tokenId);
    }

    // Returns the number of tokens in ``owner``'s account.
    function balanceOf(address _owner) public view override returns (uint256) {
        return ERC721.balanceOf(_owner);
    }

    // Function that provides a given token`s
    // time window of when it must be returned
    function TokenReturnWindow(uint _tokenId) public view returns (uint) {
        return _tokenReturnWindow[_tokenId];
    }

    // Function that returns who is the borrower
    // of a particular token
    function TokenBorrower(uint _tokenId) public view returns (address) {
        return _tokenBorrower[_tokenId];
    }

    // Function that returns the protocol address
    function protocolCreator() public view returns (address) {
        return apeCreator;
    }

    // Function that returns the `true` owner
    // of a given token ID
    function trueTokenOwner(uint _tokenId) public view returns (address) {
        return _trueTokenOwner[_tokenId];
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