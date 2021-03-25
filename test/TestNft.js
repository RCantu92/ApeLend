const { expect } = require("chai");

describe("NFT contract", function () {

    it("should allow a NFT to be minted to caller of function", async function() {
        // Get TestNft code to deploy
        const testNft = await ethers.getContractFactory("TestNft");

        // First account that will deploy the contract
        [nftCreator] = await ethers.getSigners();
        
        // Deploy TestNft from first account
        // with the provided parameters
        deployedTestNft = await testNft.deploy("Test Collection", "TEST");
        
        // Confirm the address that deployed the contract
        // is the first account pulle from getSigners()
        expect(await deployedTestNft.deployTransaction.from).to.equal(nftCreator.address);

        // Confirm parameters passed into Constructor function
        // are the parameters previously provided
        expect(await deployedTestNft.collectionName()).to.equal("Test Collection");
        expect(await deployedTestNft.collectionSymbol()).to.equal("TEST");

        // Mint new NFT with TokenID of `1`
        await deployedTestNft.mintNewNft(1);

        // Confirm owner of NFT is nftCreator
        expect(await deployedTestNft.ownerOf(1)).to.equal(nftCreator.address);
    })

})