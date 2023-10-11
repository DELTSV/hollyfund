import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CampaignFactory", function () {
  async function deployOneYearLockFixture() {
    const title = "The Matrix";
    const targetAmount = 120;
    const investAmount = 10;

    const [owner, otherAccount] = await ethers.getSigners();

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const campaignFactory = await CampaignFactory.deploy();

    return { campaignFactory, title, targetAmount, owner, otherAccount, investAmount };
  }

  describe('Create campaign', function () {
    it('should not create campaign', async () => {
      const {campaignFactory, title} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(campaignFactory.createCampaign(
        title,
        0
      )).to.be.reverted;
    });

    it('should create campaign', async () => {
      const {campaignFactory, title, targetAmount} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(campaignFactory.createCampaign(
        title,
        targetAmount
      )).to.not.be.reverted;
    });
  });

  describe("Invest", function () {
    describe("Validations", function () {
      it("Should invest in a campaign", async function () {
        const {campaignFactory, title, investAmount} = await loadFixture(
          deployOneYearLockFixture
        );

        await expect(campaignFactory.invest(title, { value: investAmount })).not.to.be.reverted;
      });

      it("Should pay invest amount", async function () {
        const {campaignFactory, title, investAmount} = await loadFixture(
          deployOneYearLockFixture
        );

        await expect(campaignFactory.invest(title, { value: investAmount }))
          .to.emit(campaignFactory, "NewInvestment")
          .withArgs(title, investAmount);
      });
    });

    describe("Events", function () {
      it("Should emit an event on create a campaign", async function () {
        const {title, targetAmount, campaignFactory} = await loadFixture(
          deployOneYearLockFixture
        );

        await expect(campaignFactory.createCampaign(title, targetAmount))
          .to.emit(campaignFactory, "NewCampaign")
          .withArgs(title, targetAmount);
      });
    });
  });

  describe("Get campaign", function () {
    it("Should not get a campaign", async function () {
      const {campaignFactory, title} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(campaignFactory.getCampaign(title))
        .to.be.revertedWith("Campaign does not exist");
    });
  });
});
