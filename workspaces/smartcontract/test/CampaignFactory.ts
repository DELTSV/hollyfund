import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("HollyFund", function () {
  async function deployOneYearLockFixture() {
    const title = "The Matrix";
    const targetAmount = 120;
    const investAmount = 1;

    const [owner, otherAccount] = await ethers.getSigners();

    console.log("Balance: ", await ethers.provider.getBalance(otherAccount.address));

    const HollyFund = await ethers.getContractFactory("HollyFund",  owner);

    const contract = await HollyFund.deploy();
    return { contract, title, targetAmount, owner, otherAccount, investAmount };
  }

  describe('Create campaign', function () {
    it('should not create campaign', async () => {
      const {contract, title} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.createCampaign(
        title,
        0
      )).to.be.reverted;
    });

    it('should create campaign', async () => {
      const {contract, title, targetAmount} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.createCampaign(
        title,
        targetAmount
      )).to.not.be.reverted;
    });
  });

  describe("Invest", function () {
    describe("Validations", function () {
      it("Should invest in a campaign", async function () {
        const {contract, title, investAmount, otherAccount} = await loadFixture(
          deployOneYearLockFixture
        );

        // set allowance
        await contract.approve(contract.getAddress(), investAmount);

        await expect(contract.connect(otherAccount).invest(title, { value: investAmount })).not.to.be.reverted;
      });

      it("Should pay invest amount", async function () {
        const {contract, title, investAmount} = await loadFixture(
          deployOneYearLockFixture
        );

        await expect(contract.invest(title, { value: investAmount }))
          .to.emit(contract, "NewInvestment")
          .withArgs(title, investAmount);
      });
    });

    describe("Events", function () {
      it("Should emit an event on create a campaign", async function () {
        const {title, targetAmount, contract} = await loadFixture(
          deployOneYearLockFixture
        );

        await expect(contract.createCampaign(title, targetAmount))
          .to.emit(contract, "NewCampaign")
          .withArgs(title, targetAmount);
      });
    });
  });

  describe("Get campaign", function () {
    it("Should not get a campaign", async function () {
      const {contract, title} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.getCampaign(title))
        .to.be.revertedWith("Campaign does not exist");
    });
  });
});
