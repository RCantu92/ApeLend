const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Borrow and Lend Protocol contract", function() {

    it("should allow a NFT to be deposited", async function() {
        // Get TestNft code to deploy
        const BorrowLendProtocol = await ethers.getContractFactory("BorrowLendProtocol");

        // First account that will deploy the contract
        [lender] = await ethers.getSigners();


    })
})