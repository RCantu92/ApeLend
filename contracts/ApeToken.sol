// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract ApeToken {

    // Underlying token's ID
    // to make ApeToken part
    // of its collection
    uint collectionId;

    // Mapping owner address to token count
    mapping (address => uint256) private _balances;

    // Mapping from token ID to owner address
    mapping (uint256 => address) private _owners;

    /**
     * @dev Emitted when `apeTokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed apeTokenId);

    // Create a new collection of the ApeToken standard
    // for every provdided ERC-721.
    constructor(uint _collectionId) {
        collectionId = _collectionId;
    }

    /**
     * @dev Mints `apeTokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `apeTokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
     // ONLY MAKE IT PUBLIC VISIBILITY TO TEST IF FUNCTION 
     // CAN BE CALLED IN THE FACTORY FILE
    function mint(address _to, uint256 _apeTokenId) public /*internal*/ {
        require(_to != address(0), "ApeToken: mint to the zero address");
        
        _balances[_to] += 1;
        _owners[_apeTokenId] = _to;

        emit Transfer(address(0), _to, _apeTokenId);
    }

    // ONLY MAKE IT PUBLIC VISIBILITY TO TEST IF FUNCTION 
     // CAN BE CALLED IN THE FACTORY FILE
    function owners(uint _apeTokenId) public /*internal*/ view returns (address _ownerAddress) {
        return _owners[_apeTokenId];
    }
}