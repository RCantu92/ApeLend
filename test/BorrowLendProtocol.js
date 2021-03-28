const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Borrow and Lend Protocol contract", function() {

    before( async function() {
        // Get TestNft code to deploy
        const testNft = await ethers.getContractFactory("TestNft");
        // Get BorrowLendProtocol code to deploy
        const borrowLendProtocol = await ethers.getContractFactory("BorrowLendProtocol");

        // First account that will deploy the contract
        [firstAccount, secondAccount] = await ethers.getSigners();

        // Deploy TestNft from first account
        // with the provided parameters
        deployedTestNft = await testNft.deploy("Test Collection", "TEST");
        // Deploy BorrowLendProtocol from first account
        deployedBorrowLend = await borrowLendProtocol.deploy();

        // Confirm the address that deployed the contract
        // is the first account pulled from getSigners()
        expect(await deployedTestNft.deployTransaction.from).to.equal(firstAccount.address);
        // Confirm the address that deployed the contract
        // is the first account pulled from getSigners()
        expect(await deployedBorrowLend.deployTransaction.from).to.equal(firstAccount.address);

        // Confirm parameters passed into Constructor function
        // are the parameters previously provided
        expect(await deployedTestNft.collectionName()).to.equal("Test Collection");
        expect(await deployedTestNft.collectionSymbol()).to.equal("TEST");

        // Mint new NFT with TokenID of `1`
        // to firstAccount
        await deployedTestNft.mintNewNft(1);

      });

    it("should allow NFT owner to put up NFT for lending", async function() {
        // Provide NFT ID `1` from firstAccount
        // to borrow
        await deployedBorrowLend.lendNft(1)

        // Confirm NFT is available to borrow
        expect(await deployedBorrowLend.isNftAvailable(1)).to.equal(true);
    })

    it ("should allow the borrowing of available NFT", async function() {
        
    })

    /*
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
    */
})