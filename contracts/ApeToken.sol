// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

// IMPORT ERC721 INTERFACE TO MAKE APE TOKENS
// A VALID ERC721 TOKEN?
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ApeToken /*is IERC721*/ {

    // Underlying token's ID
    // to make ApeToken part
    // of its collection
    uint collectionId;

    // Mapping owner address to token count
    mapping (address => uint256) private _balances;

    // Mapping from apeToken ID to owner address
    mapping (uint256 => address) private _owners;

    // Mapping from apeToken ID to approved address
    mapping (uint256 => address) private _apeTokenApprovals;

    //
    // @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
    //
    event Approval(address indexed owner, address indexed approved, uint256 indexed apeTokenId);

    //
    // @dev Emitted when `tokenId` token is transferred from `from` to `to`.
    //
    event Transfer(address indexed from, address indexed to, uint256 indexed apeTokenId);

    // Create a new collection of the ApeToken standard
    // for every provdided ERC-721.
    constructor(uint _collectionId) {
        collectionId = _collectionId;
    }

    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    //
    // @dev Safely mints `_apeTokenId` and transfers it to `_to`.
    //
    // Requirements:
    //
    // - `apeTokenId` must not exist.
    // - If `_to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
    //
    // Emits a {Transfer} event.
    //
    // CHANGE VISIBILITY FROM PUBLIC TO INTERNAL
    // (FIGURE OUT HOW TO DO EXACTLY THAT, WHILE
    // KEEPING SAFETY IN MIND)
    function _safeMint(address _to, uint256 _apeTokenId) public /*internal*/ {
        _safeMint(_to, _apeTokenId, "");
    }

    //
    // @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
    // forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
    //
    // CHANGE VISIBILITY FROM PUBLIC TO INTERNAL
    // (FIGURE OUT HOW TO DO EXACTLY THAT, WHILE
    // KEEPING SAFETY IN MIND)
    function _safeMint(address _to, uint256 _apeTokenId, bytes memory _data) public /*internal*/ {
        _mint(_to, _apeTokenId);
        // COMMENT OUT FOLLOWING LINE
        // (CONCERNS SMART CONTRACT ADDRESSES FROM RECEIVING APETOKENS)
        // require(_checkOnERC721Received(address(0), _to, _apeTokenId, _data), "ApeToken: transfer to non ERC721Receiver implementer");
    }


    //
    // @dev Mints `_apeTokenId` and transfers it to `_to`.
    //
    // WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
    //
    // Requirements:
    //
    // - `_apeTokenId` must not exist.
    // - `_to` cannot be the zero address.
    //
    // Emits a {Transfer} event.
    //
    function _mint(address _to, uint256 _apeTokenId) internal {
        require(_to != address(0), "ApeToken: mint to the zero address");
        require(!_exists(_apeTokenId), "ApeToken: token already minted");
        
        _balances[_to] += 1;
        _owners[_apeTokenId] = _to;

        emit Transfer(address(0), _to, _apeTokenId);
    }

    //
    // @dev Returns whether `_apeTokenId` exists.
    //
    // Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
    //
    // Tokens start existing when they are minted (`_mint`),
    // and stop existing when they are burned (`_burn`).
    //
    function _exists(uint256 _apeTokenId) internal view virtual returns (bool) {
        return _owners[_apeTokenId] != address(0);
    }

    //
    // @dev Approve `to` to operate on `tokenId`
    //
    // Emits a {Approval} event.
    //
    function _approve(address _to, uint256 _apeTokenId) internal virtual {
        _apeTokenApprovals[_apeTokenId] = _to;
        emit Approval(ownerOf(_apeTokenId), _to, _apeTokenId);
    }
    
    //
    // @dev Returns the account approved for `_apeTokenId` token.
    //
    // Requirements:
    //
    // - `_apeTokenId` must exist.
    //
    function getApproved(uint256 _apeTokenId) public view returns (address) {
        require(_exists(_apeTokenId), "ApeToken: approved query for nonexistent token");

        return _apeTokenApprovals[_apeTokenId];
    }
    
    //
    // @dev Returns whether `_spender` is allowed to manage `_apeTokenId`.
    //
    // Requirements:
    //
    // - `_apeTokenId` must exist.
    //
    function _isApprovedOrOwner(address _spender, uint256 _apeTokenId) internal view virtual returns (bool) {
        require(_exists(_apeTokenId), "ApeToken: operator query for nonexistent token");
        address owner = owners(_apeTokenId);
        // REVISIT
        return (_spender == owner || getApproved(_apeTokenId) == _spender /*|| ERC721.isApprovedForAll(owner, _spender)*/);
    }

    //
    // @dev Safely transfers `_apeTokenId` token from `_from` to `_to`, checking first that contract recipients
    // are aware of the ERC721 protocol to prevent tokens from being forever locked.
    //
    // Requirements:
    //
    // - `_from` cannot be the zero address.
    // - `_to` cannot be the zero address.
    // - `_apeTokenId` token must exist and be owned by `_from`.
    // - If the caller is not `_from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
    // - If `_to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
    //
    // Emits a {Transfer} event.
    //
    function safeTransferFrom(address _from, address _to, uint256 _apeTokenId) public {
        safeTransferFrom(_from, _to, _apeTokenId, "");
    }

    //
    // @dev Safely transfers `_apeTokenId` token from `_from` to `_to`, checking first that contract recipients
    // are aware of the ERC721 protocol to prevent tokens from being forever locked.
    //
    // Requirements:
    //
    // - `_from` cannot be the zero address.
    // - `_to` cannot be the zero address.
    // - `_apeTokenId` token must exist and be owned by `_from`.
    // - If the caller is not `_from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
    // - If `_to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
    //
    // Emits a {Transfer} event.
    //
    function safeTransferFrom(address _from, address _to, uint256 _apeTokenId, bytes memory _data) public {
        require(_isApprovedOrOwner(_msgSender(), _apeTokenId), "ApeToken: transfer caller is not owner nor approved");
        _safeTransfer(_from, _to, _apeTokenId, _data);
    }

    // @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
    // are aware of the ERC721 protocol to prevent tokens from being forever locked.
    //
    // `_data` is additional data, it has no specified format and it is sent in call to `to`.
    //
    // This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
    // implement alternative mechanisms to perform token transfer, such as signature-based.
    //
    // Requirements:
    // `from` cannot be the zero address.
    // `to` cannot be the zero address.
    // `tokenId` token must exist and be owned by `from`.
    // If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
    // Emits a {Transfer} event.
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal {
        _transfer(from, to, tokenId);
        // COMMENT OUT FOLLOWING LINE
        // (CONCERNS SMART CONTRACT ADDRESSES FROM RECEIVING APETOKENS)
        // require(_checkOnERC721Received(from, to, tokenId, _data), "ApeToken: transfer to non ERC721Receiver implementer");
    }

    // @dev Transfers `_apeTokenId` from `_from` to `_to`.
    // As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
    // Requirements:
    // `_to` cannot be the zero address.
    // `_apeTokenId` token must be owned by `_from`.
    // Emits a {Transfer} event.
    function _transfer(address _from, address _to, uint256 _apeTokenId) internal {
        require(owners(_apeTokenId) == _from, "ApeToken: transfer of token that is not own");
        require(_to != address(0), "ApeToken: transfer to the zero address");

        // Clear approvals from the previous owner
        _approve(address(0), _apeTokenId);

        _balances[_from] -= 1;
        _balances[_to] += 1;
        _owners[_apeTokenId] = _to;

        emit Transfer(_from, _to, _apeTokenId);
    }

    //
    // @dev Destroys `_apeTokenId`.
    // The approval is cleared when the token is burned.
    //
    // Requirements:
    //
    // - `_apeTokenId` must exist.
    //
    // Emits a {Transfer} event.
    //
    // ALTER VISIBILITY TO PUBLIC, UNTIL CAN FIGURE OUT
    // HOW TO MAKE IT MORE EXCLUSIVE TO WHO CAN CALL IT
    function _burn(uint256 _apeTokenId) public /*internal*/ virtual {
        address owner = ownerOf(_apeTokenId);

        // LOOK MORE INTO HOOKS
        //_beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), _apeTokenId);

        _balances[owner] -= 1;
        delete _owners[_apeTokenId];

        emit Transfer(owner, address(0), _apeTokenId);
    }

    // ONLY MAKE IT PUBLIC VISIBILITY TO TEST IF FUNCTION 
    // CAN BE CALLED IN THE FACTORY FILE
    function owners(uint _apeTokenId) public /*internal*/ view returns (address _ownerAddress) {
        return _owners[_apeTokenId];
    }

    //
    // @dev Returns the owner of the `_apeTokenId` token.
    //
    // Requirements:
    //
    // - `_apeTokenId` must exist.
    //
    function ownerOf(uint256 _apeTokenId) public view returns (address) {
        address owner = _owners[_apeTokenId];
        require(owner != address(0), "ApeToken: owner query for nonexistent token");
        return owner;
    }
}