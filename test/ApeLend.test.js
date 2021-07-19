const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { time } = require("@openzeppelin/test-helpers");

const BigNumber = require("bignumber.js");

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

    it("should allow a token to be taken out of ApeLend, thus burning corresponding ApeTokens", async function() {
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
        // Hardhat Network
        // Then advance to desired block
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

    //it("should not allow an owner to pull token, burn ApeTokens, until time has loan term has elapsed", async function() {

    //})

    /*
    it("should allow the transfer of a token", async function() {
        // Confirm the owner of token ID `1` to be firstAccount
        expect(await ApeLend.ownerOf(1)).to.equal(firstAccount.address);

        // Transfer ownership of token ID `1` to secondAccount
        // write `['safeTransferFrom(address,address,uint25)']`
        // to solve for the fact safeTransferFrom() is an overloaded function
        await ApeLend['safeTransferFrom(address,address,uint256)'](firstAccount.address, secondAccount.address, 1);

        // Confirm the ownership of token ID `1` is secondAccount
        expect(await ApeLend.connect(secondAccount).ownerOf(1)).to.equal(secondAccount.address);
    })

    it("should allow contract to hold a token", async function() {
        // Confirm the owner of token ID `11` to be secondAccount
        expect(await ApeLend.connect(secondAccount).ownerOf(11)).to.equal(secondAccount.address);

        // Transfer token ID `11` to ApeLend contract
        await ApeLend.connect(secondAccount)['safeTransferFrom(address,address,uint256)'](secondAccount.address, ApeLend.address, 11);
        
        // Confirm contract holds token ID `11`
        expect(await ApeLend.connect(secondAccount).ownerOf(11)).to.equal(ApeLend.address);
    })

    it("should allow token owner to put up token for lending", async function() {
        // Mint new token with token ID of `25`
        // to firstAccount
        await ApeLend.safeMint(firstAccount.address, 25);

        // Confirm that firstAccount is owner
        // of token ID `25`
        expect(await ApeLend.ownerOf(25)).to.equal(firstAccount.address);

        // Confirm token ID `25` is not available
        // which would mean it is not able to be
        // put up to lend by owner
        expect(await ApeLend.isNftAvailable(25)).to.equal(false);

        // Give approval to ApeLend contract to
        // handle token transactions
        await ApeLend.approveProtocolAddress(true);

        // Provide token ID `25` to protocol
        // from firstAccount to borrow
        await ApeLend.lendNft(25);

        // Confirm token is available to borrow
        expect(await ApeLend.isNftAvailable(25)).to.equal(true);

        // Confirm that the protocol currently
        // is the owner of token ID `25`
        expect(await ApeLend.ownerOf(25)).to.equal(ApeLend.address);
    })

    it("should allow the borrowing of available token", async function() {

        // Confirm token is available to borrow
        expect(await ApeLend.isNftAvailable(25)).to.equal(true);

        // Mint new token ID `36` to thirdAccount
        await ApeLend.connect(thirdAccount).safeMint(thirdAccount.address, 36);

        // Confirm token ID `36` belongs
        // to thirdAccount
        expect(await ApeLend.connect(thirdAccount).ownerOf(36)).to.equal(thirdAccount.address);

        // Give approval to ApeLend contract to
        // handle token transactions
        await ApeLend.connect(thirdAccount).approveProtocolAddress(true);
        
        // Call function to borrow token ID `25`
        // by providing token ID `36` as collateral
        await ApeLend.connect(thirdAccount).borrowNft(25, 36);

        // Confirm collateral token
        // is available to borrow
        expect(await ApeLend.connect(thirdAccount).isNftAvailable(36)).to.equal(true);

        // Confirm that the protocol currently
        // is the owner of token ID `36`
        expect(await ApeLend.ownerOf(36)).to.equal(ApeLend.address);

        // Confirm borrowed token
        // is unavailable to borrow
        expect(await ApeLend.connect(thirdAccount).isNftAvailable(25)).to.equal(false);

        // Confirm that thirdAccount is
        // currently the owner of token ID `25`
        expect(await ApeLend.connect(thirdAccount).ownerOf(25)).to.equal(thirdAccount.address);

        // Confirm the `true` owner of token ID `36`
        // is thirdAccount
        expect(await ApeLend.connect(thirdAccount).trueNftOwner(36)).to.equal(thirdAccount.address);
    })

    it ("should allow the borrowing and returning of NFT before being pulled by owner", async function() {
        // Confirm NFT ID `36`
        // is available to borrow
        expect(await ApeLend.connect(fourthAccount).isNftAvailable(36)).to.equal(true);

        // Mint new NFT ID `48` to fourthAccount
        await deployedTestNft.connect(fourthAccount).mintNewNft(48);

        // Confirm NFT ID `48` belongs
        // to fourthAccount
        expect(await deployedTestNft.connect(fourthAccount).ownerOf(48)).to.equal(fourthAccount.address)

        // Give approval to BorrowLendProtocol contract to
        // handle NFT transactions
        await deployedTestNft.connect(fourthAccount).approveProtocolAddress(true);

        // Call function to borrow NFT ID `36`
        // by providing NFT ID `48` as collateral
        await ApeLend.connect(fourthAccount).borrowNft(36, 48);

        // Confirm collateral NFT ID `48`
        // is available to borrow
        expect(await ApeLend.connect(fourthAccount).isNftAvailable(48)).to.equal(true);

        // Confirm borrowed NFT ID `36`
        // is unavailable to borrow
        expect(await ApeLend.connect(fourthAccount).isNftAvailable(36)).to.equal(false);

        // Confirm `true` owner of NFT ID `36`
        // is thirdAccount
        expect(await ApeLend.connect(fourthAccount).trueNftOwner(36)).to.equal(thirdAccount.address);

        // Call function to return NFT ID `36`
        // to protocol from borrower
        await ApeLend.connect(fourthAccount).returnNft(36);

        // Confirm `owner` of NFT ID `36`
        // is now the protocol
        expect(await deployedTestNft.ownerOf(36)).to.equal(ApeLend.address);

        // Pull NFT listing by NFT ID `36`
        // true owner
        await ApeLend.connect(thirdAccount).pullNft(36);

        // Confirm owner of NFT ID `36`
        // is thirdAccount
        expect(await deployedTestNft.connect(thirdAccount).ownerOf(36)).to.equal(thirdAccount.address);

        // Confirm NFT ID `36`
        // is unavaiable for lending
        expect(await ApeLend.connect(thirdAccount).isNftAvailable(36)).to.equal(false);
    })

    it("should allow ApeLend to confiscate borrowed NFT back to owner if time window is up", async function() {
        // Mint new NFT ID `53` to fifthAccount
        await deployedTestNft.connect(fifthAccount).mintNewNft(53);

        // Mint new NFT ID `94` to secondAccount
        await deployedTestNft.connect(secondAccount).mintNewNft(94);

        // Confirm NFT ID `53` belongs
        // to fifthAccount
        expect(await deployedTestNft.connect(fifthAccount).ownerOf(53)).to.equal(fifthAccount.address);

        // Confirm NFT ID `94` belongs
        // to secondAccount
        expect(await deployedTestNft.connect(secondAccount).ownerOf(94)).to.equal(secondAccount.address);

        // Give approval to BorrowLendProtocol contract to
        // handle NFT transactions from fifthAccount
        await deployedTestNft.connect(fifthAccount).approveProtocolAddress(true);

        // Give approval to BorrowLendProtocol contract to
        // handle NFT transactions from secondAccount
        await deployedTestNft.connect(secondAccount).approveProtocolAddress(true);

        // Lend NFT ID `94` from secondAccount
        await ApeLend.connect(secondAccount).lendNft(94);

        // Borrow NFT ID `94` from fifthAccount
        // by providing NFT ID `53` from fifthAccount
        await ApeLend.connect(fifthAccount).borrowNft(94, 53);

        // Provide time unit (3 minutes) by how much to increase
        // Hardhat Network
        // Then advance to desired block
        await time.increase(time.duration.minutes(3));
        await time.advanceBlock();

        // Confirm borrowed NFT ID `94` is unavailable
        // to be borrowed
        expect(await ApeLend.connect(secondAccount).isNftAvailable(94)).to.equal(false);

        // Confirm collateral NFT ID `53` is available
        // to be borrowed
        expect(await ApeLend.connect(fifthAccount).isNftAvailable(53)).to.equal(true);

        // Confirm that the current time has passed the
        // time windwo to return NFT ID `94`
        expect((await ApeLend.connect(secondAccount).nftReturnWindow(94)) <
            await ApeLend.connect(secondAccount).currentBlockTimestamp()).to.equal(true);

        
        // Give protocol creator address approval
        // to repossess NFT ID `94` back to true owner
        await ApeLend.connect(secondAccount).requestRepossessionOfNft(94);

        // Protocol repossesses NFT ID `94` from borrower
        // and returns to true owner
        await ApeLend.connect(firstAccount).protocolNftRepossession(94);

        // Confirm true owner and current owner are
        // both secondAccount
        expect(await deployedTestNft.connect(secondAccount).ownerOf(94)).to.equal(secondAccount.address);
        expect(await ApeLend.connect(secondAccount).trueNftOwner(94)).to.equal(secondAccount.address);
    })
    */
})