const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Borrow and Lend Protocol contract", function() {

    before( async function() {
        // Get TestNft code to deploy
        const testNft = await ethers.getContractFactory("TestNft");
        // Get BorrowLendProtocol code to deploy
        const borrowLendProtocol = await ethers.getContractFactory("BorrowLendProtocol");

        // First account that will deploy the contract
        [firstAccount, secondAccount, thirdAccount] = await ethers.getSigners();

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

        // Give approval to TestNft contract to
        // handle NFT transactions
        await deployedTestNft.approveProtocolAddress(true);

        // Provide NFT ID `25` to protocol
        // from firstAccount to borrow
        await deployedBorrowLend.lendNft(deployedBorrowLend.address, 25);

        // Confirm NFT is available to borrow
        expect(await deployedBorrowLend.isNftAvailable(25)).to.equal(true);

        // Confirm that the protocol currently
        // is the owner of NFT ID `25`
        expect(await deployedTestNft.ownerOf(25)).to.equal(deployedBorrowLend.address);
    })

    it ("should allow the borrowing of available NFT", async function() {

        // DELETE
        console.log("The address of account three is: %s", thirdAccount.address);
        console.log("The owner of NFT ID `25` is: %s", await deployedTestNft.ownerOf(25));
        console.log("The address of the deployedBorrowLend.address is: %s", deployedBorrowLend.address);

        // Confirm NFT is available to borrow
        expect(await deployedBorrowLend.isNftAvailable(25)).to.equal(true);

        // Mint new NFT ID `36` to thirdAccount
        // await deployedTestNft.connect(thirdAccount).mintNewNft(36);

        // Confirm NFT ID `36` belongs
        // to thirdAccount
        // expect(await deployedTestNft.connect(thirdAccount).ownerOf(36)).to.equal(thirdAccount.address)
        
        // Call function to borrow NFT ID `25`
        // by providing NFT ID `36` as collateral
        await deployedBorrowLend.connect(thirdAccount).borrowNft(25/*, 36*/);

        // Confirm collateral NFT
        // is available to borrow
        // expect(await deployedBorrowLend.connect(thirdAccount).isNftAvailable(36)).to.equal(true);

        // Confirm that the protocol currently
        // is the owner of NFT ID `36`
        // expect(await deployedTestNft.ownerOf(36)).to.equal(deployedBorrowLend.address);

        // Confirm borrowed NFT
        // is unavailable to borrow
        expect(await deployedBorrowLend.connect(thirdAccount).isNftAvailable(25)).to.equal(false);

        // Confirm that thirdAccount is
        // currently the owner of NFT ID `25`
        expect(await deployedTestNft.connect(thirdAccount).ownerOf(25)).to.equal(thirdAccount.address);
    })

})