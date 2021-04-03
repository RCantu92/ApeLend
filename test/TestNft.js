const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("NFT contract", function () {

    before( async function() {
        // Get TestNft code to deploy
        const testNft = await ethers.getContractFactory("TestNft");

        // First account that will deploy the contract
        [firstAccount, secondAccount] = await ethers.getSigners();

        // Deploy TestNft from first account
        // with the provided parameters
        deployedTestNft = await testNft.deploy("Test Collection", "TEST");

        // Confirm the address that deployed the contract
        // is the first account pulled from getSigners()
        expect(await deployedTestNft.deployTransaction.from).to.equal(firstAccount.address);

        // Confirm parameters passed into Constructor function
        // are the parameters previously provided
        expect(await deployedTestNft.collectionName()).to.equal("Test Collection");
        expect(await deployedTestNft.collectionSymbol()).to.equal("TEST");
    });


    it("should allow a NFT to be minted to caller of function", async function() {

        // Mint new NFT with TokenID of `1`
        await deployedTestNft.mintNewNft(1);

        // Confirm owner of NFT is nftCreator
        expect(await deployedTestNft.ownerOf(1)).to.equal(firstAccount.address);
    })

    it("should mint 10 NFTs to second account", async function() {

        // For loop that calls the function
        // to mint ten new NFTs to the second account
        // (WILL HAVE TO RESET TOKEN ID`S AFTER EVERY TEST,
        // OTHERWISE WILL HAVE TO INCREASE NUMBERS)
        for(let count = 11; count < 21; count++) {
            await deployedTestNft.connect(secondAccount).mintNewNft(count);
        }

        // confirm address has ten NFTs
        // (length of array should be `10` items)
        expect((await deployedTestNft.connect(secondAccount)
            .nftsOwned(secondAccount.address)).length).to.equal(10);
    })

    it("should allow the transfer of an NFT", async function() {
        // Confirm the owner of NFT ID `1` to be firstAccount
        expect(await deployedTestNft.ownerOf(1)).to.equal(firstAccount.address);

        // Transfer ownership of NFT ID `1` to secondAccount
        await deployedTestNft.transferFrom(firstAccount.address, secondAccount.address, 1);

        // Confirm the ownership of NFT ID `1` is secondAccoount
        expect(await deployedTestNft.connect(secondAccount).ownerOf(1)).to.equal(secondAccount.address);
    })

    it("should allow contract to hold a NFT", async function() {
        // Confirm the owner of NFT ID `11` to be secondAccount
        expect(await deployedTestNft.connect(secondAccount).ownerOf(11)).to.equal(secondAccount.address);

        // Transfer NFT ID `11` to TestNft contract
        await deployedTestNft.connect(secondAccount).transferFrom(secondAccount.address, deployedTestNft.address, 11);
        
        // Confirm contract holds NFT ID `11`
        expect(await deployedTestNft.connect(secondAccount).ownerOf(11)).to.equal(deployedTestNft.address);
    })

    it("should allow contract to transfer NFT to another Externally Owned Account", async function() {
        // Confirm the owner of NFT ID `12` to be secondAccount
        expect(await deployedTestNft.connect(secondAccount).ownerOf(12)).to.equal(secondAccount.address);

        // Transfer NFT ID `12` to TestNft contract
        await deployedTestNft.connect(secondAccount).transferFrom(secondAccount.address, deployedTestNft.address, 12);

        // Confirm contract holds NFT ID `11`
        expect(await deployedTestNft.connect(secondAccount).ownerOf(12)).to.equal(deployedTestNft.address);

        // 
    }

})