const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { time, expectRevert } = require("@openzeppelin/test-helpers");


describe("ApeLend and TestERC721 contracts", function() {

    before( async function() {
        // Get ApeLend and TestERC721 code to deploy
        const apeLend = await ethers.getContractFactory("ApeLend");
        const testERC721 = await ethers.getContractFactory("TestERC721");

        // Pull six accounts
        [firstAccount, secondAccount, thirdAccount, fourthAccount, fifthAccount, sixthAccount] = await ethers.getSigners();

        // Deploy ApeLend and testERC721 from first account
        ApeLend = await apeLend.deploy();
        TestERC721 = await testERC721.deploy("TestToken", "TEST");

        // Confirm the address that deployed ApeLend
        // and TestERC721 contracts is firstAccount
        expect(await ApeLend.deployTransaction.from).to.equal(firstAccount.address);
        expect(await TestERC721.deployTransaction.from).to.equal(firstAccount.address);
    });

    it("should allow a token to be minted to caller of function", async function() {

        // Mint new token with ID of `1`
        await TestERC721.safeMint(firstAccount.address, 1);

        // Confirm owner of token is firstAccount
        expect(await TestERC721.ownerOf(1)).to.equal(firstAccount.address);
    })

    it("should mint ten tokens to second account", async function() {

        // For loop that calls the function
        // to mint ten new tokens to secondAccount
        for(let count = 11; count < 21; count++) {
            await TestERC721.connect(secondAccount).safeMint(secondAccount.address, count);
        }

        // confirm secondAccount has ten tokens
        // (length of array should be `10` items)
        expect(await TestERC721.connect(secondAccount)
            .balanceOf(secondAccount.address)).to.equal(10);
    })

    it("should allow the lending of a token, thus minting some new ApeTokens", async function() {

        // Give approval to ApeLend
        await TestERC721.approveApeLend(ApeLend.address, 1);

        // Have firstAccount lend a token `1`
        // to ApeLend and mint 10 new ApeTokens
        await ApeLend.lendToken(TestERC721.address, 1, 10, 1);

        // Confirm the current owner of the ApeTokens
        // is the ApeLend protocol
        expect(await ApeLend.ownerOfApeToken(1, 1001)).to.equal(ApeLend.address);
    })

    it("should allow the borrowing of a ApeToken", async function() {

        // Give approval to ApeLend
        await TestERC721.connect(secondAccount).approveApeLend(ApeLend.address, 11);

        // Have the second account lend a token
        // to ApeLend and mint 10 new ApeTokens
        await ApeLend.connect(secondAccount).lendToken(TestERC721.address, 11, 10, 1);

        // Have the second account borrow a token
        // after having already lent a token to
        // ApeLend
        await ApeLend.connect(secondAccount).borrowToken(1, 1002);

        // Confirm the current owner of the borrowed
        // ApeTokens is the second account
        expect(await ApeLend.connect(secondAccount).ownerOfApeToken(1, 1002)).to.equal(secondAccount.address);
    })

    it("should allow a token to be pulled out of ApeLend, thus burning corresponding ApeTokens", async function() {
        // Mint new token with ID of `23` to thirdAccount
        await TestERC721.connect(thirdAccount).safeMint(thirdAccount.address, 23);

        // Confirm thirdAccount is the owner
        // of token id `23`
        expect(await TestERC721.connect(thirdAccount).ownerOf(23)).to.equal(thirdAccount.address);

        // Give approval to ApeLend
        await TestERC721.connect(thirdAccount).approveApeLend(ApeLend.address, 23);

        // Lend token id `23` to ApeLend,
        // mint 20 corresponding ApeTokens,
        // and make loan term length 2 minutes
        await ApeLend.connect(thirdAccount).lendToken(TestERC721.address, 23, 20, 120);

        // Confirm that ApeLend is now in
        // possesion of provided token
        expect(await TestERC721.connect(thirdAccount).ownerOf(23)).to.equal(ApeLend.address);

        // Confirm there are 20 ApeTokens
        // for token id `23`
        expect(await ApeLend.connect(thirdAccount).apeTokenTotalSupply(23)).to.equal(20);

        // Provide time unit (3 minutes) by how much to increase
        // Hardhat Network, then advance to desired block
        await time.increase(time.duration.minutes(3));
        await time.advanceBlock();

        // Pull token thus burning supply
        // of corresponding ApeTokens
        await ApeLend.connect(thirdAccount).pullToken(TestERC721.address, 23);

        // Confirm that token id `23` corresponding
        // ApeTokens have been burned
        expect(await ApeLend.connect(thirdAccount).apeTokenTotalSupply(23)).to.equal(0);

        // Confirm that the possesion of
        // token id `23` is back with thirdAccount
        expect(await TestERC721.connect(thirdAccount).ownerOf(23)).to.equal(thirdAccount.address);
    })

    it("should not allow an owner to pull token until time has loan term has elapsed", async function() {
        // Mint new token with ID of `32` to fourthAccount
        await TestERC721.connect(fourthAccount).safeMint(fourthAccount.address, 32);

        // Confirm fourthAccount is the owner
        // of token id `32`
        expect(await TestERC721.connect(fourthAccount).ownerOf(32)).to.equal(fourthAccount.address);

        // Give approval to ApeLend
        await TestERC721.connect(fourthAccount).approveApeLend(ApeLend.address, 32);

        // Lend token id `32` to ApeLend,
        // mint 20 corresponding ApeTokens,
        // and make loan term length 5 minutes
        await ApeLend.connect(fourthAccount).lendToken(TestERC721.address, 32, 20, 300);

        // Expect pulling token to fail,
        // thus unable to burn supply of corresponding ApeTokens
        await expectRevert(ApeLend.connect(fourthAccount).pullToken(TestERC721.address, 32), "ApeLend: You cannot pull your token at this time");

        // Confirm that token id `32` corresponding
        // ApeTokens have NOT been burned
        expect(await ApeLend.connect(fourthAccount).apeTokenTotalSupply(32)).to.equal(20);

        // Confirm that the possesion of
        // token id `32` is still with ApeLend
        expect(await TestERC721.connect(fourthAccount).ownerOf(32)).to.equal(ApeLend.address);
    })
    
    it("should mint new apeTokens to an already existing ApeToken contract", async function() {

    })

    /*
    it("should allow the lending of multiple ERC721 tokens from the same user", async function() {

    })

    it("should only allow an owner of an ERC721 to pull it from ApeLend", async function() {

    })
    */
})