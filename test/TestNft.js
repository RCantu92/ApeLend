const { expect } = require("chai");

describe("NFT contract", function () {

    it("should allow a NFT to be minted to caller of function", async function() {
        const testNft = await ethers.getContractFactory("TestNft");

        [nftCreator] = await ethers.getSigners();

        deployedTestNft = await testNft.deploy("Test Collection", "TEST");

        expect(await deployedTestNft.collectionName()).to.equal("Test Collection");
        expect(await deployedTestNft.collectionSymbol()).to.equal("TEST");

        await deployedTestNft.mintNewNft(1);

        expect(await deployedTestNft.ownerOf(1)).to.equal(nftCreator);
    })

})