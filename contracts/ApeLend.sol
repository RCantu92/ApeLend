// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "./ApeTokenFactory.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";

contract ApeLend is ERC721, ERC721Holder, ApeTokenFactory {

    // Address of the protocol creator
    address apeCreator;

    // Mapping displaying if provided
    // token ID serves as collateral for
    // new apeTokens
    mapping(uint => bool) _tokenCollateralized;

    // Mapping that tracks which address
    // have provided tokens to ApeLend
    mapping(address => bool) _providedToken;

    /*
    // Mapping that stores whether
    // protocol has permission from owner
    // to reposses token to return to owner
    mapping(uint => bool) _protocolRepossessionPermission;
    */

    /*
    // Mapping inside of a mapping
    // that displays the current owner
    // of an token as the borrower under
    // said owner.
    */

    // Function that accepts borrowing payment
    // for token. Pay creator and push a portion to
    // a insurance fund

    // Constructor that sets the address
    // of apeCreator
    constructor() ERC721("ApeLend", "APE") {
        apeCreator = msg.sender;
    }

    /*
    // Function to give or rescind approval to
    // ApeLend to handle token transactions
    // (HARDCODE IN PROTOCOL'S ADDRESS)
    // NAMING THIS FUNCTION `setApprovalForAll()`
    // WAS THROWING "setApprovalForAll is not a function"
    function approveProtocolAddress(bool _approved) public {
        ERC721.setApprovalForAll(0x5FbDB2315678afecb367f032d93F642f64180aa3, _approved);
    }
    */

    /*
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public override {
        ERC721.safeTransferFrom(_from, _to, _tokenId);
    }
    */

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
    function lendToken(uint _tokenId, uint _apeTokenAmount, uint _apeTokenReturnWindow) public {

        // Verify caller of function is
        // Owner of provided token ID
        require(msg.sender == ERC721.ownerOf(_tokenId), "ApeLend: You are not the owner of this token");

        // Local variable tracking owner of
        // underlying tokenId
        // address _tokenOwner = ERC721.ownerOf(_tokenId);

        // Add to mapping that displays
        // tokens that have been collateralized
        // for newly minted ApeTokens
        _tokenCollateralized[_tokenId] = true;

        // Approve ApeLend address
        // to transfer token
        ERC721.approve(address(this), _tokenId);

        // Confirm ApeLend contract
        // can receive tokens
        onERC721ReceivedToProtocol(msg.sender, msg.sender, _tokenId, "");

        // Declare and assign variable storing
        // ApeLend address
        address _apeLendAddress = address(this);

        // Add address to mapping that show they have
        // provided a token to ApeLend
        _providedToken[msg.sender] = true;

        // Transfer ownership of token to
        // ApeLend protocol address
        ERC721.safeTransferFrom(msg.sender, address(this), _tokenId);

        // Mint new ApeTokens
        // FIGURE OUT THE STRINGS FOR NAME AND SYMBOL LATER
        ApeTokenFactory.mintApeTokens(_tokenId, _apeLendAddress, _apeTokenAmount, _apeTokenReturnWindow);
    }

    // Function to borrow token.
    function borrowToken(uint _underlyingTokenId, uint _borrowingApeTokenId) public payable {

        address _apeLendAddress = address(this);
        address _borrower = msg.sender;

        // Verify calling address has provided a token
        // to ApeLend as collateral
        require(_providedToken[msg.sender] == true, "ApeLend: You have not provided a token to ApeLend");

        // Transfer ownership temporarily (i.e. borrow)
        // of ApeToken to function caller
        ApeTokenFactory.borrowApeToken(_underlyingTokenId, _borrowingApeTokenId, _apeLendAddress, _borrower);
        
    }

    /*
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
    */

    /*
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
    */

    /*
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
    */

    /*
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
    */

    /*
    // Function that returns whether provided
    // ID for token is available to borrow
    function isTokenAvailable(uint _tokenId) public view returns (bool) {
        return _isTokenAvailable[_tokenId];
    }
    */
    
    // Function to check the owner address
    // of a token by tokenId
    function ownerOf(uint _tokenId) public view override returns (address) {
        return ERC721.ownerOf(_tokenId);
    }

    function ownerOfApeToken(uint _tokenId, uint _apeTokenId) public view returns (address _apeTokenOwner) {
        return ApeTokenFactory.ownerOf(_tokenId, _apeTokenId);
    }

    // Returns the number of tokens in ``owner``'s account.
    function balanceOf(address _owner) public view override returns (uint256) {
        return ERC721.balanceOf(_owner);
    }

    /*
    // Function that provides a given token`s
    // time window of when it must be returned
    function TokenReturnWindow(uint _tokenId) public view returns (uint) {
        return _tokenReturnWindow[_tokenId];
    }
    */

    /*
    // Function that returns who is the borrower
    // of a particular token
    function TokenBorrower(uint _tokenId) public view returns (address) {
        return _tokenBorrower[_tokenId];
    }
    */

    /*
    // Function that returns the protocol address
    function protocolCreator() public view returns (address) {
        return apeCreator;
    }
    */

    /*
    // Function that returns the `true` owner
    // of a given token ID
    function trueTokenOwner(uint _tokenId) public view returns (address) {
        return _trueTokenOwner[_tokenId];
    }
    */

    /*
    // TEST FUNCTION
    // Function that returns current block.timestamp
    function currentBlockTimestamp() public view returns (uint) {
        return block.timestamp;
    }
    */

    /*
    // Fallback function
    fallback() external payable {}
    */

    receive() external payable {}
}