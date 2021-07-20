// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "./ApeTokenFactory.sol";
import "./TestERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";

contract ApeLend is ERC721, ERC721Holder, ApeTokenFactory {

    // IN ACTUALITY, THIS WOULD BE:
    // ERC721 erc721
    // TO BE ABLE TO CREATE LOCAL
    // INSTANCES OF CONTRACTS
    TestERC721 erc721;

    // Assign contract address
    // to global variable
    address apeLendAddress = address(this);

    // Mapping tracking who is the owner
    // who lent an ERC721 token to ApeLend
    mapping(uint => address) tokenLender;

    // Function that accepts borrowing payment
    // for token. Pay creator and push a portion to
    // a insurance fund

    constructor() ERC721("ApeLend", "APE") { }

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
    function lendToken(
        address _tokenAddress,
        uint _tokenId,
        uint _apeTokenAmount,
        uint _apeTokenLoanTerm
    ) public {
        // Create local instance of
        // token's ERC721 contract
        erc721 = createErc721Instance(_tokenAddress);

        // Verify caller of function is
        // owner of provided token ID
        require(msg.sender == erc721.ownerOf(_tokenId), "ApeLend: You are not the owner of this token");

        // Add to mapping tracking owner
        // who lent ERC721 token to ApeLend
        tokenLender[_tokenId] = msg.sender;

        // Confirm ApeLend contract
        // can receive tokens
        onERC721ReceivedToProtocol(apeLendAddress, msg.sender, _tokenId, "");

        // Transfer token to
        // ApeLend protocol
        erc721.safeTransferFrom(msg.sender, apeLendAddress, _tokenId);

        // Mint new ApeTokens
        // FIGURE OUT THE STRINGS FOR NAME AND SYMBOL LATER
        ApeTokenFactory.mintApeTokens(_tokenId, apeLendAddress, _apeTokenAmount, _apeTokenLoanTerm);
    }

    // Function to borrow token.
    function borrowToken(uint _underlyingTokenId, uint _borrowingApeTokenId) public payable {

        address _borrower = msg.sender;

        // Transfer ownership temporarily (i.e. borrow)
        // of ApeToken to function caller
        ApeTokenFactory.borrowApeToken(_underlyingTokenId, _borrowingApeTokenId, apeLendAddress, _borrower);
        
    }

    // Function to pull token from ApeLend
    function pullToken(address _tokenAddress, uint _tokenId) public {
        // Verify caller of function is
        // Owner of provided token ID
        require(msg.sender == tokenLender[_tokenId], "ApeLend: You are not the owner of this token");

        // Confirm that the loan term length
        // has elapsed, otherwise throw
        require(block.timestamp > ApeTokenFactory.apeTokenLoanExpiration(_tokenId),
            "ApeLend: You cannot pull your token at this time");

        // Create local instance of
        // ERC721 token's contract
        erc721 = createErc721Instance(_tokenAddress);

        // Burn corresponding
        // ApeTokens
        ApeTokenFactory.burnApeToken(_tokenId);
        
        // Transfer ownership of token from
        // ApeLend protocol address
        // to true token owner
        // HOW TO WITHDRAW TOKEN FROM
        // PROTOCOL
        erc721.transferFrom(apeLendAddress, msg.sender, _tokenId);
    }

    function createErc721Instance(address _tokenAddress) internal pure returns (TestERC721 _erc721Instance) {
        _erc721Instance = TestERC721(_tokenAddress);
        return _erc721Instance;
    }

    function ownerOfApeToken(uint _tokenId, uint _apeTokenId) public view returns (address _apeTokenOwner) {
        return ApeTokenFactory.ownerOf(_tokenId, _apeTokenId);
    }

    function apeTokenTotalSupply(uint _tokenId) public view returns (uint _apeTokenTotalSupply) {
        return ApeTokenFactory.apeTokenSupply(_tokenId);
    }

    // Fallback function
    fallback() external payable {}

    receive() external payable {}
}