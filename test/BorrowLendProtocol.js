const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Borrow and Lend Protocol contract", function() {

    it("should allow a NFT to be minted to caller of function", async function() {
        // Get TestNft code to deploy
        const borrowLendProtocol = await ethers.getContractFactory("BorrowLendProtocol");

        // First account that will deploy the contract
        [lender] = await ethers.getSigners();

        // Deploy contract instance
        deployedBorrowAndLend = await borrowLendProtocol.deploy();

        // Confirm the address that deployed the contract
        // is the first account pulle from getSigners()
        expect(await deployedBorrowAndLend.deployTransaction.from).to.equal(lender.address);

        // Mint new NFT with TokenID of `1`
        await deployedBorrowAndLend.mintNft(1);

        // Confirm owner of NFT is nftCreator
        expect(await deployedBorrowAndLend.ownerOf(1)).to.equal(lender.address);
    })
})