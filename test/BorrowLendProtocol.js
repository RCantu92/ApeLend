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

        // Confirm the address that deployed the NFT contract
        // is the first account pulled from getSigners()
        expect(await deployedTestNft.deployTransaction.from).to.equal(firstAccount.address);
        // Confirm the address that deployed the Protocol contract
        // is the first account pulled from getSigners()
        expect(await deployedBorrowLend.deployTransaction.from).to.equal(firstAccount.address);

        // Confirm parameters passed into Constructor function
        // are the parameters previously provided
        expect(await deployedTestNft.collectionName()).to.equal("Test Collection");
        expect(await deployedTestNft.collectionSymbol()).to.equal("TEST");

      });

    it("should allow NFT owner to put up NFT for lending", async function() {
        // Mint new NFT with TokenID of `25`
        // to firstAccount
        await deployedTestNft.mintNewNft(25);

        // Confirm that firstAccount is owner
        // of NFT ID `25`
        expect(await deployedTestNft.ownerOf(25)).to.equal(firstAccount.address);

        // Confirm NFT ID `25` is not available
        // which would mean it is not able to be
        // put up to lend by owner
        expect(await deployedBorrowLend.isNftAvailable(25)).to.equal(false);

        console.log("The owner of NFT ID `25` is: " + await deployedTestNft.ownerOf(25));

        console.log("The address of firstAccount is: " + firstAccount.address);
        console.log("The address of secondAccount is: " + secondAccount.address);

        // Give approval to TestNft contract to
        // handle NFT transactions
        await deployedTestNft.approveProtocolAddress(true);

        // Provide NFT ID `1` from firstAccount
        // to borrow
        await deployedBorrowLend.lendNft(firstAccount.address, secondAccount.address, 25);

        // Confirm NFT is available to borrow
        expect(await deployedBorrowLend.isNftAvailable(25)).to.equal(true);
    })

    /*
    it ("should allow the borrowing of available NFT", async function() {

    })
    */
})