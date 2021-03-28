const { expect } = require("chai");

describe("NFT contract", function () {

    before( async function() {
        // Get TestNft code to deploy
        const testNft = await ethers.getContractFactory("TestNft");

        // First account that will deploy the contract
        [firstAccount] = await ethers.getSigners();

        // Deploy TestNft from first account
        // with the provided parameters
        deployedTestNft = await testNft.deploy("Test Collection", "TEST");

        // Confirm the address that deployed the contract
        // is the first account pulle from getSigners()
        expect(await deployedTestNft.deployTransaction.from).to.equal(firstAccount.address);

        // Confirm parameters passed into Constructor function
        // are the parameters previously provided
        expect(await deployedTestNft.collectionName()).to.equal("Test Collection");
        expect(await deployedTestNft.collectionSymbol()).to.equal("TEST");
      });

    /*
    // mintNewNft() has been changed to have `_to` parameter
    it("should allow a NFT to be minted to caller of function", async function() {

        // Mint new NFT with TokenID of `1`
        await deployedTestNft.mintNewNft(1);

        // Confirm owner of NFT is nftCreator
        expect(await deployedTestNft.ownerOf(1)).to.equal(firstAccount.address);
    })
    */

    it("should mint 10 NFTs to first account", async function() {

        // For loop that calls the function
        // to mint ten new NFTs per number
        for(let count = 2; count < 12; count++) {
            await deployedTestNft.mintNewNft(count);
        }

        // confirm address has ten NFTs
        // (length of array should be `10` items)
        expect((await deployedTestNft.nftsOwned(firstAccount.address)).length).to.equal(10);
    })

})