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
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    constructor(uint _collectionId) {
        collectionId = _collectionId;
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function mint(address _to, uint256 _tokenId) internal virtual {
        require(_to != address(0), "ApeToken: mint to the zero address");
        
        _balances[_to] += 1;
        _owners[_tokenId] = _to;

        emit Transfer(address(0), _to, _tokenId);
    }

    function getOwners(uint _apeTokenId) internal view returns (address _ownerAddress) {
        return _owners[_apeTokenId];
    }
}