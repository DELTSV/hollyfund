import { ethers } from "hardhat";

async function main() {
  const HollyFund = await ethers.getContractFactory("HollyFund");
  const contract = await HollyFund.deploy(300);

  await contract.waitForDeployment();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
