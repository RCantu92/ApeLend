async function main() {

    // Pull accounts from which to deploy
    const [deployer] = await ethers.getSigners();
  
    // Print which account is deploying
    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    // Get the contract instance and deploy
    const ApeLend = await ethers.getContractFactory("BorrowLendProtocol");
    const apeLend = await ApeLend.deploy();
  
    console.log("ApeLend address:", apeLend.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });